
function ready() {
  for (var amount of [1, 123, 12345, 543201, 320100, 10000, 990099]) {
    document.body.insertAdjacentHTML("beforeend", new Price(amount).html);
  }

  var ores = [ 19697, 19699, 19703, 19698, 19702, 19700, 19701 ];
  var items = ores.map(id => new Item(id));

  Promise.all(items.map(item => item.make()))
  .then(() => items.map(item => item.build("beforeend", document.body)));

  selectMe();
}

if (document.readyState !== 'loading') {
  ready()
} else {
  document.addEventListener('DOMContentLoaded', ready)
}
