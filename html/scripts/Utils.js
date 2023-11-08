sounds = {}
sounds.click = new Audio("./sounds/click.wav");
sounds.success = new Audio("./sounds/success.wav");
sounds.fail = new Audio("./sounds/falied.wav");
sounds.countdown = new Audio("./sounds/countdown.mp3");
sounds.click .volume = 0.50;
sounds.success.volume = 0.10;
sounds.fail.volume = 0.20;
sounds.countdown.volume = 0.20;
rounds = 2;
memory_running = false;
skillcheck_running = false;
thermite_running = false;
skillbar_running = false;
keycode_running = false;

document.onkeyup = function(event) {
  event = event || window.event;
  var charCode = event.keyCode || event.which;
  if (skillcheck_running) {
    playsound('click');
    clearInterval(skillcheck_TimerInterval);
    clearInterval(skillcheck_MovingInterval);
    if (document.getElementById('SC_Bar_'+skillcheck_barPosition).value == true && String.fromCharCode(charCode) == skillcheck_correctKey.toUpperCase()) {
      EndMinigame(true, 'SkillCheckMinigame', StartSkillCheckCountDown, 'top: 25vh;')
    } else {
      EndMinigame(false, 'SkillCheckMinigame', null, 'top: 25vh;')
    };
  };
  if (skillbar_running) {
    if (charCode == 69) {
      CheckSkillBar()
    };
    if (charCode == 27) {
      $('.Progressbar').stop().css({"background-color": "#df2020"}).animate({
        width: '100%'
      }, {
        duration: parseInt(100),
        complete: function() {
          EndSkillBar(false)
        }
      });
    };
  };
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

function playsound(name) {
  sounds[name].play();
  sounds[name].currentTime=0;
};

function ButtonClicked(num) {
  if (memory_running) {
    playsound('click');
    if (num == mem_keys[0]) {
      if (document.getElementById("CurrentKeys").innerHTML == 'NO INPUT') {
        document.getElementById("CurrentKeys").innerHTML = '*';
      } else {
        document.getElementById("CurrentKeys").innerHTML += '*'
      };
      mem_keys.shift()
      if (mem_keys.length == 0) {
        EndMinigame(true, 'MemoryMinigame', StartMemoryGame);
      }
    } else {
      EndMinigame(false, 'MemoryMinigame');
    };
  };
  if (keycode_running) {
    document.getElementById('KPEnter').style.backgroundColor = "rgb(59, 155, 72)";
    document.getElementById('KPBackspace').style.backgroundColor = "rgb(145, 53, 53)";
    playsound('click');
    if (document.getElementById("KPCurrentKeys").innerHTML == 'NO INPUT') {
      document.getElementById("KPCurrentKeys").innerHTML = num;
    } else {
      document.getElementById("KPCurrentKeys").innerHTML += num
    };
  };
};

function StartCountDown(int, id, style2, notxt) {
  return new Promise((resolve, reject) => {
    var countdown = int;
    var txt = '<div class="Countdown" style="top: 30%; font-size: 3vh;">PREPARING DEVICE</div>'
    if (notxt) {txt = ''};
    playsound('countdown');
    if (style2) {
      document.getElementById(id).innerHTML  += `<div id="CountdownScreen" class="BlackBackground">
                                                    <div id="CountdownText" class="Countdown2">${countdown}</div>
                                                  </div>`;
    } else {
      document.getElementById(id).innerHTML  += `<div id="CountdownScreen" class="BlackBackground">
                                                  ${txt}
                                                  <div id="CountdownText" class="Countdown" style="top: 40%;">${countdown}</div>
                                                </div>`;
    }
    var CountdownInt = setInterval(function() {
      countdown -= 1;
      if (countdown == 0) {
        playsound('countdown');
        document.getElementById("CountdownText").innerHTML = 'GO!';
      } else if (countdown == -1) {
        clearInterval(CountdownInt);
        document.getElementById('CountdownScreen').remove()
        resolve(true);
      } else {
        playsound('countdown');
        document.getElementById("CountdownText").innerHTML = countdown;
      }
    }, 1000);
  });
};

function EndMinigame(bool, id, NexGame, style) {
  $(".Progressbar").stop().css({"width": "100%"});
  skillcheck_running = false
  memory_running = false;
  thermite_running = false;
  return new Promise((resolve, reject) => {
    document.getElementById(id).innerHTML  += `<div id="ResultScreen" class="BlackBackground">
                                                <div id="ResultBanner" class="ResultBanner" style="${style}">
                                                    <img id="ResultIcon" class="ResultIcon" src="./images/check.png">
                                                    <div id="ResultText" class="ResultText">Success!</div>
                                                </div>
                                              </div>`;
    if (bool) {
      rounds -= 1
      document.getElementById("ResultBanner").style.backgroundColor = "#769719";
      document.getElementById("ResultBanner").innerHTML = `
      <i class="fa-solid fa-circle-check" style="position: absolute; width: 2.5vh;height: 2.5vh; top: 0.7vh; left: 1vh; font-size: 2.5vh;"></i>
      <div id="ResultText" class="ResultText">Success!</div>`;
      playsound('success');
      setTimeout(function() {
        document.getElementById('ResultScreen').remove()
        if (rounds == 0) {
          $.post(`https://SN-Hacking/Success`);
          $('#'+id).fadeOut();
        } else {
          NexGame()
        };
        resolve(true);
      }, 2000);
    } else {
      document.getElementById("ResultBanner").style.backgroundColor = "#630F0A";
      document.getElementById("ResultBanner").innerHTML = `
      <i class="fa-solid fa-circle-xmark" style="position: absolute; width: 2.5vh;height: 2.5vh; top: 0.7vh; left: 1vh; font-size: 2.5vh;"></i>
      <div id="ResultText" class="ResultText">You Failed</div>`;
      playsound('fail');
      setTimeout(function() {
        document.getElementById('ResultScreen').remove()
        $.post(`https://SN-Hacking/Fail`);
        $('#'+id).fadeOut();
        resolve(true);
      }, 2000);
    };
  });
};