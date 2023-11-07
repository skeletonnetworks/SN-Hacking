const num_keysClicked = []
const num_keysPlaced = []
var num_keyAmount = 16;
var num_rounds = 2;
var num_tries = 2;
var num_time = 40000;
var num_shuffleTime = 10000;
var num_fails = 0;

window.addEventListener('message', function(NUI) {
  const data = NUI.data;
  switch (data.Type) {
    case "NumberUp":
      num_keyAmount = data.keyAmount;
      num_rounds = data.rounds;
      num_tries = data.tries;
      num_time = data.time;
      num_shuffleTime = data.shuffleTime;
      StartNumberUpCountDown();
      break;
  }
});

function StartNumberUpCountDown() {
  num_keysClicked.length = 0;
  num_keysPlaced.length = 0;
  num_fails = 0
  var countdown = 3
  $('#NumberUpMinigame').show();
  $('#Num_CountdownScreen').show();
  var TriesHtml = "";
  for (let i = 1; i < num_tries+1; i++) {
    TriesHtml += '<div class="Tries" id="Try'+i+'"></div>';
  };
  document.getElementById("Num_TriesBar").innerHTML = TriesHtml;
  var NewHtml = "";
  for (let i = 1; i < num_keyAmount; i++) {
    NewHtml += '<div class="Button"></div>';
  };
  CountdownSound.play();
  CountdownSound.currentTime=0;
  document.getElementById("Num_keyArea").innerHTML = NewHtml;
  document.getElementById("Num_Countdown").innerHTML = countdown;
  var CountdownInt = setInterval(function() {
    countdown -= 1;
    if (countdown == -0) {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Num_Countdown").innerHTML = 'GO!';
    } else if (countdown == -1) {
      clearInterval(CountdownInt);
      $('#Num_CountdownScreen').hide();
      StartNumberUpGame()
    } else {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Num_Countdown").innerHTML = countdown;
    }
  }, 1000);
};

function StartNumberUpGame() {
  var NewHtml = "";
  while(num_keysPlaced.length < num_keyAmount){
    var key = getRandomInt(0, num_keyAmount) + 1;
    if (num_keysPlaced.indexOf(key) === -1) {
      num_keysPlaced.push(key);
      NewHtml += '<div class="Button" id="NumberUpBtn'+key+'" onclick="NumberUpKey('+key+')"><div class="ButtonFont">'+key+'</div></div>';
    };
  }
  document.getElementById("Num_keyArea").innerHTML = NewHtml;
  $("#Num_Progressbar").stop().css({"width": '100%', "background-color": "#769719"}).animate({
    width: '0%'
  }, {
    duration: parseInt(num_time),
    complete: function() {
      EndNumberUpGame(false)
    }
  });
  $("#Num_shuffleTime").stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(num_shuffleTime),
    complete: function() {
      NumberShuffleButtons();
    }
  });
};

function NumberUpKey(key) {
  if (key == num_keysClicked.length +1) {
    clickSound.play();
    clickSound.currentTime=0;
    num_keysClicked.push(key);
    document.getElementById("NumberUpBtn"+key).style.backgroundColor = '#1C2740';
    if (num_keysClicked.length == num_keyAmount) {
      EndNumberUpGame(true);
    };
  } else {
    if (key > num_keysClicked.length) {
      clickSound.play();
      clickSound.currentTime=0;
      FaliedSound.play();
      FaliedSound.currentTime=0;
      num_fails += 1;
      document.getElementById("Try"+num_fails).style.backgroundColor = '#3C760D';
      if (num_fails == num_tries) {
        EndNumberUpGame(false)
      };
    }
  };
};

function NumberShuffleButtons() {
  num_keysPlaced.length = 0;
  var NewHtml = "";
  while(num_keysPlaced.length < num_keyAmount){
   var key = getRandomInt(0, num_keyAmount) + 1;
    if (num_keysPlaced.indexOf(key) === -1) {
      num_keysPlaced.push(key);
      if (key < num_keysClicked.length +1) {
        NewHtml += '<div class="Button" id="NumberUpBtn'+key+'" style="background-color: #1C2740"><div class="ButtonFont">'+key+'</div></div>';
      } else {
        NewHtml += '<div class="Button" id="NumberUpBtn'+key+'" onclick="NumberUpKey('+key+')"><div class="ButtonFont">'+key+'</div></div>';
      };
    };
  }
  document.getElementById("Num_keyArea").innerHTML = NewHtml;
  $("#Num_shuffleTime").stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(num_shuffleTime),
    complete: function() {
      NumberShuffleButtons();
    }
  });
};

function EndNumberUpGame(bool) {
  $('#ResultScreen').show();
  $(".Progressbar").stop().css({"width": "100%"});
  if (bool) {
    num_rounds -= 1
    document.getElementById("ResultBanner").style.backgroundColor = "#769719";
    document.getElementById("ResultIcon").src = "./images/check.png";
    document.getElementById("ResultText").innerHTML = "Success!";
    SuccessSound.play();
    SuccessSound.currentTime=0;
    setTimeout(function() {
      $('#ResultScreen').hide();
      if (num_rounds == 0) {
        $('#NumberUpMinigame').hide();
        $.post(`https://SN-Hacking/Success`);
      } else {
        StartNumberUpCountDown();
      };
    }, 2000);
  } else {
    document.getElementById("ResultBanner").style.backgroundColor = "#630F0A";
    document.getElementById("ResultIcon").src = "./images/x.png";
    document.getElementById("ResultText").innerHTML = "You Failed";
    setTimeout(function() {
      $('#ResultScreen').hide();
      $('#NumberUpMinigame').hide();
      $.post(`https://SN-Hacking/Fail`);
    }, 2000);
  };
};