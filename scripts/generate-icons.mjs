import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const outputDir = path.resolve('public');

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath);
  
  for (const size of sizes) {
    const pngPath = path.join(outputDir, `icon-${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    console.log(`Generated ${pngPath}`);
  }
  
  // Generate apple-touch-icon (180x180)
  const applePath = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(applePath);
  console.log(`Generated ${applePath}`);
  
  // Generate favicon.ico with multiple sizes
  const icoPath = path.join(outputDir, 'favicon.ico');
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(icoPath);
  console.log(`Generated ${icoPath}`);
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);