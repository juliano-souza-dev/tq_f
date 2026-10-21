#!/usr/bin/env python3
"""Converte um lote pequeno de imagens PNG/JPG em WebP, com validação de qualidade.

Uso: python webapp/tools/convert-batch.py webapp/data/batches/001-home.json
Não altera arquivos originais. Download restrito à branch de referência autorizada.
"""
import io
import json
import math
import sys
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = (ROOT / sys.argv[1]).resolve()
if ROOT not in MANIFEST.parents:
    raise SystemExit("Manifesto fora do workspace")
batch = json.loads(MANIFEST.read_text(encoding="utf-8"))
DEST = (ROOT / batch["outputPrefix"]).resolve()
if ROOT not in DEST.parents:
    raise SystemExit("Destino fora do workspace")
DEST.mkdir(parents=True, exist_ok=True)
SOURCE_URL = "https://raw.githubusercontent.com/juliano-souza-dev/tq_f/{}/{}".format(
    batch["sourceBranch"], batch["sourcePrefix"]
)
def psnr(a, b):
    # Mede a diferença de cor, após qualquer redimensionamento.
    a = a.convert("RGBA")
    b = b.convert("RGBA")
    diff = ImageChops.difference(a, b)
    squared = ImageStat.Stat(diff)
    mse = sum((sd**2 + mn**2) for sd,mn in zip(squared.stddev,squared.mean)) / 4
    return float("inf") if mse == 0 else 10 * math.log10((255*255)/mse)

out = []
for spec in batch["items"]:
    name = spec["source"]
    target = spec["target"]
    if "/" in name or "\\" in name or "/" in target or "\\" in target:
        raise SystemExit("Caminho de asset inválido")
    url = SOURCE_URL + "/" + urllib.parse.quote(name)
    req = urllib.request.Request(url,headers={"User-Agent":"TQ-asset-migration/1.0"})
    with urllib.request.urlopen(req, timeout=90) as response:
        content = response.read()
    try:
        original = ImageOps.exif_transpose(Image.open(io.BytesIO(content)))
        original.load()
    except Exception as exc:
        raise RuntimeError(f"Imagem inválida: {name}") from exc
    max_width = int(spec["maxWidth"])
    img = original.copy()
    if img.width > max_width:
        img = img.resize((max_width, round(img.height*max_width/img.width)), Image.Resampling.LANCZOS)
    img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
    options = [87, 91, 94, 97]
    selected = None
    method = ""
    for quality in options:
        buf = io.BytesIO()
        img.save(buf, "WEBP", quality=quality, method=6)
        with Image.open(io.BytesIO(buf.getvalue())) as decoded:
            decoded.load()
            fidelity = psnr(img,decoded)
        if fidelity >= float(batch.get("qualityMinimumPsnr", 36)):
            selected = buf.getvalue()
            method = f"lossy-q{quality}"
            break
    if selected is None:
        buf = io.BytesIO()
        img.save(buf, "WEBP", lossless=True, method=6)
        selected = buf.getvalue()
        method = "lossless"
        fidelity = float("inf")
    path = DEST / target
    path.write_bytes(selected)
    with Image.open(path) as valid:
        valid.verify()
    if "A" in img.getbands():
        with Image.open(path) as valid:
            assert "A" in valid.getbands(), f"Transparência perdida: {target}"
    entry = {
       "source":name,"target":target,"sourceBytes":len(content),
       "optimizedBytes":len(selected),"sourceWidth":original.width,
       "sourceHeight":original.height,"outputWidth":img.width,
       "outputHeight":img.height,"encoding":method,
       "psnrDb":round(fidelity,2) if math.isfinite(fidelity) else "lossless",
       "savedPercent":round(100*(1-len(selected)/len(content)),1),
       "qualityReviewedByHuman":False
    }
    out.append(entry)
    print(f"{name:32} {len(content)//1024:>5}KB → {len(selected)//1024:>5}KB ({method}, PSNR {entry['psnrDb']})",flush=True)
result = {
 "batch":batch["id"],"processed":len(out),"sourceBytes":sum(x["sourceBytes"] for x in out),
 "optimizedBytes":sum(x["optimizedBytes"] for x in out),
 "items":out,
 "note":"PSNR automático não substitui comparação visual em tamanhos de tela reais."
}
report = MANIFEST.with_name(batch["id"]+"-results.json")
report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"TOTAL: {result['sourceBytes']//1024}KB → {result['optimizedBytes']//1024}KB",flush=True)
