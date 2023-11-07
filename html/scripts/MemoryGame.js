var mem_keysNeeded = 5
var mem_rounds = 2
var mem_roundTime = 10000
const mem_keys = []
var listening = false

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "MemoryGame":
        mem_keysNeeded = data.keysNeeded;
        mem_rounds = data.rounds;
        mem_roundTime = data.time;
        StartMemoryCountDown();
        break;
    }
});

function StartMemoryCountDown() {
  var countdown = 3
  $('#MemoryMinigame').show();
  $('#Mem_CountdownScreen').show();
  CountdownSound.play();
  CountdownSound.currentTime=0;
  document.getElementById("CurrentKeys").innerHTML = 'NO INPUT';
  document.getElementById("Mem_Countdown").innerHTML = countdown;
  var CountdownInt = setInterval(function() {
    countdown -= 1;
    if (countdown == -0) {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Mem_Countdown").innerHTML = 'GO!';
    } else if (countdown == -1) {
      clearInterval(CountdownInt);
      $('#Mem_CountdownScreen').hide();
      StartMemoryGame()
    } else {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Mem_Countdown").innerHTML = countdown;
    }
  }, 1000);
};

function StartMemoryGame() {
  while(mem_keys.length < mem_keysNeeded){
    var key = getRandomInt(0, 12) + 1;
    if(mem_keys.indexOf(key) === -1) mem_keys.push(key);
  }
  $(".Progressbar").stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(mem_roundTime),
    complete: function() {
      EndMemoryGame(false)
    }
  });
  var i = 0
  var ShowKeys = setInterval(function() {
    if (mem_keys[i-1]) {
      document.getElementById("Button"+mem_keys[i-1]).style.backgroundColor = "";
    };
    if (i < mem_keys.length) {
      clickSound.play();
      clickSound.currentTime=0;
      document.getElementById("Button"+mem_keys[i]).style.backgroundColor = "#FFCC12";
    };
    i += 1
    if (i == mem_keys.length + 1) {
      document.getElementById("Button"+mem_keys[i-2]).style.backgroundColor = "";
      clearInterval(ShowKeys);
      listening = true;
    }
  }, 400);
};

function ButtonClicked(num) {
  if (listening) {
    clickSound.play();
    clickSound.currentTime=0;
    if (num == mem_keys[0]) {
      if (document.getElementById("CurrentKeys").innerHTML == 'NO INPUT') {
        document.getElementById("CurrentKeys").innerHTML = '*';
      } else {
        document.getElementById("CurrentKeys").innerHTML += '*'
      };
      mem_keys.shift()
      if (mem_keys.length == 0) {
        EndMemoryGame(true)
      }
    } else {
      EndMemoryGame(false)
    };
  };
};

function EndMemoryGame(bool) {
  $('#Mem_ResultScreen').show();
  $(".Progressbar").stop().css({"width": "100%"});
  if (bool) {
    listening = false;
    mem_rounds -= 1
    document.getElementById("Mem_ResultBanner").style.backgroundColor = "#769719";
    document.getElementById("Mem_ResultIcon").src = "./images/check.png";
    document.getElementById("Mem_ResultText").innerHTML = "Success!";
    SuccessSound.play();
    SuccessSound.currentTime=0;
    setTimeout(function() {
      $('#Mem_ResultScreen').hide();
      if (mem_rounds == 0) {
        $('#MemoryMinigame').hide();
        $.post(`https://SN-Hacking/Success`);
      } else {
        StartMemoryCountDown();
      };
    }, 2000);
  } else {
    document.getElementById("Mem_ResultBanner").style.backgroundColor = "#630F0A";
    document.getElementById("Mem_ResultIcon").src = "./images/x.png";
    document.getElementById("Mem_ResultText").innerHTML = "You Failed";
    FaliedSound.play();
    FaliedSound.currentTime=0;
    setTimeout(function() {
      $('#Mem_ResultScreen').hide();
      $('#MemoryMinigame').hide();
      $.post(`https://SN-Hacking/Fail`);
    }, 2000);
  };
};