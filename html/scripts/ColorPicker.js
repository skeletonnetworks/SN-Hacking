const colorpicker_iconpool = [
  'server',
  'bug',
  'power-off',
  'bomb',
  'folder',
  'wifi',
  'gamepad',
  'gears',
  'laptop',
  'cloud',
  'link'
];

var colorpicker_colorpool = {
  red: '#CA3521',
  blue: '#0C66E4',
  cyan: 'cyan',
  green: '#6A9A23',
  orange: '#D97008',
  purple: '#6E5DC6',
  yellow: '#F5CD47',
  pink: '#DA62AC',
  white: 'white',
  gray: 'gray',
};

colorpicker_currentIcons = [];
colorpicker_currentColors = [];
var colorpicker_icons = 3;
var colorpicker_viewtime = 3000;
var colorpicker_picktime = 7000;
var pickingIcon = null

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "ColorPicker":
        colorpicker_icons = data.icons;
        colorpicker_picktime = data.typeTime;
        colorpicker_viewtime = data.viewTime;
        rounds = data.rounds;
        ColorPickerIntro()
      break;
    }
});

function ColorPickerIntro() {
  $('#ColorPickerMinigame').fadeIn();
  pickingIcon = null
  document.getElementById('ColorPickerMinigame').innerHTML = '<div id="IconList" class="IconList"></div>'
  var NewHtml = ''
  var i = 0;
  while(i < colorpicker_icons) {
    i += 1;
    NewHtml+= `<i id="CPIcon${i}" class="fa-solid fa-question" style="margin: auto; font-size: 4vh; width: 4vh;"></i>`;
  };
  document.getElementById('IconList').innerHTML = NewHtml;
  var CountdownInt = setInterval(function() {
    var i = 1;
    while(i < colorpicker_icons+1){
      var randomIcon = colorpicker_iconpool[getRandomInt(0, colorpicker_iconpool.length)];
      var randomColor = Object.keys(colorpicker_colorpool)[getRandomInt(0, Object.keys(colorpicker_colorpool).length)];
      if(colorpicker_currentIcons.indexOf(randomIcon) === -1 && colorpicker_currentColors.indexOf(randomColor) === -1) {
        document.getElementById("CPIcon"+i).className = "fa-solid fa-"+randomIcon;
        document.getElementById("CPIcon"+i).style.color = colorpicker_colorpool[randomColor];
        if (colorpicker_currentIcons.length < colorpicker_icons) {
          colorpicker_currentIcons.push(randomIcon);
          colorpicker_currentColors.push(randomColor);
        } else {
          colorpicker_currentIcons.splice(i-1, 1, randomIcon);
          colorpicker_currentColors.splice(i-1, 1, randomColor);
        };
        i += 1
      };
    };
    playsound('countdown');
  }, 500);
  setTimeout(function() {
    clearInterval(CountdownInt);
    var NewHtml = `<div id="RemoveText" class="SkillBarText" style="text-align: center; margin-bottom: 1vh;">Memoize these colors</div>`
    NewHtml += document.getElementById('ColorPickerMinigame').innerHTML;
    NewHtml += `
        <div id="ViewIconsTimer" class="ProgressbarBase" style="width: 80%; height: 0.5vh; left: 0vh; margin: auto; margin-top: 4vh;">
          <div class="Progressbar" style="position: relative; top: 0vh; width: 25%;"></div>
        </div>`;
    document.getElementById('ColorPickerMinigame').innerHTML = NewHtml;
    $('.Progressbar').stop().css({"width": '100%'}).animate({
      width: '0%'
    }, {
      duration: parseInt(colorpicker_viewtime),
      complete: function() {
        $('.Progressbar').stop()
        document.getElementById('RemoveText').remove();
        document.getElementById('ViewIconsTimer').remove();
        document.getElementById('ColorPickerMinigame').innerHTML += `
        <div class="SkillBarText" style="text-align: center; margin-top: 3vh;">Enter the color of the shape above</div>
            <input type="text" class= "ColorPickerInput" onkeydown="ColorPickerAnswer(this)">
            <div class="ProgressbarBase" style="width: 80%; height: 0.5vh; left: 0vh; margin: auto; margin-top: 1vh;">
            <div class="Progressbar" style="position: relative; top: 0vh; width: 25%;"></div>
        </div>`;
        PickTime();
      }
    });
  }, 3000);
};

function PickTime() {
pickingIcon = getRandomInt(0, colorpicker_currentIcons.length)
document.getElementById('IconList').innerHTML = `<i class="fa-solid fa-${colorpicker_currentIcons[pickingIcon]}" style="margin: auto; font-size: 4vh; width: 4vh; color:white;"></i>`;
  $('.Progressbar').stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(colorpicker_picktime),
    complete: function() {
      EndMinigame(false, 'ColorPickerMinigame', null, 'top: 8vh;');
    }
  });
};

function ColorPickerAnswer(ele) {
  if(event.key === 'Enter') {
    if (colorpicker_currentColors[pickingIcon] == ele.value) {
      colorpicker_currentIcons.splice(pickingIcon, 1);
      colorpicker_currentColors.splice(pickingIcon, 1);
      if (colorpicker_currentIcons.length == 0) {
        EndMinigame(true, 'ColorPickerMinigame', ColorPickerIntro, 'top: 8vh;');
      } else {
        playsound('success');
        PickTime();
        ele.value = null;
        ele.innerHTML = '';
      };
    } else {
      EndMinigame(false, 'ColorPickerMinigame', null, 'top: 8vh;');
    };        
  }
}