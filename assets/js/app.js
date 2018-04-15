

function ready() {
  for (var amount of [1, 123, 12345, 543201, 320100, 10000, 990099]) {
    document.body.insertAdjacentHTML("beforeend", new Price(amount).html);
  }

  var ores = {
    19697: {
      tier: 1,
    },
    19699: {
      tier: 2,
    },
    19703: {
      tier: 2,
    },
    19698: {
      tier: 3,
    },
    19702: {
      tier: 4,
    },
    19700: {
      tier: 5,
    },
    19701: {
      tier: 6,
    },
  };

  var items = Object.keys(ores).map(id => new Item(id));

  Promise.all(items.map(item => item.make()))
  .then(() => items.map(item => document.body.insertAdjacentHTML("beforeend", item.html)));
}

if (document.readyState !== 'loading') {
  ready()
} else {
  document.addEventListener('DOMContentLoaded', ready)
}
