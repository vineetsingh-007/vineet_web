import fs from 'node:fs';
import path from 'node:path';

async function main() {
  console.log('Starting Vercel Build Output packaging...');

  const outputDir = path.resolve('.vercel/output');
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  // 1. Copy static client assets
  const staticDir = path.resolve(outputDir, 'static');
  fs.mkdirSync(staticDir, { recursive: true });
  if (fs.existsSync('dist/client')) {
    copyDirSync('dist/client', staticDir);
    console.log('Copied static client files to .vercel/output/static');
  } else {
    console.warn('Warning: dist/client directory not found!');
  }

  // 2. Create config.json for Vercel routing
  const config = {
    version: 3,
    routes: [
      {
        handle: 'filesystem'
      },
      {
        src: '/(.*)',
        dest: '/index'
      }
    ]
  };
  fs.writeFileSync(
    path.resolve(outputDir, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('Created .vercel/output/config.json');

  // 3. Create Serverless Function directory
  const funcDir = path.resolve(outputDir, 'functions/index.func');
  fs.mkdirSync(funcDir, { recursive: true });

  // 4. Create .vc-config.json for the serverless function
  const vcConfig = {
    runtime: 'nodejs20.x',
    handler: 'entry.mjs',
    launcherType: 'Nodejs',
    shouldAddHelpers: true
  };
  fs.writeFileSync(
    path.resolve(funcDir, '.vc-config.json'),
    JSON.stringify(vcConfig, null, 2)
  );
  console.log('Created .vercel/output/functions/index.func/.vc-config.json');

  // 5. Copy server bundle into function directory
  const serverDest = path.resolve(funcDir, 'dist/server');
  fs.mkdirSync(serverDest, { recursive: true });
  if (fs.existsSync('dist/server')) {
    copyDirSync('dist/server', serverDest);
    console.log('Copied dist/server into function directory');
  } else {
    console.warn('Warning: dist/server directory not found!');
  }

  // 6. Write the entry.mjs Node.js adapter (ESM format)
  const entryContent = `
import serverModule from './dist/server/server.js';
const serverFetch = serverModule.default?.fetch || serverModule.fetch || serverModule.default;

export default async function handler(req, res) {
  try {
    const host = req.headers.host || 'localhost';
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const url = new URL(req.url || '/', \`\${protocol}://\${host}\`).toString();
    
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await getRawBody(req);
    }
    
    const requestHeaders = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => requestHeaders.append(key, v));
        } else {
          requestHeaders.set(key, value);
        }
      }
    }

    const webRequest = new Request(url, {
      method: req.method,
      headers: requestHeaders,
      body: body,
      duplex: body ? 'half' : undefined
    });

    const webResponse = await serverFetch(webRequest, {}, {
      waitUntil: () => {}
    });

    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;
    
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Error handling request in Vercel function:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', err => reject(err));
  });
}
`;

  fs.writeFileSync(path.resolve(funcDir, 'entry.mjs'), entryContent);
  console.log('Created .vercel/output/functions/index.func/entry.mjs');
  console.log('Vercel Build Output packaging completed successfully!');
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main().catch(err => {
  console.error('Failed to package Vercel Build Output:', err);
  process.exit(1);
});
