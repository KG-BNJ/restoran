(function () {
  const store = window.OcakStore;
  const money = window.ocakFormatPrice;
  const categories = window.OCAK_CATEGORIES;
  let state = store.load();
  let activeTable = 1;
  let category = categories[0];

  const tablesEl = document.getElementById("tables");
  const catsEl = document.getElementById("cats");
  const productsEl = document.getElementById("products");
  const draftEl = document.getElementById("draft-lines");
  const sentEl = document.getElementById("sent-lines");
  const sendBtn = document.getElementById("send");
  const readyNote = document.getElementById("ready-note");

  function drafts() {
    return state.drafts[activeTable] || [];
  }

  function bill() {
    return state.bills[activeTable] || [];
  }

  function commit(mutator) {
    const next = store.load();
    if (mutator(next) === false) return;
    store.save(next);
    state = next;
    render();
  }

  function renderClock() {
    document.getElementById("clock").textContent = new Date().toLocaleString("tr-TR", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function readyOrders(table) {
    return state.kitchen.filter(function (order) {
      return order.status === "ready" && (table ? order.table === table : true);
    });
  }

  function renderTables() {
    tablesEl.innerHTML = "";
    for (let number = 1; number <= store.TABLE_COUNT; number += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "table-btn";
      button.textContent = String(number);
      button.setAttribute("aria-label", "Masa " + number);
      if (number === activeTable) button.classList.add("is-on");
      if ((state.bills[number] || []).length) button.classList.add("has-bill");
      if ((state.drafts[number] || []).length) button.classList.add("has-draft");
      if (readyOrders(number).length) button.classList.add("is-ready");
      button.addEventListener("click", function () {
        activeTable = number;
        render();
      });
      tablesEl.appendChild(button);
    }
  }

  function renderCats() {
    catsEl.innerHTML = "";
    categories.forEach(function (name) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = name;
      button.setAttribute("aria-selected", name === category ? "true" : "false");
      if (name === category) button.classList.add("is-on");
      button.addEventListener("click", function () {
        category = name;
        renderCats();
        renderProducts();
      });
      catsEl.appendChild(button);
    });
  }

  function renderProducts() {
    productsEl.innerHTML = "";
    window.OCAK_MENU.filter(function (item) {
      return item.category === category;
    }).forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "product";
      const name = document.createElement("strong");
      const price = document.createElement("span");
      name.textContent = item.name;
      price.textContent = money(item.price);
      button.append(name, price);
      button.addEventListener("click", function () {
        addItem(item.id);
      });
      productsEl.appendChild(button);
    });
  }

  function addItem(id) {
    const table = activeTable;
    commit(function (next) {
      const items = (next.drafts[table] || []).slice();
      const found = items.find(function (line) {
        return line.id === id;
      });
      if (found) found.qty += 1;
      else items.push({ uid: store.nextUid(next), id: id, qty: 1 });
      next.drafts[table] = items;
    });
  }

  function changeQty(uid, delta) {
    const table = activeTable;
    commit(function (next) {
      const items = (next.drafts[table] || [])
        .map(function (line) {
          if (line.uid !== uid) return line;
          return { uid: line.uid, id: line.id, qty: line.qty + delta };
        })
        .filter(function (line) {
          return line.qty > 0;
        });
      if (items.length) next.drafts[table] = items;
      else delete next.drafts[table];
    });
  }

  function renderDraft() {
    const items = drafts();
    draftEl.innerHTML = "";
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "empty-line";
      li.textContent = "Menüden ürün ekle, sonra gönder.";
      draftEl.appendChild(li);
    } else {
      items.forEach(function (line) {
        const item = store.itemById(line.id);
        const li = document.createElement("li");
        const meta = document.createElement("div");
        const name = document.createElement("div");
        const qty = document.createElement("div");
        const minus = document.createElement("button");
        const plus = document.createElement("button");
        const count = document.createElement("span");
        const price = document.createElement("div");
        name.textContent = item ? item.name : "Ürün";
        minus.type = "button";
        plus.type = "button";
        minus.textContent = "−";
        plus.textContent = "+";
        minus.setAttribute("aria-label", "Azalt");
        plus.setAttribute("aria-label", "Arttır");
        count.textContent = String(line.qty);
        qty.className = "qty";
        qty.append(minus, count, plus);
        meta.append(name, qty);
        price.className = "line-price";
        price.textContent = money(store.lineTotal(line));
        minus.addEventListener("click", function () {
          changeQty(line.uid, -1);
        });
        plus.addEventListener("click", function () {
          changeQty(line.uid, 1);
        });
        li.append(meta, price);
        draftEl.appendChild(li);
      });
    }
    document.getElementById("draft-total").textContent = money(store.grossOf(items));
    sendBtn.disabled = items.length === 0;
  }

  function renderSent() {
    const lines = bill();
    sentEl.innerHTML = "";
    document.getElementById("bill-total").textContent = money(store.grossOf(lines));
    if (!lines.length) {
      const li = document.createElement("li");
      li.className = "empty-line";
      li.textContent = "Gönderilmiş sipariş yok.";
      sentEl.appendChild(li);
      return;
    }
    lines.forEach(function (line) {
      const item = store.itemById(line.id);
      const order = state.kitchen.find(function (entry) {
        return entry.id === line.kitchenId;
      });
      const status = order ? order.status : "new";
      const li = document.createElement("li");
      const name = document.createElement("span");
      const pill = document.createElement("span");
      name.textContent = line.qty + " × " + (item ? item.name : "Ürün");
      pill.className = "pill is-" + status;
      pill.textContent = store.STATUS_LABEL[status] || status;
      li.append(name, pill);
      sentEl.appendChild(li);
    });
  }

  function renderReady() {
    const ready = readyOrders(activeTable);
    const all = readyOrders();
    document.getElementById("ready-count").textContent = String(all.length);
    readyNote.hidden = ready.length === 0;
    if (ready.length) {
      readyNote.textContent = "Masa " + activeTable + " servise hazır.";
    }
  }

  function render() {
    document.getElementById("table-title").textContent = "Masa " + activeTable;
    renderTables();
    renderDraft();
    renderSent();
    renderReady();
  }

  document.getElementById("clear-draft").addEventListener("click", function () {
    if (!drafts().length) return;
    const table = activeTable;
    commit(function (next) {
      delete next.drafts[table];
    });
  });

  sendBtn.addEventListener("click", function () {
    const table = activeTable;
    commit(function (next) {
      const pending = next.drafts[table] || [];
      if (!pending.length) return false;
      const previous = next.bills[table] || [];
      const round = previous.reduce(function (max, line) {
        return Math.max(max, line.round || 0);
      }, 0) + 1;
      const kitchenId = next.nextKitchen;
      next.nextKitchen += 1;
      const fired = pending.map(function (line) {
        return { uid: line.uid, id: line.id, qty: line.qty, round: round, kitchenId: kitchenId };
      });
      next.bills[table] = previous.concat(fired);
      next.kitchen.push({
        id: kitchenId,
        table: table,
        round: round,
        status: "new",
        paid: false,
        at: new Date().toISOString(),
        lines: fired.map(function (line) {
          return { uid: line.uid, id: line.id, qty: line.qty };
        })
      });
      delete next.drafts[table];
    });
  });

  store.subscribe(function (next) {
    state = next;
    render();
  });

  renderCats();
  renderProducts();
  render();
  renderClock();
  setInterval(renderClock, 30000);
})();
