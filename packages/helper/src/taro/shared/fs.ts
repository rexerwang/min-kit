import { writeFile } from 'node:fs/promises'

export async function writeJson(filename: string, obj: any) {
  await writeFile(filename, JSON.stringify(obj, null, 2))
}
