/* Generate favicons from the Just My Fit logo.
   Crops to the figure (the brand mark) so it stays legible at small sizes,
   keeping the black brand background. Run: node build-favicons.js          */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "assets", "just-my-fit-logo.jpeg");
const OUT = path.join(__dirname, "assets");

// Square crop framing the lady silhouette, above the "JUST MY FIT" wordmark.
const CROP = { left: 100, top: 58, width: 335, height: 335 };

// A trimmed, square master we resize from.
function master() {
  return sharp(SRC).extract(CROP);
}

async function png(size, file) {
  const buf = await master()
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(OUT, file), buf);
  return buf;
}

// Minimal ICO writer that embeds PNG images (supported by all modern browsers).
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const datas = [];
  let offset = 6 + count * 16;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(img.data.length, 8); // size of data
    e.writeUInt32LE(offset, 12); // offset
    offset += img.data.length;
    entries.push(e);
    datas.push(img.data);
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

(async () => {
  // PNG favicons
  const p16 = await png(16, "favicon-16x16.png");
  const p32 = await png(32, "favicon-32x32.png");
  const p48 = await png(48, "favicon-48x48.png");
  await png(180, "apple-touch-icon.png");
  await png(192, "icon-192.png");
  await png(512, "icon-512.png");

  // Multi-size .ico at the project root
  const ico = buildIco([
    { size: 16, data: p16 },
    { size: 32, data: p32 },
    { size: 48, data: p48 },
  ]);
  fs.writeFileSync(path.join(__dirname, "favicon.ico"), ico);

  console.log("Favicons generated:");
  console.log("  favicon.ico (16/32/48)");
  console.log("  assets/favicon-16x16.png, favicon-32x32.png, favicon-48x48.png");
  console.log("  assets/apple-touch-icon.png (180), icon-192.png, icon-512.png");
})();
