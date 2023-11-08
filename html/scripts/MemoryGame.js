var mem_keysNeeded = 5
var mem_roundTime = 10000
const mem_keys = []
var listening = false

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "MemoryGame":
        mem_keysNeeded = data.keysNeeded;
        rounds = data.rounds;
        mem_roundTime = data.time;
        StartMemoryGame();
        break;
    }
});

async function StartMemoryGame() {
  $('#MemoryMinigame').fadeIn();
  document.getElementById("CurrentKeys").innerHTML = 'NO INPUT';
  await StartCountDown(3, 'MemoryMinigame');
  while(mem_keys.length < mem_keysNeeded){
    var key = getRandomInt(0, 12) + 1;
    if(mem_keys.indexOf(key) === -1) mem_keys.push(key);
  }
  $(".Progressbar").stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(mem_roundTime),
    complete: function() {
      EndMinigame(false, 'MemoryMinigame');
    }
  });
  var i = 0
  var ShowKeys = setInterval(function() {
    if (mem_keys[i-1]) {
      document.getElementById("Button"+mem_keys[i-1]).style.backgroundColor = "";
    };
    if (i < mem_keys.length) {
      playsound('click');
      document.getElementById("Button"+mem_keys[i]).style.backgroundColor = "#FFCC12";
    };
    i += 1
    if (i == mem_keys.length + 1) {
      document.getElementById("Button"+mem_keys[i-2]).style.backgroundColor = "";
      clearInterval(ShowKeys);
      memory_running = true;
    }
  }, 400);
};