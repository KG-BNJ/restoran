"""Download Unsplash placeholders. Falls back to a flat PNG if the network fails."""

import struct
import urllib.request
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"
ROOT.mkdir(parents=True, exist_ok=True)

# photo id, filename, width, height, flat fallback RGB
IMAGES = [
    ("1555939594-58d7cb561ad1", "hero.jpg", 1920, 1080, (20, 18, 16)),
    ("1555939594-58d7cb561ad1", "og.jpg", 1200, 630, (20, 18, 16)),
    ("1603360946369-dc9bb6258143", "dish-adana.jpg", 1200, 900, (90, 42, 28)),
    ("1577805947697-89e18249d767", "dish-humus.jpg", 1200, 900, (120, 96, 54)),
    ("1529193591184-b1d58069ecdd", "dish-pirzola.jpg", 1200, 900, (92, 48, 32)),
    ("1544025162-d76694265947", "dish-karisik.jpg", 1200, 900, (70, 36, 24)),
    ("1615485290382-441e4d049cb5", "dish-hunkar.jpg", 1200, 900, (64, 40, 48)),
    ("1576618148400-f54bed99fcfd", "dish-kunefe.jpg", 1200, 900, (150, 90, 36)),
    ("1496116218417-1a781b1c416c", "dish-manti.jpg", 1200, 900, (150, 140, 110)),
    ("1529042410759-befb1204b468", "dish-icli.jpg", 1200, 900, (110, 70, 40)),
    ("1519676867240-f03562e64548", "dish-baklava.jpg", 1200, 900, (140, 96, 40)),
    ("1556679343-c7306c1976bc", "dish-cay.jpg", 1200, 900, (120, 50, 36)),
    ("1577219491135-ce391730fb2c", "chef.jpg", 900, 1200, (40, 48, 42)),
    ("1517248135467-4c7edcad34c4", "interior-1.jpg", 1600, 900, (28, 32, 30)),
    ("1558030006-450675393462", "gallery-1.jpg", 900, 1200, (30, 24, 18)),
    ("1432139555190-58524dae6a55", "gallery-2.jpg", 1200, 1200, (80, 50, 30)),
    ("1509440159596-0249088772ff", "gallery-3.jpg", 900, 1200, (140, 110, 70)),
    ("1414235077428-338989a2e8c0", "gallery-4.jpg", 1200, 900, (36, 32, 28)),
    ("1544787219-7f47ccb76574", "gallery-5.jpg", 900, 1200, (80, 40, 30)),
    ("1488477181946-6428a0291777", "gallery-6.jpg", 1200, 1500, (150, 120, 80)),
    ("1559339352-11d035aa65de", "gallery-7.jpg", 1200, 900, (24, 28, 32)),
    ("1556911220-e15b29be8c8f", "gallery-8.jpg", 900, 1200, (50, 40, 32)),
    ("1512621776951-a57141f2eefd", "gallery-9.jpg", 1200, 1200, (40, 70, 36)),
    ("1551218808-94e220e084d2", "gallery-10.jpg", 900, 1200, (70, 40, 28)),
    ("1556910103-1c02745aae4d", "gallery-11.jpg", 1200, 900, (60, 50, 40)),
    ("1555396273-367ea4eb4db5", "gallery-12.jpg", 900, 1200, (30, 36, 34)),
]


def write_png(path: Path, w: int, h: int, rgb: tuple[int, int, int]) -> None:
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))

    def chunk(tag: bytes, data: bytes) -> bytes:
        return (
            struct.pack(">I", len(data))
            + tag
            + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    path.write_bytes(png)


def download(photo: str, dest: Path, w: int, h: int) -> bool:
    url = (
        f"https://images.unsplash.com/photo-{photo}"
        f"?auto=format&fit=crop&w={w}&h={h}&q=75"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "restoran-dev-placeholders"})
    try:
        with urllib.request.urlopen(req, timeout=25) as res:
            data = res.read()
        if len(data) < 5000:
            return False
        dest.write_bytes(data)
        return True
    except Exception as exc:
        print(f"fail {dest.name}: {exc}")
        return False


def main() -> None:
    for photo, name, w, h, rgb in IMAGES:
        dest = ROOT / name
        ok = download(photo, dest, w, h)
        if not ok:
            # Keep the planned extension out of next/image's way: write a sibling note via png rename
            fallback = dest.with_suffix(".png")
            write_png(fallback, w, h, rgb)
            print(f"flat {fallback.name}")
        else:
            print(f"ok {name} {dest.stat().st_size}")


if __name__ == "__main__":
    main()
