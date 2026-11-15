(function () {
  const menu = window.OCAK_MENU;
  const categories = window.OCAK_CATEGORIES;
  const money = window.ocakFormatPrice;
  const params = new URLSearchParams(location.search);
  const table = Number(params.get("masa"));
  const tableLabel = document.getElementById("table-label");
  const catsEl = document.getElementById("cats");
  const groupsEl = document.getElementById("groups");

  if (table >= 1 && table <= 8) {
    tableLabel.hidden = false;
    tableLabel.textContent = "Masa " + table;
  }

  categories.forEach(function (category, index) {
    const id = "kat-" + index;
    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = category;
    if (index === 0) link.setAttribute("aria-current", "true");
    catsEl.appendChild(link);

    const section = document.createElement("section");
    section.className = "group";
    section.id = id;
    const heading = document.createElement("h2");
    heading.textContent = category;
    const list = document.createElement("ul");
    menu
      .filter(function (item) {
        return item.category === category;
      })
      .forEach(function (item) {
        const li = document.createElement("li");
        const copy = document.createElement("div");
        const title = document.createElement("h3");
        const desc = document.createElement("p");
        const price = document.createElement("span");
        title.textContent = item.name;
        desc.textContent = item.description;
        price.textContent = money(item.price);
        copy.append(title, desc);
        li.append(copy, price);
        list.appendChild(li);
      });
    section.append(heading, list);
    groupsEl.appendChild(section);
  });

  const links = Array.prototype.slice.call(catsEl.querySelectorAll("a"));
  const sections = Array.prototype.slice.call(groupsEl.querySelectorAll(".group"));

  function mark(id) {
    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function onScroll() {
    let current = sections[0] ? sections[0].id : "";
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 220) current = section.id;
    });
    if (current) mark(current);
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
