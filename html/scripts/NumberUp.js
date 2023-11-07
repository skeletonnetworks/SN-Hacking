const num_keysClicked = []
const num_keysPlaced = []
var num_keyAmount = 16;
var num_tries = 2;
var num_time = 40000;
var num_shuffleTime = 10000;
var num_fails = 0;

window.addEventListener('message', function(NUI) {
  const data = NUI.data;
  switch (data.Type) {
    case "NumberUp":
      num_keyAmount = data.keyAmount;
      rounds = data.rounds;
      num_tries = data.tries;
      num_time = data.time;
      num_shuffleTime = data.shuffleTime;
      StartNumberUpCountDown();
      break;
  }
});

async function StartNumberUpCountDown() {
  num_keysClicked.length = 0;
  num_keysPlaced.length = 0;
  num_fails = 0
  $('#NumberUpMinigame').fadeIn();
  var TriesHtml = "";
  for (let i = 1; i < num_tries+1; i++) {
    TriesHtml += '<div class="Tries" id="Try'+i+'"></div>';
  };
  document.getElementById("Num_TriesBar").innerHTML = TriesHtml;
  var NewHtml = "";
  for (let i = 1; i < num_keyAmount; i++) {
    NewHtml += '<div class="Button"></div>';
  };
  document.getElementById("Num_keyArea").innerHTML = NewHtml;
  await StartCountDown(3, 'NumberUpMinigame');
  StartNumberUpGame();
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
      EndMinigame(false, 'NumberUpMinigame')     
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
    playsound('click');
    num_keysClicked.push(key);
    document.getElementById("NumberUpBtn"+key).style.backgroundColor = '#1C2740';
    if (num_keysClicked.length == num_keyAmount) {
      EndMinigame(true, 'NumberUpMinigame', StartNumberUpCountDown);
    };
  } else {
    if (key > num_keysClicked.length) {
      playsound('click');
      playsound('fail');
      num_fails += 1;
      document.getElementById("Try"+num_fails).style.backgroundColor = '#3C760D';
      if (num_fails == num_tries) {
        EndMinigame(false, 'NumberUpMinigame');
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