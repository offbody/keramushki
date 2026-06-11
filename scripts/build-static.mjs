import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const indexHtml = await readFile(join(root, 'index.html'), 'utf8');
const staticIndexHtml = indexHtml.replace(
  '</head>',
  '    <link rel="stylesheet" href="/src/styles.css" />\n  </head>',
);

await cp(join(root, 'src'), join(dist, 'src'), { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

const mainJs = await readFile(join(dist, 'src', 'main.js'), 'utf8');

await writeFile(join(dist, 'index.html'), staticIndexHtml);
await writeFile(join(dist, 'src', 'main.js'), mainJs.replace("import './styles.css';\n\n", ''));

console.log('Static build complete: dist/');
