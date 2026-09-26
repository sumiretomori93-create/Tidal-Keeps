#!/usr/bin/env python3
"""Regenerate embedded UI and build an installable toolpkg. No third-party libraries."""
import argparse, json, pathlib, subprocess, zipfile
root=pathlib.Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',default=str(root.parent/'release'));args=p.parse_args()
ui=root/'ui/tidal_keeps';(ui/'page.js').write_text('module.exports='+json.dumps((ui/'page.html').read_text(),ensure_ascii=False)+';\n',encoding='utf-8')
for f in root.rglob('*.js'):subprocess.run(['node','--check',str(f)],check=True)
manifest=json.loads((root/'manifest.json').read_text());out=pathlib.Path(args.out).resolve();out.mkdir(parents=True,exist_ok=True)
package=out/f"Tidal-Keeps-{manifest['version']}.toolpkg"
with zipfile.ZipFile(package,'w',zipfile.ZIP_DEFLATED) as z:
 for f in sorted(root.rglob('*')):
  if f.is_file() and '__pycache__' not in f.parts:z.write(f,f.relative_to(root))
with zipfile.ZipFile(package) as z:assert z.testzip() is None
print(package)
