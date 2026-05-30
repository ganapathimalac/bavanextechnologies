const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "assets", "images");

const FILES = {
  "hero.jpg": "photo-1677442136019-21780ecad995",
  "science.jpg": "photo-1555949963-aa79dcee981c",
  "cta-team.jpg": "photo-1522071820081-009f0129c71c",
  "platform-design-studio.jpg": "photo-1573496359142-b8d87734a5a2",
  "platform-technology.jpg": "photo-1551288049-bebda4e38f71",
  "platform-business.jpg": "photo-1460925895917-afdab827c52f",
  "product-video.jpg": "photo-1611162616475-46b635cb6868",
  "product-cart.jpg": "photo-1556742049-0cfed4f6a45d",
  "ai-neural.jpg": "photo-1620712943543-bcc4688e7485",
  "product-quest.jpg": "photo-1600880292203-757bb62b4baf",
  "blog-sales.jpg": "photo-1560179707-f14e90ef3623",
  "blog-dashboard.jpg": "photo-1460925895917-afdab827c52f",
  "blog-surveys.jpg": "photo-1507003211169-0a1dd7228f2d",
  "blog-precog.jpg": "photo-1620712943543-bcc4688e7485",
  "blog-agile.jpg": "photo-1542744173-8e7e53415bb0",
  "blog-space.jpg": "photo-1536699646782-c443fdbec683",
  "healthcare.jpg": "photo-1576091160399-112ba8d25d1d",
  "skyline-business.jpg": "photo-1486406146926-c627a92ad1ab",
  "circuit-tech.jpg": "photo-1550751827-4bd374c3f58b",
  "marketing.jpg": "photo-1557804502-669cdf679995",
  "technology-chip.jpg": "photo-1518770660439-4636190af475",
  "cloud-earth.jpg": "photo-1451187580459-43490279c0fa",
  "coding.jpg": "photo-1498050108023-c5249f4df085",
  "api-code.jpg": "photo-1555066931-4365d14bab8c",
  "team-office.jpg": "photo-1522202176988-66273c2fd55f",
  "workspace.jpg": "photo-1504384308090-c894fdcc538d",
  "office-india.jpg": "photo-1521737604893-d14cc237f11d",
  "contact-phone.jpg": "photo-1423666639041-f56000c27a9a",
  "help-support.jpg": "photo-1553877522-43269d4ea984",
  "blog-writing.jpg": "photo-1504711434969-e33886168f995",
  "privacy-security.jpg": "photo-1563986768609-322da13575f3",
  "legal-documents.jpg": "photo-1450101499163-c8848c66ca85"
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "BavanexSite/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    }).on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const seen = new Map();

  for (const [filename, photoId] of Object.entries(FILES)) {
    if (seen.has(photoId)) {
      const existing = seen.get(photoId);
      fs.copyFileSync(path.join(OUT, existing), path.join(OUT, filename));
      console.log("Copied", filename, "from", existing);
      continue;
    }

    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1400&q=85`;
    const dest = path.join(OUT, filename);
    try {
      await download(url, dest);
      seen.set(photoId, filename);
      console.log("Downloaded", filename);
    } catch (err) {
      console.error("Failed", filename, err.message);
      const fallbacks = {
        "blog-space.jpg": "cloud-earth.jpg",
        "blog-writing.jpg": "coding.jpg",
        "marketing.jpg": "blog-sales.jpg"
      };
      const fallback = fallbacks[filename];
      if (fallback && fs.existsSync(path.join(OUT, fallback))) {
        fs.copyFileSync(path.join(OUT, fallback), dest);
        console.log("Fallback copied", filename, "from", fallback);
      }
    }
  }

  console.log("Done.");
}

main();
