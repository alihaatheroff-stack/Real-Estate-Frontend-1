import fs from 'node:fs'
import path from 'node:path'

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === 'dist') continue
      walk(p, out)
    } else if (/\.(ts|tsx)$/.test(ent.name)) {
      out.push(p)
    }
  }
  return out
}

const files = walk('src')
let changed = 0

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8')
  const before = text

  text = text.replace(
    /https:\/\/images\.unsplash\.com\/photo-([a-z0-9-]+)(?:\?[^'"]*)?/g,
    (_m, id) => `/images/stock/photo-${id}.jpg`,
  )

  text = text.replace(
    /https:\/\/i\.pravatar\.cc\/\d+\?img=(\d+)/g,
    (_m, img) => `/images/avatars/avatar-${img}.jpg`,
  )

  if (text !== before) {
    fs.writeFileSync(file, text)
    changed += 1
    console.log('updated', file)
  }
}

console.log('filesChanged', changed)
