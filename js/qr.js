(function () {
  const input = document.getElementById("base");
  const hint = document.getElementById("hint");
  const cards = document.getElementById("cards");
  const saved = (localStorage.getItem(window.OCAK_MENU_BASE_KEY) || "").trim();
  const onThisMachine = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  input.value = saved || (onThisMachine ? "" : location.origin);

  function baseUrl() {
    const raw = input.value.trim();
    if (!raw) return location.origin;
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : "http://" + raw;
    return withProtocol.replace(/\/$/, "");
  }

  function menuUrl(table) {
    const root = baseUrl();
    const url = root + "/menu.html";
    if (!table) return url;
    return url + "?masa=" + encodeURIComponent(String(table));
  }

  function hostName(url) {
    try {
      return new URL(url).hostname;
    } catch (error) {
      return "";
    }
  }

  function card(title, url) {
    const article = document.createElement("article");
    article.className = "card";
    const kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = "Restoran";
    const heading = document.createElement("h2");
    heading.textContent = title;
    const qr = document.createElement("div");
    qr.className = "qr";
    window.ocakDrawQr(qr, url);
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = "Menü için okutun";
    const address = document.createElement("p");
    address.className = "address";
    address.textContent = url;
    article.append(kicker, heading, qr, note, address);
    return article;
  }

  function draw() {
    const root = baseUrl();
    const host = hostName(root);
    const localOnly = host === "localhost" || host === "127.0.0.1" || host === "";
    hint.hidden = !localOnly;
    cards.innerHTML = "";
    cards.appendChild(card("Menü", menuUrl()));
    for (let number = 1; number <= 8; number += 1) {
      cards.appendChild(card("Masa " + number, menuUrl(number)));
    }
  }

  input.addEventListener("input", function () {
    const value = input.value.trim().replace(/\/$/, "");
    if (value) localStorage.setItem(window.OCAK_MENU_BASE_KEY, value);
    else localStorage.removeItem(window.OCAK_MENU_BASE_KEY);
    draw();
  });

  document.getElementById("use-origin").addEventListener("click", function () {
    input.value = location.origin;
    input.dispatchEvent(new Event("input"));
  });

  document.getElementById("print").addEventListener("click", function () {
    window.print();
  });

  draw();
})();
