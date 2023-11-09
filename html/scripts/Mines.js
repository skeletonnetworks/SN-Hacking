var default_mines_values = {
  normal: 0.1,
  mine: -0.5,
  special: 2,
  finished: 10
}

var mines_boxes = 5;
var mine_lifes = 3;
var mines_mines = 5;
var mines_special = 5;

const mine_boxes = [];
var mines_boxesClicked = 0;
var mines_current_multiplier = 1;
var mine_lifes_spent = 0;
var mines_values = {}

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "Mines":
        rounds = 1;
        mines_boxes = data.boxes;
        mine_lifes = data.lifes;
        mines_mines = data.mines;
        mines_special = data.special;
        if (data.values) {
          mines_values = data.values;
        } else {
          mines_values = default_mines_values;
        };
        StartMinesCountDown()
      break;
    }
});

async function StartMinesCountDown() {
  mine_lifes_spent = 0
  mines_current_multiplier = 1.00;
  mine_boxes.length = 0;
  mines_boxesClicked = 0;
  document.getElementById('CurrentMultiplier').innerHTML = '1.00x'
  var i = 0;
  var LifesHtml = "";
  for (let i = 1; i < mine_lifes+1; i++) {
    LifesHtml += '<div class="Tries" id="MineLife'+i+'"></div>';
  };
  document.getElementById("Mines_LifesBar").innerHTML = LifesHtml;
  var NewHtml = '';
  document.getElementById("MinesBoxAreas").style.gridTemplateColumns = 'repeat('+mines_boxes+', 3fr)';
  document.getElementById("MinesBoxAreas").style.gridTemplateRows = 'repeat('+mines_boxes+', 3fr)';
  while(i < mines_boxes * mines_boxes) {
    i += 1;
    NewHtml+= '<div id="MinesBox_'+i+'" class="ThermiteBox" onclick="MinesClick('+i+')"><i class="fa-solid fa-question" style="top:26%;"></i></div>';
  };
  document.getElementById("MinesBoxAreas").innerHTML = NewHtml;
  $('#MinesMinigame').fadeIn();
  await StartCountDown(3, 'MinesMinigame', true);
  StartMinesGame();
};

function StartMinesGame() {
  while(mine_boxes.length < mines_mines + mines_special){
    var boxID = getRandomInt(0, (thermite_boxes * thermite_boxes)) + 1;
    if(mine_boxes.indexOf(boxID) === -1) {
      if (mine_boxes.length < mines_mines) {
        document.getElementById("MinesBox_"+boxID).value = 'Mine';
      } else {
        document.getElementById("MinesBox_"+boxID).value = 'Special';
      }
      mine_boxes.push(boxID);
    };
  }
};

function MinesClick(id) {
  mines_boxesClicked += 1;
  var elem = document.getElementById("MinesBox_"+id)
  elem.style.pointerEvents = 'none';
  if (elem.value) {
    if (elem.value == 'Mine') {
      playsound('fail');
      mines_current_multiplier += mines_values.mine;
      elem.innerHTML = '<i class="fa-solid fa-bomb" style="top:26%;"></i>';
      elem.style.backgroundColor = '#df2020';
      mine_lifes_spent += 1;
      document.getElementById("MineLife"+mine_lifes_spent).style.backgroundColor = '#df2020';
      if (mine_lifes_spent == mine_lifes || mines_current_multiplier <= 0) {
        EndMinigame(false, 'MinesMinigame', null, 'top:30vh;');
      };
    } else {
      playsound('success');
      mines_current_multiplier += mines_values.special;
      elem.innerHTML = '<i class="fa-solid fa-star" style="top:26%;"></i>';
      elem.style.backgroundColor = '#e4d728';
    };
  } else {
    playsound('click');
    elem.innerHTML = '';
    elem.style.backgroundColor = '#257cad';
    mines_current_multiplier += mines_values.normal;
    if (mines_boxesClicked == (mines_boxes * mines_boxes) - mines_boxes + mine_lifes_spent) {
      var i = 0;
      while(i < mines_boxes * mines_boxes) {
        i += 1;
        document.getElementById('MinesBox_'+i).style.pointerEvents = 'none';
        document.getElementById('MinesBox_'+i).style.backgroundColor = '#e4d728';
        document.getElementById('MinesBox_'+i).innerHTML = '<i class="fa-solid fa-star" style="top:26%;"></i>';
        mines_current_multiplier += mines_values.finished;
      };
    };
  };
  document.getElementById('CurrentMultiplier').innerHTML = parseFloat(mines_current_multiplier).toFixed(2)+'x';
}

function MinesChashOut() {
  $.post(`https://SN-Hacking/CallBack`, JSON.stringify(parseFloat(mines_current_multiplier).toFixed(2))); 
  $('#MinesMinigame').fadeOut();
};