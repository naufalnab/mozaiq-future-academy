// GitHub Pages serves the repository root directly. This optional staging build
// packages public files for review without changing the separate Sites worker.
import { cp, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '.build', 'landing');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const publicPaths = ['index.html', 'assets', 'silabus', 'video', 'ai', 'bina-bangsa', 'open-table', 'robots.txt', 'sitemap.xml', 'CNAME', '.nojekyll'];
for (const entry of publicPaths) {
  await stat(path.join(root, entry));
  await cp(path.join(root, entry), path.join(output, entry), {
    recursive: true,
    filter: source => !source.split(path.sep).some(segment => ['tests', '.DS_Store'].includes(segment))
  });
}
console.log(`Static public files built at ${output}`);
