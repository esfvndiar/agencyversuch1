import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

const publicDir = path.join(__dirname, '../public');

// Create a simple SVG icon
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#18181B"/>
  <path d="M256 128C179.307 128 128 179.307 128 256C128 332.693 179.307 384 256 384C332.693 384 384 332.693 384 256C384 179.307 332.693 128 256 128ZM256 352C197.019 352 160 314.981 160 256C160 197.019 197.019 160 256 160C314.981 160 352 197.019 352 256C352 314.981 314.981 352 256 352Z" fill="white"/>
  <path d="M256 192C220.686 192 192 220.686 192 256C192 291.314 220.686 320 256 320C291.314 320 320 291.314 320 256C320 220.686 291.314 192 256 192ZM256 288C233.909 288 224 278.091 224 256C224 233.909 233.909 224 256 224C278.091 224 288 233.909 288 256C288 278.091 278.091 288 256 288Z" fill="white"/>
</svg>
`;

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate icons
async function generateIcons() {
  for (const { size, name } of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate og-image.jpg
  await sharp(Buffer.from(svgIcon))
    .resize(1200, 630)
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('Generated og-image.jpg');
}

generateIcons().catch(console.error); 