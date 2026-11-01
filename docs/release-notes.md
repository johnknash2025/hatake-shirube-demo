**ベータ版・署名なし / Beta, unsigned**

畑しるべ（家庭菜園・畑の観察アプリ）のデモ版です。データはすべて架空、ネットへの通信・テレメトリはありません。
Demo of Hatake Shirube, a home-garden observation app. All data is fictional; no network access, no telemetry. Built with Claude.

### 開き方 / How to open
- **Mac**: 解凍 → アプリを右クリック →「開く」→「開く」。止められたら システム設定 → プライバシーとセキュリティ →「このまま開く」。 / Unzip → right-click the app → Open → Open (or System Settings → Privacy & Security → Open Anyway). Apple silicon: `mac-arm64`, Intel: `mac-x64`.
- **Windows**: 解凍して `.exe` を実行、SmartScreen は「詳細情報 → 実行」。 / Unzip, run the `.exe`, SmartScreen: More info → Run anyway.
- **Linux**: `chmod +x` して AppImage を実行。 / `chmod +x` and run the AppImage.

### 確認 / Verify
`SHA256SUMS` と照合してください / check with `shasum -a 256 -c SHA256SUMS` (Linux: `sha256sum -c`).
