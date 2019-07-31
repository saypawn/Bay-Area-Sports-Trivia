// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

// questions and answer array
var questions = [
  {
    question: 'Last Bay Area sports team to win a championship?',
    answers: [
      { answer: 'Golden State Warriors', value: true },
      { answer: 'SF Giants', value: false },
      { answer: 'Oakland As', value: false },
      { answer: 'SF 49ers', value: false }
    ]
  },
  {
    question: 'First Bay Area sports team to win a championship?',
    answers: [
      { answer: 'Oakland As', value: false },
      { answer: 'SF 49ers', value: false },
      { answer: 'Oakland Raiders', value: true},
      { answer: 'SJ Sharks', value: false }
    ]
  },
  {
    question: 'Which Bay Area sports team has zero championships?',
    answers: [
      { answer: 'SJ Sharks', value: true },
      { answer: 'SF 49ers', value: false },
      { answer: 'SJ Earthquakes', value: false },
      { answer: 'Golden State Warriors', value: false }
    ]
  },
  {
    question: 'Which Bay Area sport franchise has the most championships?',
    answers: [
      { answer: 'SF 49ers', value: false },
      { answer: 'SF Giants', value: false },
      { answer: 'Oakland Raiders', value: false },
      { answer: 'Oakland As', value: true }
    ]
  },
  {
    question: 'First person to win back to back MVPs?',
    answers: [
      { answer: 'Joe Montana', value: true },
      { answer: 'Stephen Curry', value: false },
      { answer: 'Joe Thornton', value: false },
      { answer: 'Madison Bumgarner', value: false }
    ]
  },
  {
    question: 'What year was the San Jose Earthquakes established?',
    answers: [
      { answer: '1990', value: false },
      { answer: '1996', value: true },
      { answer: '1999', value: false },
      { answer: '2000', value: false }
    ]
  },
  {
    question: 'First Bay Area sports team to be established?',
    answers: [
      { answer: 'Golden State Warriors', value: false},
      { answer: 'SJ Sharks', value: false },
      { answer: 'SF 49ers', value: true },
      { answer: 'Oakland As', value: false }
    ]
  }
];

$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'green');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>Finished!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}