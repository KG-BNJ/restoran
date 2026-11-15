(function () {
  const categories = window.OCAK_CATEGORIES;
  const menu = window.OCAK_MENU;
  const catsEl = document.getElementById("cats");
  const dishesEl = document.getElementById("dishes");
  let current = categories[0];

  function renderCats() {
    catsEl.innerHTML = "";
    categories.forEach(function (category) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", category === current ? "true" : "false");
      button.addEventListener("click", function () {
        current = category;
        renderCats();
        renderDishes();
      });
      catsEl.appendChild(button);
    });
  }

  function renderDishes() {
    dishesEl.innerHTML = "";
    menu
      .filter(function (item) {
        return item.category === current;
      })
      .forEach(function (item) {
        const li = document.createElement("li");
        const copy = document.createElement("div");
        const title = document.createElement("h3");
        const desc = document.createElement("p");
        const price = document.createElement("span");
        title.textContent = item.name;
        desc.textContent = item.description;
        price.className = "price";
        price.textContent = window.ocakFormatPrice(item.price);
        copy.append(title, desc);
        li.append(copy, price);
        dishesEl.appendChild(li);
      });
  }

  renderCats();
  renderDishes();

  const form = document.getElementById("reserve-form");
  const done = document.getElementById("reserve-done");
  const summary = document.getElementById("reserve-summary");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const reservations = JSON.parse(localStorage.getItem("ocak-reservations") || "[]");
    reservations.push(Object.assign({ at: new Date().toISOString() }, data));
    localStorage.setItem("ocak-reservations", JSON.stringify(reservations));
    summary.textContent = data.name + ", " + data.guests + " kişi · " + data.date + " " + data.time;
    form.hidden = true;
    done.hidden = false;
  });

  document.getElementById("reserve-again").addEventListener("click", function () {
    form.reset();
    form.hidden = false;
    done.hidden = true;
  });
})();
