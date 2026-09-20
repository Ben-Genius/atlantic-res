const { chromium } = require('playwright')
const OUT = '/private/tmp/claude-501/-Users-azaygenius-Desktop-Codebase-atlantic-res/79eb3f7a-4f5a-4b44-8760-fd3218fc9e6c/scratchpad'
;(async () => {
  const b = await chromium.launch()
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [375, 812, 'mobile']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } })
    await p.goto('http://localhost:3000/news-updates/anniversary', { waitUntil: 'networkidle' })
    await p.waitForTimeout(2500)
    await p.screenshot({ path: `${OUT}/art-${tag}-top.png` })
    await p.evaluate(() => window.scrollTo(0, window.innerHeight * 1.6))
    await p.waitForTimeout(1600)
    await p.screenshot({ path: `${OUT}/art-${tag}-body.png` })
    await p.close()
  }
  await b.close()
})()
