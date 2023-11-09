const memorycard_iconpool = [
  'gamepad',
  'gears',
  'laptop',
  'cloud',
  'link',
  'house',
  'key',
  'star',
  'bolt',
  'ghost',
  'lock',
  'bug',
  'eye',
  'server',
  'hand',
  'truck',
  'power-off',
  'bomb',
  'folder',
  'wifi',
];

var memorycard_difficultys = {
  easy: {grid:[4,3], time: 25000},
  medium: {grid:[6,4], time: 55000},
  hard: {grid:[6,4], time: 65000},
};

var memorycard_icons_using = {};
var memorycard_correct_picks = 0;
var memorycard_running = false;
var memorycard_selected1 = null;
var memorycard_grid_size = null;
var memorycard_difficulty = 'easy';
var memorycard_time = 0;

window.addEventListener('message', function(NUI) {
  const data = NUI.data;
  switch (data.Type) {
    case "MemoryCards":
      memorycard_difficulty = data.difficulty;
      rounds = data.rounds;
      StartMemoryCardCountDown();
    break;
  }
});

async function StartMemoryCardCountDown() {
  var tempList = memorycard_iconpool;
  memorycard_grid_size = memorycard_difficultys[memorycard_difficulty].grid;
  memorycard_time = memorycard_difficultys[memorycard_difficulty].time;
  tempList.length = memorycard_grid_size[0] * memorycard_grid_size[1] / 2;
  memorycard_icons_using = {};
  memorycard_correct_picks = 0;
  memorycard_running = false;
  memorycard_selected1 = null;
  document.getElementById("MemoryCardBoxArea").style.gridTemplateColumns = 'repeat('+memorycard_grid_size[0]+', 3fr)';
  document.getElementById("MemoryCardBoxArea").style.gridTemplateRows = 'repeat('+memorycard_grid_size[1]+', 3fr)';
  var NewHtml = '';
  var i = 0;
  while(i < memorycard_grid_size[0] * memorycard_grid_size[1]) {
    var randomIcon = tempList[getRandomInt(0, tempList.length)];
    if (!memorycard_icons_using[randomIcon] || memorycard_icons_using[randomIcon] && memorycard_icons_using[randomIcon] == 1) {
      NewHtml+= `<div id="memorycard_${i}" class="ThermiteBox" onclick="MemoryCardClick(this)" data-icon=${randomIcon}><i class="fa-solid fa-question" style="font-size: 3vh; top:35%;"></i></div>`;
      if (memorycard_icons_using[randomIcon]) {
        memorycard_icons_using[randomIcon] += 1
      } else {
        memorycard_icons_using[randomIcon] = 1;
      };
      i += 1;
    };
  };
  document.getElementById("MemoryCardBoxArea").innerHTML = NewHtml;
  $('#MemoryCardsMinigame').fadeIn();
  await StartCountDown(3, 'MemoryCardsMinigame', true);
  memorycard_running = true;
  $('.Progressbar').stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(memorycard_time),
    complete: function() {
      $('.Progressbar').stop()
      EndMinigame(false, 'MemoryCardsMinigame', null, 'top: 20vh;');
    }
  });
};
function MemoryCardClick(elem) {
  if (memorycard_running) {
    playsound('click');
    elem.style.pointerEvents = 'none';
    if (memorycard_selected1) {
      elem.innerHTML = `<i class="fa-solid fa-${elem.getAttribute('data-icon')}" style="font-size: 3vh; top:35%;"></i>`;
      if (elem.getAttribute('data-icon') == memorycard_selected1.getAttribute('data-icon')) {
        elem.style.backgroundColor = '#34476e';
        memorycard_correct_picks += 1;
        memorycard_selected1 = null;
        if (memorycard_correct_picks == memorycard_grid_size[0] * memorycard_grid_size[1] / 2) {
          EndMinigame(true, 'MemoryCardsMinigame', StartMemoryCardCountDown, 'top: 20vh;');
        };
      } else {
        elem.style.backgroundColor = '#c04d4d';
        memorycard_selected1.style.backgroundColor = '#c04d4d';
        memorycard_running = false;
        setTimeout(function() {
          elem.style.backgroundColor = '';
          elem.innerHTML = '<i class="fa-solid fa-question" style="font-size: 3vh; top:35%;"></i>';
          elem.style.pointerEvents = '';
          memorycard_selected1.style.backgroundColor = '';
          memorycard_selected1.innerHTML = '<i class="fa-solid fa-question" style="font-size: 3vh; top:35%;"></i>';
          memorycard_selected1.style.pointerEvents = '';
          memorycard_selected1 = null;
          memorycard_running = true;
        }, 500);
      };
    } else {
      memorycard_selected1 = elem;
      elem.innerHTML = `<i class="fa-solid fa-${elem.getAttribute('data-icon')}" style="font-size: 3vh; top:35%;"></i>`;
      elem.style.backgroundColor = '#34476e';
    };
  };
};