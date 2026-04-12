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
  console.log('Downloading Kun image...');
  await download('https://drive.google.com/uc?export=download&id=1lhx6ceasYSrlWsBk7vy1BDdTzxq_r7_I', 'public/kun.jpg');
  console.log('Done');
}
run();
