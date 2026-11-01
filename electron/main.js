// Offline shell: loads the bundled app/ from disk and refuses every request that is not a local file.
// No auto-update, no crash reporter, no analytics.
const { app, BrowserWindow, session } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("disable-features", "AutofillServerCommunication,MediaRouter,OptimizationHints");
app.commandLine.appendSwitch("no-pings");
app.commandLine.appendSwitch("disable-background-networking");
app.commandLine.appendSwitch("disable-component-update");
app.commandLine.appendSwitch("disable-domain-reliability");

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeRequest((d, cb) => cb({ cancel: !/^(file|devtools|chrome-extension|data):/.test(d.url) }));
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(false));
  const win = new BrowserWindow({
    width: 1200, height: 800, title: "畑しるべ デモ",
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false, spellcheck: false }
  });
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file:")) e.preventDefault(); });
  win.loadFile(path.join(__dirname, "..", "app", "index.html"));
});
app.on("window-all-closed", () => app.quit());
