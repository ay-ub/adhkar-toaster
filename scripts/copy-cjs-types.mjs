import { mkdir, readdir, copyFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const sourceRoot = resolve("dist/types");
const targetRoot = resolve("dist/types-cjs");

async function copyDeclarations(sourceDirectory) {
  for (const entry of await readdir(sourceDirectory, { withFileTypes: true })) {
    const sourcePath = join(sourceDirectory, entry.name);

    if (entry.isDirectory()) {
      await copyDeclarations(sourcePath);
      continue;
    }

    if (!entry.name.endsWith(".d.ts")) continue;

    const targetPath = join(
      targetRoot,
      relative(sourceRoot, sourcePath).replace(/\.d\.ts$/, ".d.cts"),
    );
    await mkdir(dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
}

await copyDeclarations(sourceRoot);
