/* Optimize gallery photos for fast mobile loading.
   - Full image (used in lightbox): resized to max 1100px wide, mozjpeg q74, overwritten in place
   - Thumbnail (used in the grid):   assets/thumb/<file>, max 640px wide, mozjpeg q68
   Run: node build-image-optim.js                                              */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(__dirname, "assets");
const THUMB = path.join(ASSETS, "thumb");
if (!fs.existsSync(THUMB)) fs.mkdirSync(THUMB);

const SKIP = /favicon|apple-touch|icon-|just-my-fit-logo/i;
const files = fs.readdirSync(ASSETS).filter((f) => /\.(jpe?g)$/i.test(f) && !SKIP.test(f));

(async () => {
  let before = 0, afterFull = 0, afterThumb = 0;
  for (const f of files) {
    const fp = path.join(ASSETS, f);
    before += fs.statSync(fp).size;
    const src = fs.readFileSync(fp); // read original once

    const full = await sharp(src)
      .resize({ width: 1100, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(fp, full);
    afterFull += full.length;

    const thumb = await sharp(src)
      .resize({ width: 640, withoutEnlargement: true })
      .jpeg({ quality: 68, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(path.join(THUMB, f), thumb);
    afterThumb += thumb.length;
  }
  const kb = (n) => Math.round(n / 1024);
  console.log("images:", files.length);
  console.log("before (full):", kb(before), "KB");
  console.log("after  (full):", kb(afterFull), "KB");
  console.log("after  (thumb total):", kb(afterThumb), "KB");
  console.log("grid payload now ~", kb(afterThumb), "KB (was", kb(before), "KB)");
})();
