import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('announcement resolves the latest post for the active locale', async () => {
  const source = await readFile(
    new URL('../src/components/widgets/Announcement.astro', import.meta.url),
    'utf8'
  );

  assert.match(source, /findLatestPosts\(\{ count: 1, lang \}\)/);
  assert.doesNotMatch(source, /Enhanced ACL in RustDesk Server Pro 1\.5\.0/);
  assert.doesNotMatch(source, />NEW</);
});
