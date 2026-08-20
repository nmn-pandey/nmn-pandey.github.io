import { existsSync, cpSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const version = process.argv[2]

if (!version || !['v1', 'v2', 'v3', 'v4', 'v6'].includes(version)) {
  console.error('Usage: node scripts/set-default.js <v1|v2|v3|v4|v6>')
  process.exit(1)
}

const root = join(__dirname, '..')
const distPath = join(root, 'dist')

if (!existsSync(distPath)) {
  console.error('dist/ directory not found. Run npm run predeploy first.')
  process.exit(1)
}

const versionDir = join(distPath, version)

if (!existsSync(versionDir)) {
  console.error(`Version ${version} not found in dist/. Make sure you ran npm run predeploy first.`)
  process.exit(1)
}

const versionDirectories = new Set(['v1', 'v2', 'v3', 'v4', 'v6'])

for (const entry of readdirSync(distPath)) {
  if (!versionDirectories.has(entry)) {
    rmSync(join(distPath, entry), { recursive: true, force: true })
  }
}

for (const entry of readdirSync(versionDir)) {
  cpSync(join(versionDir, entry), join(distPath, entry), { recursive: true })
}

writeFileSync(join(distPath, '.nojekyll'), '')

console.log(`Default set to ${version}. Run "npm run deploy" to publish.`)
