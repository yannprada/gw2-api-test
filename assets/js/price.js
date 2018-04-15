
class Price {
  constructor(amount) {
    this.rawAmount = amount;
    this._calc();
  }

  _calc() {
    this.copper = this.rawAmount;
    this.gold = Math.floor(this.copper / 10000);
    this.copper = this.copper % 10000;
    this.silver = Math.floor(this.copper / 100);
    this.copper = this.copper % 100;
  }

  static _amountToString(amount) {
    return amount.toString().padStart(2, "0");
  }

  get goldString() { return Price._amountToString(this.gold); }
  get silverString() { return Price._amountToString(this.silver); }
  get copperString() { return Price._amountToString(this.copper); }

  get html() {
    return `<div class="price">
      ${ this.gold > 0 ? `
        <span>${ this.goldString }</span>
        <img class="gold"/>` : ''
      }
      ${ this.gold > 0 || this.silver > 0 ? `
        <span>${ this.silverString }</span>
        <img class="silver"/>` : ''
      }
      <span>${ this.copperString }</span>
      <img class="copper"/>
    </div>`
  }
}
