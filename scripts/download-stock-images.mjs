import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const stockDir = path.join(root, 'public', 'images', 'stock')
const avatarDir = path.join(root, 'public', 'images', 'avatars')

fs.mkdirSync(stockDir, { recursive: true })
fs.mkdirSync(avatarDir, { recursive: true })

/** Unique Unsplash photo ids used across the app (download once at high quality). */
const unsplashIds = [
  '1486406146926-c627a92ad1ab',
  '1600585154340-be6161a56a0c',
  '1564013799919-ab600027ffc6',
  '1586528116311-ad8dd3c8310d',
  '1449844908441-8829872d2607',
  '1545324418-cc1a3fa10c00',
  '1600596542815-ffad4c1539a9',
  '1497366811353-6870744d04b2',
  '1613490493576-7fde63acd811',
  '1568605114967-8130f3a36994',
  '1497366216548-37526070297c',
  '1560518883-ce09059eeffa',
  '1454165804606-c3d57bc86b40',
  '1503387762-592deb58ef4e',
  '1521791055366-0d553872125f',
  '1600607687939-ce8a6c25118c',
  '1450101499163-c8848c66ca85',
]

const avatars = [
  { img: 12, file: 'avatar-12.jpg' },
  { img: 5, file: 'avatar-5.jpg' },
  { img: 33, file: 'avatar-33.jpg' },
]

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log('skip', path.relative(root, dest))
    return
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': 'RE-Network-Frontend/1.0 (local asset mirror)' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  console.log('ok', path.relative(root, dest), buf.length)
}

async function main() {
  for (const id of unsplashIds) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`
    const dest = path.join(stockDir, `photo-${id}.jpg`)
    await download(url, dest)
  }

  for (const { img, file } of avatars) {
    const url = `https://i.pravatar.cc/256?img=${img}`
    const dest = path.join(avatarDir, file)
    await download(url, dest)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
