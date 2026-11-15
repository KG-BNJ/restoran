(function () {
  const KEY = "ocak-ops";
  let channel = null;
  try {
    channel = new BroadcastChannel("ocak-ops");
  } catch (error) {
    channel = null;
  }

  function blank() {
    return {
      drafts: {},
      bills: {},
      kitchen: [],
      sales: [],
      nextSale: 1,
      nextKitchen: 1,
      seq: 1
    };
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && saved.bills && Array.isArray(saved.kitchen)) {
        saved.drafts = saved.drafts || {};
        saved.sales = saved.sales || [];
        saved.nextSale = saved.nextSale || 1;
        saved.nextKitchen = saved.nextKitchen || 1;
        saved.seq = saved.seq || 1;
        return saved;
      }
    } catch (error) {
      console.warn(error);
    }
    return blank();
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
    if (channel) channel.postMessage({ at: Date.now() });
  }

  function subscribe(fn) {
    window.addEventListener("storage", function (event) {
      if (event.key === KEY) fn(load());
    });
    if (channel) {
      channel.onmessage = function () {
        fn(load());
      };
    }
    window.addEventListener("pageshow", function () {
      fn(load());
    });
  }

  function itemById(id) {
    return (window.OCAK_MENU || []).find(function (item) {
      return item.id === id;
    });
  }

  function lineTotal(line) {
    const item = itemById(line.id);
    return item ? item.price * line.qty : 0;
  }

  function grossOf(lines) {
    return (lines || []).reduce(function (sum, line) {
      return sum + lineTotal(line);
    }, 0);
  }

  function nextUid(state) {
    state.seq += 1;
    return "L" + state.seq;
  }

  const STATUS_LABEL = {
    new: "Yeni",
    cooking: "Hazırlanıyor",
    ready: "Hazır",
    served: "Teslim"
  };

  window.OcakStore = {
    KEY: KEY,
    TABLE_COUNT: 8,
    VAT_RATE: 0.1,
    STATUS_LABEL: STATUS_LABEL,
    load: load,
    save: save,
    subscribe: subscribe,
    itemById: itemById,
    lineTotal: lineTotal,
    grossOf: grossOf,
    nextUid: nextUid
  };
})();
