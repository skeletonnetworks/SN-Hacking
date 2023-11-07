document.getElementById("KPButton10").style.gridColumn = '1 / -1'

var keycode_showtime = 999999;
var keycode_code = '999';

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "KeypadShowNumber":
        keycode_showtime = data.time;
        keycode_code = data.code;
        ShowKeyCode();
      break;
      case "KeypadType":
        keycode_showtime = data.time;
        keycode_code = data.code;
        KeyCodePad();
      break;
    }
});

function ShowKeyCode() {
  document.getElementById("KeyCode").innerHTML = keycode_code;
  $('#ShowKeyCode').fadeIn();
  $('.Progressbar').stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(keycode_showtime),
    complete: function() {
      $.post(`https://SN-Hacking/Success`);
      $('#ShowKeyCode').fadeOut();
    }
  });
};

async function KeyCodePad() {
  rounds = 1;
  $('#KeyCodePad').fadeIn();
  document.getElementById('KPEnter').style.backgroundColor = "";
  document.getElementById('KPBackspace').style.backgroundColor = "";
  document.getElementById("KPCurrentKeys").innerHTML = 'NO INPUT'
  await StartCountDown(3, 'KeyCodePad', false, true);
  keycode_running = true;
  $(".Progressbar").stop().css({"width": '100%'}).animate({
    width: '0%'
  }, {
    duration: parseInt(keycode_showtime),
    complete: function() {
      EndMinigame(false, 'KeyCodePad');
    }
  });
};

function ButtonClicked(num) {
  document.getElementById('KPEnter').style.backgroundColor = "rgb(59, 155, 72)";
  document.getElementById('KPBackspace').style.backgroundColor = "rgb(145, 53, 53)";
  if (keycode_running) {
    playsound('click');
    if (document.getElementById("KPCurrentKeys").innerHTML == 'NO INPUT') {
      document.getElementById("KPCurrentKeys").innerHTML = num;
    } else {
      document.getElementById("KPCurrentKeys").innerHTML += num
    };
  };
};

function KPBackspace() {
  if (document.getElementById("KPCurrentKeys").innerHTML != 'NO INPUT') {
    var str = document.getElementById("KPCurrentKeys").innerHTML;
    str = str.slice(0,-1);
    if (str.length == 0) {
      document.getElementById("KPCurrentKeys").innerHTML = 'NO INPUT';
      document.getElementById('KPEnter').style.backgroundColor = "";
      document.getElementById('KPBackspace').style.backgroundColor = "";
    } else {
      document.getElementById("KPCurrentKeys").innerHTML = str;
    };
  };
};

function KPEnter() {
  if (document.getElementById("KPCurrentKeys").innerHTML == keycode_code) {
    EndMinigame(true, 'KeyCodePad', KeyCodePad);
  } else {
    EndMinigame(false, 'KeyCodePad');
  };
};