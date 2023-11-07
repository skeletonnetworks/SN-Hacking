var skillcheck_timeSpent = 0;
var skillcheck_time = 5000;
var skillcheck_bars = 20;
var skillcheck_safebars = 3;
var skillcheck_rounds = 2;
var skillcheck_speed = 50;
var skillcheck_keys = ['a','s','w','d'];
var skillcheck_correctKey = '';
var skillcheck_barPosition = 0;
var skillcheck_barMoving = 1;
var skillcheck_running = false;
var skillcheck_MovingInterval = null;
var skillcheck_TimerInterval = null;

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "SkillCheck":
        skillcheck_time = data.time;
        skillcheck_bars = data.bars;
        skillcheck_safebars = data.safebars;
        skillcheck_rounds = data.rounds;
        skillcheck_speed = data.speed;
        skillcheck_keys = data.keys;
        StartSkillCheckCountDown();
      break;
    }
});

function StartSkillCheckCountDown() {
  var countdown = 5
  var i = 0
  var NewHtml = ''
  document.getElementById("SC_Timer").innerHTML = '0.0s / '+(skillcheck_time * 0.001).toFixed(2).toString()+'s';
  document.getElementById("SkillCheckBarArea").style.gridTemplateColumns = 'repeat('+skillcheck_bars+', 3fr)';
  while(i < skillcheck_bars) {
    i += 1
    NewHtml+= '<div id="SC_Bar_'+i+'" class="SkillCheckBar" value = false></div>';
  };
  document.getElementById("SkillCheckBarArea").innerHTML = NewHtml;
  $('#SkillCheckMinigame').show();
  $('#SC_CountdownScreen').show();
  CountdownSound.play();
  CountdownSound.currentTime=0;
  document.getElementById("SC_Countdown").innerHTML = countdown;
  var CountdownInt = setInterval(function() {
    countdown -= 1;
    if (countdown == -0) {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("SC_Countdown").innerHTML = 'GO!';
    } else if (countdown == -1) {
      clearInterval(CountdownInt);
      $('#SC_CountdownScreen').hide();
      StartSkillCheckGame()
    } else {
      CountdownSound.play();
      CountdownSound.currentTime=0;
      document.getElementById("SC_Countdown").innerHTML = countdown;
    }
  }, 1000);
};

function StartSkillCheckGame() {
  skillcheck_timeSpent = 0;
  skillcheck_barPosition = 0;
  skillcheck_barMoving = 1;
  skillcheck_running = true;
  var SafeKeyStart = getRandomInt(0, (skillcheck_bars - skillcheck_safebars)) + 1;
  var MiddleKey = Math.round(skillcheck_safebars / 2)
  var i = 0
  while(i < skillcheck_safebars) {
    i += 1
    var id = SafeKeyStart+i
    document.getElementById('SC_Bar_'+id.toString()).style.backgroundColor = '#235C75';
    document.getElementById('SC_Bar_'+id.toString()).value = true;
    if (i == MiddleKey) {
      skillcheck_correctKey = skillcheck_keys[getRandomInt(0, skillcheck_keys.length)];
      document.getElementById('SC_Bar_'+id.toString()).innerHTML = '<div class="SC_CorrectKey">'+skillcheck_correctKey.toUpperCase()+'</div>'
    };
  };
  skillcheck_MovingInterval = setInterval(function() {
    skillcheck_barPosition +=skillcheck_barMoving
    document.getElementById('SC_Bar_'+skillcheck_barPosition).style.backgroundColor = '#4F681E';
    if (skillcheck_barPosition != 0) {
      var elem = document.getElementById('SC_Bar_'+(skillcheck_barPosition-skillcheck_barMoving).toString());
      if (elem) {
        if (elem.value == true) {
          elem.style.backgroundColor = '#235C75';
        } else {
          elem.style.backgroundColor = '#491918';
        };
        if (skillcheck_barPosition == skillcheck_bars) {
          skillcheck_barMoving = -1
        } else if (skillcheck_barPosition == 1) {
          skillcheck_barMoving = 1
        };
      };
    };
  }, skillcheck_speed);
  skillcheck_TimerInterval = setInterval(function() {
    skillcheck_timeSpent += 100
    if (skillcheck_timeSpent >= skillcheck_time) {
      EndSkillCheckGame(false)
      clearInterval(skillcheck_TimerInterval);
    } else {
      document.getElementById("SC_Timer").innerHTML = (skillcheck_timeSpent * 0.001).toFixed(2).toString()+'s / '+(skillcheck_time * 0.001).toFixed(2).toString()+'s';
    }
  }, 100);
};

function EndSkillCheckGame(bool) {
  $('#SC_ResultScreen').show();
  skillcheck_running = false;
  clearInterval(skillcheck_TimerInterval);
  clearInterval(skillcheck_MovingInterval);
  if (bool) {
    skillcheck_rounds -= 1
    document.getElementById("SC_ResultBanner").style.backgroundColor = "#769719";
    document.getElementById("SC_ResultIcon").src = "./images/check.png";
    document.getElementById("SC_ResultText").innerHTML = "Success!";
    SuccessSound.play();
    SuccessSound.currentTime=0;
    setTimeout(function() {
      $('#SC_ResultScreen').hide();
      if (skillcheck_rounds == 0) {
        $('#SkillCheckMinigame').hide();
        $.post(`https://SN-Hacking/Success`);
      } else {
        StartSkillCheckCountDown();
      };
    }, 2000);
  } else {
    document.getElementById("SC_ResultBanner").style.backgroundColor = "#630F0A";
    document.getElementById("SC_ResultIcon").src = "./images/x.png";
    document.getElementById("SC_ResultText").innerHTML = "You Failed";
    FaliedSound.play();
    FaliedSound.currentTime=0;
    setTimeout(function() {
      $('#SC_ResultScreen').hide();
      $('#SkillCheckMinigame').hide();
      $.post(`https://SN-Hacking/Fail`);
    }, 2000);
  };
};