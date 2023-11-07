var thermite_listening = false;
var thermite_time = 15000;
var thermite_boxes = 5;
var thermite_correctboxes = 8;
var thermite_lifes = 2;
var thermite_showTime = 3000;
const thermite_chosen_boxes = [];
var thermite_templifes = 0;

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "Thermite":
        thermite_boxes = data.boxes;
        thermite_correctboxes =  data.correctboxes;
        thermite_time = data.time;
        thermite_lifes = data.lifes;
        rounds = data.rounds;
        thermite_showTime = data.showTime;
        StartThermiteCountDown()
      break;
    }
});

async function StartThermiteCountDown() {
  thermite_chosen_boxes.length = 0;
  thermite_listening = false;
  var i = 0;
  var NewHtml = '';
  document.getElementById("ThermiteBoxAreas").style.gridTemplateColumns = 'repeat('+thermite_boxes+', 3fr)';
  document.getElementById("ThermiteBoxAreas").style.gridTemplateRows = 'repeat('+thermite_boxes+', 3fr)';
  while(i < thermite_boxes * thermite_boxes) {
    i += 1;
    NewHtml+= '<div id="ThermiteBox_'+i+'" class="ThermiteBox" onclick="ThermiteClick('+i+')"></div>';
  };
  document.getElementById("ThermiteBoxAreas").innerHTML = NewHtml;
  $('#ThermiteMinigame').fadeIn();
  await StartCountDown(3, 'ThermiteMinigame', true);
  StartThermiteGame();
};

function StartThermiteGame() {
  while(thermite_chosen_boxes.length < thermite_correctboxes){
    var boxID = getRandomInt(0, (thermite_boxes * thermite_boxes)) + 1;
    if(thermite_chosen_boxes.indexOf(boxID) === -1) {
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
            EndMinigame(false, 'ThermiteMinigame', null, 'top: 25vh;');
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
      playsound('click');
      elem.style.backgroundColor = '#257cad';
      thermite_chosen_boxes.shift();
      if (thermite_chosen_boxes.length == 0) {
        EndMinigame(true, 'ThermiteMinigame', StartThermiteCountDown, 'top: 25vh;');
      }
    } else {
      playsound('fail');
      elem.style.backgroundColor = '#df2020';
      thermite_templifes -= 1;
      if (thermite_templifes == 0) {
        EndMinigame(false, 'ThermiteMinigame', null, 'top: 25vh;');
      };
    };
  };
};