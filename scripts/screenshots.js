// Run with: npx electron scripts/screenshots.js  → docs/screenshots/*.png (light theme, 1200x800).
const { app, BrowserWindow, nativeTheme, session } = require("electron");
const fs = require("fs"), path = require("path");
const pages = ["home", "fields", "diagnosis", "market", "records"];
const out = path.join(__dirname, "..", "docs", "screenshots");
app.whenReady().then(async () => {
  nativeTheme.themeSource = "light";
  session.defaultSession.webRequest.onBeforeRequest((d, cb) => cb({ cancel: !d.url.startsWith("file:") }));
  const win = new BrowserWindow({ width: 1200, height: 800, show: false, useContentSize: true });
  fs.mkdirSync(out, { recursive: true });
  for (const p of pages) {
    await win.loadFile(path.join(__dirname, "..", "app", "index.html"), { hash: p });
    await new Promise(r => setTimeout(r, 300));
    fs.writeFileSync(path.join(out, `${p}.png`), (await win.webContents.capturePage()).toPNG());
    console.log("wrote", p);
  }
  app.quit();
});
