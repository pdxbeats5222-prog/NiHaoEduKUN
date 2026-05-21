const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
            const urlObj = new URL(url);
            redirectUrl = urlObj.origin + redirectUrl;
        }
        return download(redirectUrl, dest).then(resolve).catch(reject);
      }
      
      if (res.headers['content-type'] && res.headers['content-type'].includes('text/html')) {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
              const match = body.match(/confirm=([a-zA-Z0-9_-]+)/);
              if (match) {
                  const confirmToken = match[1];
                  const newUrl = url + '&confirm=' + confirmToken;
                  return download(newUrl, dest).then(resolve).catch(reject);
              } else {
                  fs.writeFileSync(dest + '.html', body);
                  resolve();
              }
          });
          return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log('Downloading video form Google Drive...');
  try {
    // The google drive link provided is: 
    // https://drive.google.com/file/d/1eO82YPl6WbcA7lEk2tVKwLA7AkuvdSHU/view?usp=drivesdk
    // ID: 1eO82YPl6WbcA7lEk2tVKwLA7AkuvdSHU
    await download('https://drive.google.com/uc?export=download&id=1eO82YPl6WbcA7lEk2tVKwLA7AkuvdSHU', 'public/about_video.mp4');
    console.log('Video download complete, saved to public/about_video.mp4');
  } catch (err) {
    console.error('Error downloading video:', err);
  }
}
run();
