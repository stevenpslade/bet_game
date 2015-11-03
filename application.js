$(function() {

  var bank = 100;
  var bet = 0;
  var guess;
  var randomNumber;
  var answer;

  function between(x, min, max) {
    return x >= min && x <= max;
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function win() {
    bank += (bet * 2);
  }

  function lose() {
   bank -= bet;
  }

  function updateBank() {
    $('.amount').text(bank);
  }

  $( "#user_bet" ).on('keypress', function(event) {
    if (event.keyCode == 13) {
      bet = parseInt($("#user_bet").val(), 10);
      if (between(bet, 5, 10)) {
        $("#user_bet").hide();
        $('h1').text('Guess a number:');
        $("#user_guess").show();
      } else {
        alert('Your bet must be between $5 and $10.');
      };
    };
  })

  $( "#user_guess" ).on('keypress', function(event) {
    if (event.keyCode == 13) {
      randomNumber = getRandomIntInclusive(1, 2);
      guess = parseInt($("#user_guess").val(), 10);
      if (between(guess, 1, 10)) {
        switch (guess) {
          case randomNumber:
            alert('Correct!');
            win();
            break;
          // case (guess ? Math.abs(randomNumber - guess) === 1 : false):
          //   alert('So close! The number was ' + randomNumber);
          //   break;
          default:
            alert('You lost. The number was ' + randomNumber);
            lose();
            break;
        };
      } else {
        alert('Your guess must be between 1 and 10.');
      };
      $("#user_guess").hide();
      $('h1').text('Play again?');
      $("#play_again").show();
      updateBank();
    };
  })

  $( "#play_again" ).on('keypress', function(event) {
    if (event.keyCode == 13) {
      answer = $("#play_again").val();
      if (answer === 'yes') {
        $("#play_again").hide();
        $('h1').text('Place another bet:');
        $("#user_bet").show();
        $('#myForm')[0].reset();
      } else if (answer === 'no') {
        $("#play_again, h1").hide();
        $("#goodbye").show();
      } else {
        alert('Please say yes or no.');
      };
    };
  })

})