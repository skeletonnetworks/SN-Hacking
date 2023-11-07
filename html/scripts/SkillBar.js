var skillbar_duration = 3000;
var skillbar_left = 0;
var skillbar_width = 10;

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "SkillBar":
        skillbar_duration = data.time;
        skillbar_width = data.width;
        rounds = data.rounds;
        StartSkillBarGame()
      break;
    }
});

function StartSkillBarGame() {
  $('#SkillBarMinigame').fadeIn();
  skillbar_running = true;
  skillbar_left = getRandomInt(15, 100 - skillbar_width);
  var duration = skillbar_duration
  if (typeof duration == 'object') {
    duration = getRandomInt(duration[0], duration[1]);
  };
  $('.PBSkillArea').css("left", skillbar_left + "%")
  $('.PBSkillArea').css("width", skillbar_width + "%");
  $('.Progressbar').stop().css({"width": '0%', "background-color": '#257cad'}).animate({
    width: '100%'
  }, {
    duration: parseInt(skillbar_duration),
    complete: function() {
      $('.Progressbar').stop().css({"background-color": "#df2020"}).animate({
        width: '100%'
      }, {
        duration: parseInt(100),
        complete: function() {
          EndSkillBar(false)
        }
      });
    }
  });
};

function CheckSkillBar() {
  var CurrentWidth = (($('#SkillBar').width() / $('#SkillbarBase').width()) * 100);
  var Max = skillbar_left + skillbar_width;
  if (CurrentWidth >= skillbar_left && CurrentWidth <= Max) {
    rounds -= 1
    if (rounds <= 0) {
      $('.Progressbar').stop().css({"background-color": "#769719"}).animate({
        width: '100%'
      }, {
        duration: parseInt(100),
        complete: function() {
          EndSkillBar(true)
        }
      });
    } else {
      StartSkillBarGame()
    };
  } else {
    $('.Progressbar').stop().css({"background-color": "#df2020"}).animate({
      width: '100%'
    }, {
      duration: parseInt(100),
      complete: function() {
        EndSkillBar(false)
      }
    });
  }
}

function EndSkillBar(bool) {
  skillbar_running = false;
  setTimeout(function() {
    if (bool) {
      $.post(`https://SN-Hacking/Success`);
    } else {
      $.post(`https://SN-Hacking/Fail`);
    };
    $('#SkillBarMinigame').fadeOut();
  }, 500);
}