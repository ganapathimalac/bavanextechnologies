import { createWriteStream, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");

const images = {
  "case-retail.jpg": "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "case-supply.jpg": "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "case-banking.jpg": "https://images.pexels.com/photos/7821520/pexels-photo-7821520.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "blog-agentic.jpg": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "blog-ml.jpg": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "blog-genai.jpg": "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "hero-bg.jpg": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "about-team.jpg": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "solutions-platform.jpg": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "avatar-1.jpg": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  "avatar-2.jpg": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  "avatar-3.jpg": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "BavanexSite/1.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`${url} => ${res.statusCode}`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    }).on("error", reject);
  });
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

let ok = 0;
let fail = 0;
for (const [name, url] of Object.entries(images)) {
  const dest = join(outDir, name);
  try {
    process.stdout.write(`Downloading ${name}... `);
    await download(url, dest);
    console.log("OK");
    ok++;
  } catch (e) {
    console.log(`FAIL (${e.message})`);
    fail++;
  }
}
console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
