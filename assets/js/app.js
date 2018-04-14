

function ready() {
  // showCoins(1, document.body);
  // showCoins(123, document.body);
  // showCoins(12345, document.body);
  // showCoins(543201, document.body);
  // showCoins(320100, document.body);
  // showCoins(10000, document.body);
  // showCoins(990099, document.body);

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

  var itemPromises = []
  for (var id in ores) {
    itemPromises.push(getItemInfos(id));
  }
  Promise.all(itemPromises).then(items => {
    for (var i = 0; i < items.length; i++) {
      show(items[i]);
    }
  });
}

if (document.readyState !== 'loading') {
  ready()
} else {
  document.addEventListener('DOMContentLoaded', ready)
}
