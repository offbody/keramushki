import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = normalize(join(dirname(fileURLToPath(import.meta.url)), '..'));
const root = join(projectRoot, 'dist');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 5173);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
};

const server = createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);

  if (url.pathname === '/api/booking') {
    import('../api/booking.js')
      .then(({ default: handler }) => handler(request, response))
      .catch(() => {
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ message: 'Не удалось запустить API заявки.' }));
      });
    return;
  }

  const cleanPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(root, cleanPath === '/' ? 'index.html' : cleanPath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    const publicPath = join(projectRoot, 'public', cleanPath);
    filePath =
      existsSync(publicPath) && statSync(publicPath).isFile()
        ? publicPath
        : join(root, 'index.html');
  }

  response.writeHead(200, {
    'Content-Type': types[extname(filePath)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Ceramushki preview: http://localhost:${port}`);
});
