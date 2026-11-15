(function () {
  const KEY = "ocak-menu-base";

  function publicBase() {
    const saved = (localStorage.getItem(KEY) || "").trim().replace(/\/$/, "");
    if (saved) return saved;
    return location.origin;
  }

  function menuUrl(table) {
    const url = publicBase().replace(/\/$/, "") + "/menu.html";
    if (!table) return url;
    return url + "?masa=" + encodeURIComponent(String(table));
  }

  function drawQr(host, text) {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    host.innerHTML = qr.createSvgTag({
      cellSize: 4,
      margin: 8,
      scalable: true,
      alt: "Menü bağlantısı"
    });
  }

  window.ocakPublicBase = publicBase;
  window.ocakMenuUrl = menuUrl;
  window.ocakDrawQr = drawQr;
  window.OCAK_MENU_BASE_KEY = KEY;
})();
