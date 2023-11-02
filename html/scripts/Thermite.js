var thermite_listening = false;
var thermite_time = 15000;
var thermite_boxes = 5;
var thermite_correctboxes = 8;
var thermite_lifes = 2;
var thermite_rounds = 2;
var thermite_showTime = 3000;
const thermite_chosen_boxes = [];
var thermite_templifes = 0

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "Thermite":
        thermite_boxes = data.boxes;
        thermite_correctboxes =  data.correctboxes;
        thermite_time = data.time;
        thermite_lifes = data.lifes;
        thermite_rounds = data.rounds;
        thermite_showTime = data.showTime;
        StartThermiteCountDown()
      break;
    }
});

function StartThermiteCountDown() {
  thermite_chosen_boxes.length = 0;
  thermite_listening = false;
  var countdown = 3;
  var i = 0;
  var NewHtml = '';
  document.getElementById("ThermiteBoxAreas").style.gridTemplateColumns = 'repeat('+thermite_boxes+', 3fr)';
  document.getElementById("ThermiteBoxAreas").style.gridTemplateRows = 'repeat('+thermite_boxes+', 3fr)';
  while(i < thermite_boxes * thermite_boxes) {
    i += 1;
    NewHtml+= '<div id="ThermiteBox_'+i+'" class="ThermiteBox" onclick="ThermiteClick('+i+')"></div>';
  };
  document.getElementById("ThermiteBoxAreas").innerHTML = NewHtml;
  $('#ThermiteMinigame').show();
  $('#Thermite_CountdownScreen').show();
  CountdownSound.play();
  CountdownSound.currentTime=0;
  document.getElementById("Thermite_Countdown").innerHTML = countdown;
  var CountdownInt = setInterval(function() {
    countdown -= 1;
    if (countdown == -0) {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Thermite_Countdown").innerHTML = 'GO!';
    } else if (countdown == -1) {
      clearInterval(CountdownInt);
      $('#Thermite_CountdownScreen').hide();
      StartThermiteGame();
    } else {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("Thermite_Countdown").innerHTML = countdown;
    }
  }, 1000);
};

function StartThermiteGame() {
  while(thermite_chosen_boxes.length < thermite_correctboxes){
    var boxID = Math.floor(Math.random() * (thermite_boxes * thermite_boxes)) + 1;
    if(thermite_chosen_boxes.indexOf(boxID) === -1) {
      console.log(boxID);
      document.getElementById("ThermiteBox_"+boxID).style.backgroundColor = '#257cad';
      document.getElementById("ThermiteBox_"+boxID).value = true;
      thermite_chosen_boxes.push(boxID);
    };
  }
  $("#Thermite_showTime").stop().css({"width": '100%', "height": '0.5vh'}).animate({
    width: '0%'
  }, {
    duration: parseInt(thermite_showTime),
    complete: function() {
      $("#Thermite_showTime").stop().css({"height": '0.0vh'});
      thermite_chosen_boxes.forEach(function (value, i) {
        document.getElementById("ThermiteBox_"+value).style.backgroundColor = '#0d1320';
        thermite_templifes = thermite_lifes;
        thermite_listening = true;
        $(".Progressbar").stop().css({"width": '100%'}).animate({
          width: '0%'
        }, {
          duration: parseInt(thermite_time),
          complete: function() {
            EndThermiteGame(false)
          }
        });
    });
    }
  });
};

function ThermiteClick(id) {
  if (thermite_listening) {
    var elem = document.getElementById("ThermiteBox_"+id)
    if (elem.value == true) {
      elem.style.pointerEvents = 'none';
      clickSound.play();
      clickSound.currentTime=0;
      elem.style.backgroundColor = '#257cad';
      thermite_chosen_boxes.shift()
      if (thermite_chosen_boxes.length == 0) {
        EndThermiteGame(true)
      }
    } else {
      FaliedSound.play();
      FaliedSound.currentTime=0;
      elem.style.backgroundColor = '#df2020';
      thermite_templifes -= 1
      if (thermite_templifes == 0) {
        EndThermiteGame(false)
      };
    };
  };
};

function EndThermiteGame(bool) {
  $(".Progressbar").stop().css({"width": "100%"});
  $('#Thermite_ResultScreen').show();
  if (bool) {
    thermite_listening = false;
    thermite_rounds -= 1
    document.getElementById("Thermite_ResultBanner").style.backgroundColor = "#769719";
    document.getElementById("Thermite_ResultIcon").src = "./images/check.png";
    document.getElementById("Thermite_ResultText").innerHTML = "Success!";
    SuccessSound.play();
    SuccessSound.currentTime=0;
    setTimeout(function() {
      $('#Thermite_ResultScreen').hide();
      if (thermite_rounds == 0) {
        $('#ThermiteMinigame').hide();
        $.post(`https://SN-Hacking/Success`);
      } else {
        StartThermiteCountDown();
      };
    }, 2000);
  } else {
    document.getElementById("Thermite_ResultBanner").style.backgroundColor = "#630F0A";
    document.getElementById("Thermite_ResultIcon").src = "./images/x.png";
    document.getElementById("Thermite_ResultText").innerHTML = "You Failed";
    FaliedSound.play();
    FaliedSound.currentTime=0;
    setTimeout(function() {
      $('#Thermite_ResultScreen').hide();
      $('#ThermiteMinigame').hide();
      $.post(`https://SN-Hacking/Fail`);
    }, 2000);
  };
};