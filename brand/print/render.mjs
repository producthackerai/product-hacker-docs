import { chromium } from '/Users/camfortin/Desktop/claude-cowork/browser-rig/node_modules/playwright/index.mjs';

const MM_TO_PX = 96 / 25.4;          // CSS px per mm
const SCALE = 300 / 96;              // deviceScaleFactor for 300dpi PNGs

const jobs = [
  { html: 'card.html',             pdf: 'PH-business-card-jody-91x61mm-bleed.pdf',
    wmm: 91, hmm: 61, png: null },  // 2-page PDF; PNGs per page below
  { html: 'sticker-terminal.html', pdf: 'PH-sticker-terminal-96x60mm-bleed.pdf',
    wmm: 96, hmm: 60, png: 'PH-sticker-terminal-300dpi.png' },
  { html: 'sticker-circle.html',   pdf: 'PH-sticker-circle-82x82mm-bleed.pdf',
    wmm: 82, hmm: 82, png: 'PH-sticker-circle-300dpi.png' },
];

const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({
    viewport: { width: Math.round(j.wmm * MM_TO_PX), height: Math.round(j.hmm * MM_TO_PX) },
    deviceScaleFactor: SCALE,
  });
  await page.goto('file:///tmp/ph-print/' + j.html);
  await page.waitForTimeout(300);
  await page.pdf({
    path: '/tmp/ph-print/' + j.pdf,
    width: j.wmm + 'mm', height: j.hmm + 'mm',
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    printBackground: true, pageRanges: '',
  });
  if (j.png) await page.screenshot({ path: '/tmp/ph-print/' + j.png });
  await page.close();
}

// card page PNG previews (front & back separately)
const card = await browser.newPage({
  viewport: { width: Math.round(91 * MM_TO_PX), height: Math.round(61 * MM_TO_PX) },
  deviceScaleFactor: SCALE,
});
await card.goto('file:///tmp/ph-print/card.html');
await card.waitForTimeout(300);
const pages = await card.$$('.page');
await pages[0].screenshot({ path: '/tmp/ph-print/PH-card-front-300dpi.png' });
await pages[1].screenshot({ path: '/tmp/ph-print/PH-card-back-300dpi.png' });
await browser.close();
console.log('done');
