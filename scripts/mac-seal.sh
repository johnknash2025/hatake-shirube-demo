#!/usr/bin/env bash
# Ad-hoc sign each built .app as a whole (seals the bundle; without this macOS says the app is "damaged"),
# verify, then zip with ditto so the signature survives.
set -euo pipefail
cd "$(dirname "$0")/../dist"
version=$(node -p 'require("../package.json").version')
for dir in mac mac-arm64; do
  [ -d "$dir" ] || continue
  arch=$([ "$dir" = mac ] && echo x64 || echo arm64)
  app=$(ls -d "$dir"/*.app)
  codesign --force --deep --sign - "$app"
  codesign --verify --deep --strict --verbose=2 "$app"
  ditto -c -k --sequesterRsrc --keepParent "$app" "hatake-shirube-demo-$version-mac-$arch.zip"
done
ls -la *.zip
