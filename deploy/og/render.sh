#!/bin/bash
# Regenera assets/images/og-image.jpg (1200x630) a partir de og-template.html usando Edge headless (Windows).
set -e
cd "$(dirname "$0")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot="$(cygpath -w "$PWD")\\og.png" "file:///$(cygpath -m "$PWD")/og-template.html"
python -c "
from PIL import Image
Image.open('og.png').convert('RGB').save('../../assets/images/og-image.jpg', quality=88, optimize=True, progressive=True)"
rm og.png
