
class Item {
  constructor(id) {
    this.id = id;
  }

  make() {
    return Promise.all([
      get("items/"+ this.id + "?lang=fr"), 
      get("items/"+ this.id + "?lang=en")
    ]).then(data => {
      var dataFR = JSON.parse(data[0]),
          dataEN = JSON.parse(data[1]);
      this.nameEN = dataEN["name"];
      this.name = dataFR["name"];
      this.icon = dataFR["icon"];
    });
  }

  get html() {
    return `<div class="item">
      <img src="${ this.icon }"/>
      <span>${ this.name }</span>
      <br/>
      <small>${ this.nameEN }</small>
    </div>`
  }
}