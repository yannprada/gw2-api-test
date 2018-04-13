
function show(item) {
  console.log(item);
  
  var div = document.createElement("div");
  div.classList.add('item');

  var img = document.createElement("img");
  img.src = item.icon;
  div.appendChild(img);

  var span = document.createElement("span");
  span.appendChild(document.createTextNode(item.name));
  div.appendChild(span);

  div.appendChild(document.createElement("br"));

  var spanEN = document.createElement("span");
  spanEN.appendChild(document.createTextNode(item.nameEN));
  div.appendChild(spanEN);
  
  document.body.appendChild(div);
}

function getItemInfos(id, fn) {
  get("items/"+ id + "?lang=fr", function(dataFR) {
    get("items/"+ id + "?lang=en", function(dataEN) {
      var item = JSON.parse(dataFR);
      item["nameEN"] = JSON.parse(dataEN)["name"];
      fn(item);
    });
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

function get(endpoint, fn) {
  var client = new XMLHttpRequest();
  client.onload = function() {
      if(this.status == 200 &&
      this.responseText != null) {
      // success!
      fn(this.responseText);
    } else {
      // something went wrong
      console.log("Error: %d (%s)", this.status, this.statusText);
    }
  }
  client.open("GET", "https://api.guildwars2.com/v2/" + endpoint);
  client.send();
}
