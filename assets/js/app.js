

function ready() {
  showCoins(1, document.body);
  showCoins(123, document.body);
  showCoins(12345, document.body);
  showCoins(543201, document.body);
  showCoins(320100, document.body);
  showCoins(10000, document.body);
  showCoins(990099, document.body);

  // get("materials", function(data) {
  //   var materials = JSON.parse(data);
  //   materials.forEach(function(id) {
  //     get("materials\\" + id, function(data) {
  //       var material = JSON.parse(data);
  //       console.log(material);
  //     });
  //   });
  // });
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

  for (var id in ores) {
    getItemInfos(id, show);
  }
}

if (document.readyState !== 'loading') {
  ready()
} else {
  document.addEventListener('DOMContentLoaded', ready)
}
