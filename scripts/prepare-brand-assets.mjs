import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const artworkDirectory = join(projectRoot, "materialGraficoMFH");
const logosDirectory = join(artworkDirectory, "logotipos");
const white = { r: 255, g: 255, b: 255, alpha: 1 };

// Crop transparent canvas by alpha only, keeping every visible brand pixel.
// Source files are read into buffers and are never overwritten.
async function trimTransparentCanvas(filename) {
  const source = await readFile(join(logosDirectory, filename));
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .extractChannel("alpha")
    .raw()
    .toBuffer({ resolveWithObject: true });

  let left = info.width;
  let top = info.height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] === 0) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) {
    throw new Error("A logo oficial não contém pixels visíveis: " + filename);
  }

  return sharp(source)
    .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
    .png()
    .toBuffer();
}

async function createIcon(logo, size, padding, filename) {
  const { data, info } = await sharp(logo)
    .resize(size - padding * 2, size - padding * 2, { fit: "inside" })
    .png()
    .toBuffer({ resolveWithObject: true });

  await sharp({
    create: { width: size, height: size, channels: 4, background: white },
  })
    .composite([
      {
        input: data,
        left: Math.round((size - info.width) / 2),
        top: Math.round((size - info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(projectRoot, "app", filename));
}

async function createOpenGraph(logo) {
  const { data: lockup, info } = await sharp(logo)
    .resize(900, 300, { fit: "inside" })
    .png()
    .toBuffer({ resolveWithObject: true });

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: white },
  })
    .composite([
      {
        input: lockup,
        left: Math.round((1200 - info.width) / 2),
        top: Math.round((630 - info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(projectRoot, "app", "opengraph-image.png"));
}

async function createPublicLogo(logo) {
  const directory = join(projectRoot, "public", "marca");
  await mkdir(directory, { recursive: true });
  await sharp(logo)
    .resize({ width: 1024 })
    .flatten({ background: white })
    .png({ compressionLevel: 9 })
    .toFile(join(directory, "mfh-advogados-logo-preta.png"));
}

const symbol = await trimTransparentCanvas("logo-v2-preto@3x.png");
const lockup = await trimTransparentCanvas("logo-v1-preto@3x.png");
await createIcon(symbol, 192, 20, "icon.png");
await createIcon(symbol, 180, 18, "apple-icon.png");
await createOpenGraph(lockup);
await createPublicLogo(lockup);

console.log(
  "Identidade MFH gerada: ícones, compartilhamento e logo pública oficial.",
);
