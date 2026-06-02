import { existsSync, unlinkSync, cpSync, rmSync } from 'fs'
import { execSync } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const version = process.argv[2]

if (!version || !['v1', 'v2', 'v3', 'v4'].includes(version)) {
  console.error('Usage: node scripts/set-default.js <v1|v2|v3|v4>')
  process.exit(1)
}

const root = join(__dirname, '..')
const distPath = join(root, 'dist')

if (!existsSync(distPath)) {
  console.error('dist/ directory not found. Run npm run predeploy first.')
  process.exit(1)
}

if (version === 'v1') {
  console.log('Rebuilding root app for v1...')
  execSync('npm run build', { cwd: root, stdio: 'inherit' })
  console.log('Default set to v1 (original). Run "npm run deploy" to publish.')
  process.exit(0)
}

const versionDir = join(distPath, version)

if (!existsSync(versionDir)) {
  console.error(`Version ${version} not found in dist/. Make sure you ran npm run predeploy first.`)
  process.exit(1)
}

const rootIndex = join(distPath, 'index.html')
if (existsSync(rootIndex)) unlinkSync(rootIndex)

const rootAssets = join(distPath, 'assets')
if (existsSync(rootAssets)) rmSync(rootAssets, { recursive: true, force: true })

cpSync(join(versionDir, 'index.html'), join(distPath, 'index.html'))
cpSync(join(versionDir, 'assets'), join(distPath, 'assets'), { recursive: true })

console.log(`Default set to ${version}. Run "npm run deploy" to publish.`)
