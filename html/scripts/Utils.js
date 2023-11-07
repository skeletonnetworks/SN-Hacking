clickSound = new Audio("./sounds/click.wav");
SuccessSound = new Audio("./sounds/success.wav");
FaliedSound = new Audio("./sounds/falied.wav");
CountdownSound = new Audio("./sounds/countdown.mp3");
CountdownSound.volume = 0.20;
clickSound.volume = 0.50;
SuccessSound.volume = 0.10;
FaliedSound.volume = 0.20;

document.onkeyup = function(event) {
  event = event || window.event;
  var charCode = event.keyCode || event.which;
  if (skillcheck_running) {
    clickSound.play();
    clickSound.currentTime=0;
    if (document.getElementById('SC_Bar_'+skillcheck_barPosition).value == true && String.fromCharCode(charCode) == skillcheck_correctKey.toUpperCase()) {
      EndSkillCheckGame(true)
    } else {
      EndSkillCheckGame(false)
    };
  };
  if (skillbar_listening) {
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
}