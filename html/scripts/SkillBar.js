var skillbar_duration = 3000;
var skillbar_left = 0;
var skillbar_width = 10;
var skillbar_rounds = 2;
var skillbar_listening = false;

window.addEventListener('message', function(NUI) {
    const data = NUI.data;
    switch (data.Type) {
      case "SkillBar":
        skillbar_duration = data.duration;
        skillbar_width = data.width;
        skillbar_rounds = data.rounds;
        StartSkillBarGame()
      break;
    }
});

function StartSkillBarGame() {
  $('#SkillBarMinigame').fadeIn();
  skillbar_listening = true;
  skillbar_left = Math.floor(Math.random() * (Math.floor(100 - skillbar_width) - Math.ceil(15)) + Math.ceil(15));
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
    skillbar_rounds -= 1
    if (skillbar_rounds <= 0) {
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
  skillbar_listening = false;
  setTimeout(function() {
    if (bool) {
      $.post(`https://SN-Hacking/Success`);
    } else {
      $.post(`https://SN-Hacking/Fail`);
    };
    $('#SkillBarMinigame').fadeOut();
  }, 500);
}