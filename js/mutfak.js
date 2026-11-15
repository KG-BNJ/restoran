(function () {
  const store = window.OcakStore;
  let state = store.load();

  const columns = {
    new: document.getElementById("col-new"),
    cooking: document.getElementById("col-cooking"),
    ready: document.getElementById("col-ready")
  };

  const nextStatus = { new: "cooking", cooking: "ready", ready: "served" };
  const actionLabel = {
    new: "Hazırlamaya başla",
    cooking: "Hazır",
    ready: "Teslim edildi"
  };

  const printRoot = document.getElementById("print-root");
  let printing = false;
  let printMode = "";
  let printIds = [];

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

  function age(iso) {
    const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (mins < 1) return "şimdi";
    return mins + " dk";
  }

  function render() {
    const open = state.kitchen.filter(function (order) {
      return order.status !== "served";
    });
    document.getElementById("new-count").textContent = String(
      open.filter(function (order) {
        return order.status === "new";
      }).length
    );
    Object.keys(columns).forEach(function (status) {
      const host = columns[status];
      host.innerHTML = "";
      const orders = open
        .filter(function (order) {
          return order.status === status;
        })
        .sort(function (a, b) {
          return new Date(a.at) - new Date(b.at);
        });
      if (!orders.length) {
        const empty = document.createElement("p");
        empty.className = "empty-line";
        empty.textContent = "Bekleyen yok.";
        host.appendChild(empty);
        return;
      }
      orders.forEach(function (order) {
        const card = document.createElement("article");
        card.className = "k-card is-" + order.status;
        const head = document.createElement("div");
        head.className = "k-head";
        const title = document.createElement("h3");
        title.textContent = "Masa " + order.table;
        const meta = document.createElement("p");
        meta.textContent = order.round + ". tur · " + age(order.at);
        head.append(title, meta);
        if (order.paid) {
          const paid = document.createElement("span");
          paid.className = "pill";
          paid.textContent = "Ödendi";
          head.appendChild(paid);
        }
        const list = document.createElement("ul");
        order.lines.forEach(function (line) {
          const item = store.itemById(line.id);
          const li = document.createElement("li");
          li.textContent = line.qty + " × " + (item ? item.name : "Ürün");
          list.appendChild(li);
        });
        const actions = document.createElement("div");
        actions.className = "k-actions";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pay-btn";
        button.textContent = actionLabel[order.status];
        button.addEventListener("click", function () {
          const id = order.id;
          const target = nextStatus[order.status];
          commit(function (next) {
            const found = next.kitchen.find(function (entry) {
              return entry.id === id;
            });
            if (!found) return false;
            found.status = target;
          });
        });
        const reprint = document.createElement("button");
        reprint.type = "button";
        reprint.className = "line-btn";
        reprint.textContent = "Fişi yazdır";
        reprint.addEventListener("click", function () {
          sendToPrinter([order], "manual");
        });
        actions.append(button, reprint);
        card.append(head, list, actions);
        host.appendChild(card);
      });
    });
  }

  function slipTime(iso) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function fillSlips(orders) {
    printRoot.innerHTML = "";
    orders.forEach(function (order) {
      const slip = document.createElement("article");
      slip.className = "slip";
      const brand = document.createElement("p");
      brand.className = "slip-brand";
      brand.textContent = "Mutfak";
      const title = document.createElement("h2");
      title.textContent = "Masa " + order.table;
      const meta = document.createElement("p");
      meta.textContent = order.round + ". tur · " + slipTime(order.at);
      const list = document.createElement("ul");
      order.lines.forEach(function (line) {
        const item = store.itemById(line.id);
        const li = document.createElement("li");
        li.textContent = line.qty + "  " + (item ? item.name : "Ürün");
        list.appendChild(li);
      });
      slip.append(brand, title, meta, list);
      printRoot.appendChild(slip);
    });
  }

  function sendToPrinter(orders, mode) {
    if (!orders.length || printing) return;
    printing = true;
    printMode = mode;
    printIds = orders.map(function (order) {
      return order.id;
    });
    fillSlips(orders);
    window.print();
  }

  function printNewOrders() {
    const jobs = state.kitchen.filter(function (order) {
      return order.status === "new" && !order.printed;
    });
    sendToPrinter(jobs, "auto");
  }

  window.addEventListener("afterprint", function () {
    const ids = printIds.slice();
    const mode = printMode;
    printing = false;
    printMode = "";
    printIds = [];
    if (mode !== "auto" || !ids.length) return;
    commit(function (next) {
      next.kitchen.forEach(function (order) {
        if (ids.indexOf(order.id) !== -1) order.printed = true;
      });
    });
  });

  store.subscribe(function (next) {
    state = next;
    render();
    printNewOrders();
  });

  render();
  renderClock();
  printNewOrders();
  setInterval(function () {
    renderClock();
    render();
  }, 30000);
})();
