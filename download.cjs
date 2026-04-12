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
      
      // If it's HTML, it might be a virus scan warning
      if (res.headers['content-type'] && res.headers['content-type'].includes('text/html')) {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
              // Try to extract the confirm token
              const match = body.match(/confirm=([a-zA-Z0-9_-]+)/);
              if (match) {
                  const confirmToken = match[1];
                  const newUrl = url + '&confirm=' + confirmToken;
                  console.log('Got confirm token, redirecting to', newUrl);
                  return download(newUrl, dest).then(resolve).catch(reject);
              } else {
                  console.log('HTML response but no confirm token found for', url);
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
  console.log('Downloading logo...');
  await download('https://drive.google.com/uc?export=download&id=1y9HzKDhYv7t3tX3sDZzZuBC-OEKPnb7D', 'public/logo.png');
  console.log('Downloading founder...');
  await download('https://drive.google.com/uc?export=download&id=1DtVITjc86j6Rqtm-TKWWot2-ZCVRFaFO', 'public/founder.jpg');
  console.log('Done');
}
run();
