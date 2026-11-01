import { cp, mkdir } from "node:fs/promises";

await mkdir("dist/types-cjs", { recursive: true });
await cp("dist/types", "dist/types-cjs", { recursive: true });

for (const file of ["index.d.ts", "index.d.ts.map"]) {
  const source = `dist/types/${file}`;
  const target = `dist/types-cjs/${file.replace(".d.ts", ".d.cts")}`;
  try {
    await cp(source, target);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
