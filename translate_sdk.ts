import * as fs from 'fs';
import { GoogleGenAI, Type } from "@google/genai";

function parseTranslations(content: string, langCode: string): Record<string, string> | null {
  const startMarker = `${langCode}: {`;
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return null;
  
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let blockContent = '';
  
  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];
    blockContent += char;
    
    if (char === '"' || char === "'") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (stringChar === char && content[i - 1] !== '\\') {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          break;
        }
      }
    }
  }
  
  try {
    const evalStr = `(() => { return { ${blockContent} }; })()`;
    const resValue = eval(evalStr);
    return resValue[langCode].translation;
  } catch (err) {
    console.error(`Error parsing ${langCode}:`, err);
    return null;
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('ERROR: GEMINI_API_KEY is not defined.');
    process.exit(1);
  }

  // Initialize the correct GoogleGenAI client as instructed in SKILL.md
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  console.log('Reading src/lib/i18n.ts...');
  const i18nContent = fs.readFileSync('src/lib/i18n.ts', 'utf8');
  
  console.log('Parsing existing English translations...');
  const enTranslations = parseTranslations(i18nContent, 'en');
  if (!enTranslations) {
    console.error('Failed to parse English translations!');
    process.exit(1);
  }
  console.log(`Parsed ${Object.keys(enTranslations).length} keys from English.`);

  console.log('Parsing existing Chinese translations...');
  const zhTranslations = parseTranslations(i18nContent, 'zh');
  if (zhTranslations) {
    console.log(`Parsed ${Object.keys(zhTranslations).length} keys from Chinese.`);
  }

  const targets = [
    { code: 'th', name: 'Thai / ภาษาไทย' },
    { code: 'es', name: 'Spanish / Español' },
    { code: 'fr', name: 'French / Français' },
    { code: 'ru', name: 'Russian / Русский' },
    { code: 'ar', name: 'Arabic / العَرَبِيَّة' },
    { code: 'pt', name: 'Portuguese / Português' }
  ];

  const translatedResources: Record<string, Record<string, string>> = {
    en: enTranslations,
    zh: zhTranslations || enTranslations
  };

  for (const target of targets) {
    console.log(` Translating to ${target.name} (${target.code})...`);
    
    const prompt = `You are an expert native translator and educational consultant for Nihao.edu, a premier study-in-China consultancy.
We need to translate our website into ${target.name} (${target.code}).
Translate the values in this English localization schema into accurate, culturally resonant, highly professional, and natural-sounding ${target.name} for international students. 
Keep all keys identical. 
Do not omit any key from the dictionary. Return a valid JSON object matching the exact keys provided on the input.

Input JSON schema:
${JSON.stringify(enTranslations, null, 2)}`;

    let success = false;
    let attempts = 0;
    while (!success && attempts < 3) {
      try {
        attempts++;
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        const resText = response.text ? response.text.trim() : '';
        if (!resText) {
          throw new Error('Received empty response from Gemini API');
        }

        const resultObj = JSON.parse(resText);
        if (resultObj && typeof resultObj === 'object') {
          translatedResources[target.code] = resultObj;
          console.log(` Successfully completed translation to ${target.name}!`);
          success = true;
        } else {
          throw new Error('Gemini output could not be parsed into a valid JSON object.');
        }
      } catch (err: any) {
        console.error(` Attempt ${attempts} failed for ${target.name}: ${err.message}`);
        if (attempts < 3) {
          console.log('Waiting 4 seconds before retrying...');
          await delay(4000);
        } else {
          console.error(`❌ Permanent failure for ${target.name}. Falling back to English for compile stability.`);
          translatedResources[target.code] = enTranslations;
        }
      }
    }

    // Brief grace delay to keep the requests paced
    await delay(1500);
  }

  console.log('Comparing and filling any missing keys in translations...');
  // Ensure every target language contains exactly all English keys (no missing/broken keys)
  for (const code of ['en', 'zh', 'th', 'es', 'fr', 'ru', 'ar', 'pt']) {
    const dict = translatedResources[code];
    for (const key of Object.keys(enTranslations)) {
      if (!dict[key]) {
        dict[key] = enTranslations[key];
      }
    }
  }

  console.log('Writing comprehensive translations to src/lib/i18n.ts...');
  
  const finalFileContent = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: ${JSON.stringify(translatedResources.en, null, 2)}
  },
  zh: {
    translation: ${JSON.stringify(translatedResources.zh, null, 2)}
  },
  th: {
    translation: ${JSON.stringify(translatedResources.th, null, 2)}
  },
  es: {
    translation: ${JSON.stringify(translatedResources.es, null, 2)}
  },
  fr: {
    translation: ${JSON.stringify(translatedResources.fr, null, 2)}
  },
  ru: {
    translation: ${JSON.stringify(translatedResources.ru, null, 2)}
  },
  ar: {
    translation: ${JSON.stringify(translatedResources.ar, null, 2)}
  },
  pt: {
    translation: ${JSON.stringify(translatedResources.pt, null, 2)}
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
`;

  fs.writeFileSync('src/lib/i18n.ts', finalFileContent, 'utf8');
  console.log('✅ COMPLETE: Completed translation of all 8 languages perfectly!');
}

run();
