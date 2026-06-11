import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bookingHandler from './api/booking.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const port = Number(process.env.PORT || 3000);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.otf', 'font/otf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  response.end(text);
}

function getStaticPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const cleanPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = resolve(dist, cleanPath === '/' ? 'index.html' : cleanPath.slice(1));

  if (!filePath.startsWith(dist)) {
    return null;
  }

  return filePath;
}

async function fileExists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

async function sendFile(response, filePath) {
  const type = contentTypes.get(extname(filePath).toLowerCase()) || 'application/octet-stream';

  response.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': filePath.includes(`${join('dist', 'assets')}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
  });

  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (url.pathname === '/api/booking' || url.pathname === '/api/booking/') {
    await bookingHandler(request, response);
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendText(response, 405, 'Method Not Allowed');
    return;
  }

  let filePath = getStaticPath(url.pathname);

  if (!filePath) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  if (!(await fileExists(filePath))) {
    filePath = resolve(dist, 'index.html');
  }

  if (request.method === 'HEAD') {
    response.writeHead(200);
    response.end();
    return;
  }

  await sendFile(response, filePath);
});

try {
  await access(join(dist, 'index.html'));
} catch {
  console.error('dist/index.html was not found. Run `npm run build` before `npm run start`.');
  process.exit(1);
}

server.listen(port, '0.0.0.0', () => {
  console.log(`Ceramushki server is running on port ${port}`);
});
