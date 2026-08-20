import { cpSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '..', 'dist')
const v1Path = join(distPath, 'v1')

mkdirSync(v1Path, { recursive: true })

for (const entry of readdirSync(distPath)) {
  if (entry !== 'v1') {
    cpSync(join(distPath, entry), join(v1Path, entry), { recursive: true })
  }
}

console.log('Preserved the original root build at /v1.')
