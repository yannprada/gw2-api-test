
function show(item) {
  var div = document.createElement("div");
  div.classList.add('item');

  var img = document.createElement("img");
  img.src = item.icon;
  div.appendChild(img);

  var span = document.createElement("span");
  span.textContent = item.name;
  div.appendChild(span);

  div.appendChild(document.createElement("br"));

  var small = document.createElement("small");
  small.textContent = item.nameEN;
  div.appendChild(small);
  
  document.body.appendChild(div);
}

function getItemInfos(id, fn) {
  var getFr = get("items/"+ id + "?lang=fr");
  var getEn = get("items/"+ id + "?lang=en");
  return Promise.all([getFr, getEn]).then(data => {
    var item = JSON.parse(data[0]);
    item["nameEN"] = JSON.parse(data[1])["name"];
    return item;
  });
}

function renderCoins(amount, container) {
  var coinsContainer = document.createElement("div");
  coinsContainer.classList.add('coins');

  if (amount.gold > 0) {
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(amount.gold.toString().padStart(2, "0")));
    coinsContainer.appendChild(span);

    var img = document.createElement("img");
    img.src = "https://wiki.guildwars2.com/images/d/d1/Gold_coin.png";
    coinsContainer.appendChild(img);
  }

  if (amount.gold > 0 || amount.silver > 0) {
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(amount.silver.toString().padStart(2, "0")));
    coinsContainer.appendChild(span);

    var img = document.createElement("img");
    img.src = "https://wiki.guildwars2.com/images/3/3c/Silver_coin.png";
    coinsContainer.appendChild(img);
  }

  var span = document.createElement("span");
  span.appendChild(document.createTextNode(amount.copper.toString().padStart(2, "0")));
  coinsContainer.appendChild(span);

  var img = document.createElement("img");
  img.src = "https://wiki.guildwars2.com/images/e/eb/Copper_coin.png";
  coinsContainer.appendChild(img);

  container.appendChild(coinsContainer);
}

function convertCopper(copper) {
  var gold = Math.floor(copper / 10000);
  var copper = copper % 10000;
  var silver = Math.floor(copper / 100);
  var copper = copper % 100;
  return { gold: gold, silver: silver, copper: copper }
}

function showCoins(copper, container) {
  renderCoins(convertCopper(copper), container);
}

function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.guildwars2.com/v2/" + url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
