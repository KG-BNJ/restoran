(function () {
  const store = window.OcakStore;
  const money = window.ocakFormatPrice;
  let state = store.load();
  let activeTable = 1;
  let method = "nakit";

  const tablesEl = document.getElementById("tables");
  const roundsEl = document.getElementById("rounds");
  const cashInput = document.getElementById("cash");
  const cashBox = document.getElementById("cash-box");
  const changeEl = document.getElementById("change");
  const payBtn = document.getElementById("pay");
  const draftHint = document.getElementById("draft-hint");

  function bill() {
    return state.bills[activeTable] || [];
  }

  function totals() {
    const gross = store.grossOf(bill());
    const net = gross / (1 + store.VAT_RATE);
    return { gross: gross, net: net, vat: gross - net };
  }

  function commit(mutator) {
    const next = store.load();
    if (mutator(next) === false) return;
    store.save(next);
    state = next;
    render();
  }

  function kitchenOf(id) {
    return state.kitchen.find(function (order) {
      return order.id === id;
    });
  }

  function renderClock() {
    document.getElementById("clock").textContent = new Date().toLocaleString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function todaySales() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return state.sales.filter(function (sale) {
      return new Date(sale.at) >= start;
    });
  }

  function renderDay() {
    const sales = todaySales();
    const sum = sales.reduce(function (total, sale) {
      return total + sale.gross;
    }, 0);
    document.getElementById("day-total").textContent = money(sum);
    document.getElementById("day-count").textContent = sales.length + " adisyon";
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
      if ((state.bills[number] || []).length) button.classList.add("has-items");
      button.addEventListener("click", function () {
        activeTable = number;
        cashInput.value = "";
        render();
      });
      tablesEl.appendChild(button);
    }
  }

  function renderRounds() {
    const lines = bill();
    roundsEl.innerHTML = "";
    document.getElementById("table-title").textContent = "Masa " + activeTable;
    const drafts = state.drafts[activeTable] || [];
    draftHint.hidden = drafts.length === 0;
    if (drafts.length) {
      draftHint.textContent = "Garsonun göndermediği " + drafts.length + " kalem var. Kasaya henüz düşmedi.";
    }
    if (!lines.length) {
      const empty = document.createElement("p");
      empty.className = "empty-line";
      empty.textContent = "Bu masada ödenecek sipariş yok. Garson gönderince burada açılır.";
      roundsEl.appendChild(empty);
      return;
    }
    const groups = {};
    lines.forEach(function (line) {
      const key = String(line.round);
      if (!groups[key]) groups[key] = [];
      groups[key].push(line);
    });
    Object.keys(groups)
      .sort(function (a, b) {
        return Number(a) - Number(b);
      })
      .forEach(function (key) {
        const group = groups[key];
        const order = kitchenOf(group[0].kitchenId);
        const block = document.createElement("article");
        block.className = "round";
        const head = document.createElement("div");
        head.className = "round-head";
        const title = document.createElement("p");
        title.className = "label";
        title.textContent = key + ". tur";
        const pill = document.createElement("span");
        const status = order ? order.status : "new";
        pill.className = "pill is-" + status;
        pill.textContent = store.STATUS_LABEL[status] || status;
        head.append(title, pill);
        const list = document.createElement("ul");
        list.className = "lines";
        group.forEach(function (line) {
          const item = store.itemById(line.id);
          const li = document.createElement("li");
          const name = document.createElement("span");
          const price = document.createElement("span");
          name.textContent = line.qty + " × " + (item ? item.name : "Ürün");
          price.className = "line-price";
          price.textContent = money(store.lineTotal(line));
          li.append(name, price);
          list.appendChild(li);
        });
        block.append(head, list);
        roundsEl.appendChild(block);
      });
  }

  function cashValue() {
    const digits = String(cashInput.value).replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  }

  function renderPay() {
    const sum = totals();
    document.getElementById("net").textContent = money(Math.round(sum.net));
    document.getElementById("vat").textContent = money(Math.round(sum.vat));
    document.getElementById("grand").textContent = money(sum.gross);
    cashBox.hidden = method !== "nakit";
    const received = cashValue();
    const short = method === "nakit" && received < sum.gross;
    if (method === "nakit") {
      const diff = received - sum.gross;
      changeEl.textContent = short ? "Eksik " + money(sum.gross - received) : "Para üstü " + money(diff);
      changeEl.classList.toggle("is-short", short && sum.gross > 0);
    }
    payBtn.disabled = sum.gross === 0 || (method === "nakit" && short);
  }

  function renderPad() {
    const pad = document.getElementById("pad");
    pad.innerHTML = "";
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].forEach(function (key) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = key;
      button.addEventListener("click", function () {
        if (key === "C") cashInput.value = "";
        else if (key === "⌫") cashInput.value = cashInput.value.slice(0, -1);
        else cashInput.value = (cashInput.value + key).replace(/^0+(?=\d)/, "");
        renderPay();
      });
      pad.appendChild(button);
    });
  }

  function render() {
    renderTables();
    renderRounds();
    renderPay();
    renderDay();
  }

  document.querySelectorAll(".method").forEach(function (button) {
    button.addEventListener("click", function () {
      method = button.dataset.method;
      document.querySelectorAll(".method").forEach(function (item) {
        item.classList.toggle("is-on", item === button);
      });
      renderPay();
    });
  });

  cashInput.addEventListener("input", function () {
    cashInput.value = cashInput.value.replace(/[^\d]/g, "");
    renderPay();
  });

  document.getElementById("cancel-bill").addEventListener("click", function () {
    if (!bill().length) return;
    if (!window.confirm("Masa " + activeTable + " adisyonu ve mutfaktaki açık siparişi silinsin mi?")) return;
    const table = activeTable;
    commit(function (next) {
      delete next.bills[table];
      next.kitchen = next.kitchen.filter(function (order) {
        return order.table !== table || order.status === "served";
      });
    });
    cashInput.value = "";
    renderPay();
  });

  payBtn.addEventListener("click", function () {
    if (payBtn.disabled) return;
    const table = activeTable;
    const paidMethod = method;
    const received = paidMethod === "nakit" ? cashValue() : store.grossOf(state.bills[table] || []);
    let sale = null;
    commit(function (next) {
      const lines = next.bills[table] || [];
      const gross = store.grossOf(lines);
      if (!lines.length) return false;
      if (paidMethod === "nakit" && received < gross) return false;
      sale = {
        no: next.nextSale,
        table: table,
        method: paidMethod,
        gross: gross,
        received: paidMethod === "nakit" ? received : gross,
        at: new Date().toISOString(),
        lines: lines.map(function (line) {
          const item = store.itemById(line.id);
          return { name: item ? item.name : "Ürün", qty: line.qty, total: store.lineTotal(line) };
        })
      };
      next.sales.push(sale);
      next.nextSale += 1;
      next.kitchen.forEach(function (order) {
        if (order.table === table && order.status !== "served") order.paid = true;
      });
      delete next.bills[table];
    });
    if (!sale) return;
    cashInput.value = "";
    showReceipt(sale);
  });

  function showReceipt(sale) {
    document.getElementById("receipt-meta").textContent =
      "Adisyon " + String(sale.no).padStart(3, "0") + " · Masa " + sale.table + " · " + (sale.method === "nakit" ? "Nakit" : "Kart");
    const list = document.getElementById("receipt-lines");
    list.innerHTML = "";
    sale.lines.forEach(function (line) {
      const li = document.createElement("li");
      const name = document.createElement("span");
      const price = document.createElement("span");
      name.textContent = line.qty + " × " + line.name;
      price.textContent = money(line.total);
      li.append(name, price);
      list.appendChild(li);
    });
    const change = sale.method === "nakit" ? sale.received - sale.gross : 0;
    document.getElementById("receipt-total").textContent =
      money(sale.gross) + (sale.method === "nakit" ? " · para üstü " + money(change) : "");
    document.getElementById("receipt").showModal();
  }

  document.getElementById("open-day").addEventListener("click", function () {
    const list = document.getElementById("day-list");
    const empty = document.getElementById("day-empty");
    const sales = todaySales().slice().reverse();
    list.innerHTML = "";
    empty.hidden = sales.length > 0;
    sales.forEach(function (sale) {
      const li = document.createElement("li");
      const meta = document.createElement("span");
      const price = document.createElement("strong");
      const time = new Date(sale.at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
      meta.textContent = "#" + String(sale.no).padStart(3, "0") + " · Masa " + sale.table + " · " + time;
      price.textContent = money(sale.gross);
      li.append(meta, price);
      list.appendChild(li);
    });
    document.getElementById("day-sheet").showModal();
  });

  store.subscribe(function (next) {
    state = next;
    render();
  });

  renderPad();
  render();
  renderClock();
  setInterval(renderClock, 30000);
})();
