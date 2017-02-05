$(document).ready(function() {

  var greenAudio = document.createElement('audio'),
      redAudio = document.createElement('audio'),
      yellowAudio = document.createElement('audio'),
      blueAudio = document.createElement('audio');

  greenAudio.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  redAudio.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  yellowAudio.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  blueAudio.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  var completeSequence,
    counter,
    strictMode,
    hasPresented,
    currentSequence,
    userSequence,
    tile,
    gameContainer,
    startBtn,
    resetBtn,
    title;

  function init() {
    completeSequence = [];
    currentSequence = [];
    userSequence = [];
    counter = 1;
    strictMode = false;
    gameContainer = document.getElementById('game-container');
    title = document.getElementById('title');
    resetBtn = document.querySelector('.reset');
    startBtn = document.querySelector('.start');

    $('#green').click(createUserSequence.bind(this)); // HINT: Must not invoke function here. Example of function currying.
    $('#red').click(createUserSequence.bind(this));
    $('#yellow').click(createUserSequence.bind(this));
    $('#blue').click(createUserSequence.bind(this));

    $('.start').click(generateSequence);
    title.innerHTML = 'Simon: A Memory Game'; // HINT: Change the DOM node's innerHTML property like this
  }

  init();

  function generateSequence() {
    for (var i = 0; i < 20; i++) {
      completeSequence.push(Math.floor((Math.random() * 4) + 1));
    }
    console.log(completeSequence);
    setCurrentSequence();
  }

  function setCurrentSequence() {
    console.log(completeSequence.slice(0, counter));
    currentSequence = completeSequence.slice(0, counter);
    presentSequence(currentSequence);
  }

  function presentSequence(arr) {
    console.log(arr);
    if (counter === 20) {
      // playerWon();
    } else {
      arr.forEach(function(item, index) {
        (function(arrItem) {
          setTimeout(function() {
            light(arrItem);
          }, 250);

        })(item);
      });

      // setTimeout(function() {
      //   // enableEventListeners();
      //   // startBtn.style.display = 'none';
      // }, arr.length * 1000);
    }
  }

  function light(number) {
    tile = $('[data-num=\"' + number + '\"]');
    tile.addClass('active');
    (function(t) {
      window.setTimeout(function() {
        t.removeClass('active');
      }, 1000);
    })(tile);
  }


  function playerWon() {
    title.innerHTML = 'You win!';
    (function() {
      window.setTimeout(init, 2000);
    })();
  }

  function playerLost() {
    title.innerHTML = 'You lost. Try again?';
    (function() {
      window.setTimeout(init, 2000);
    })();
  }

  function createUserSequence(event) {
    var userSelection = parseInt(event.target.dataset.num); // HINT: How we access data-num attribute in HTML
    console.log(userSelection);
    userSequence.push(userSelection);
    console.log(userSequence);
    checkUserSequence(userSelection);
  }

  function checkUserSequence(value) {
    console.log('checking userSequence', userSequence);
    console.log('checking currentSequence', currentSequence);
    if (userSequence[userSequence.length - 1] !== currentSequence[userSequence.length - 1] && !strictMode) {
      // if strictMode is off then player is allowed to try again
      title.innerHTML = 'Incorrect. Please try again';
      //wrongAudio.play();
      setCurrentSequence();
    } else if (userSequence[userSequence.length - 1] !== currentSequence[userSequence.length - 1] && strictMode) {
      playerLost();
    } else {
      //correctAudio.play();
      // and if the user has entered all values correctly, increment counter and setCurrentSequence
      if (userSequence.length === currentSequence.length) {
        counter++;
        setCurrentSequence();
      }

    }
  }

  // event listeners will be added and removed during certain times
  // function enableEventListeners() {
  //   resetBtn.addEventListener('click', init);
  //   gameContainer.addEventListener('click', createUserSequence);
  // }
  //
  // function disableEventListeners() {
  //   startBtn.removeEventListener('click', generateSequence);
  //   gameContainer.removeEventListener('click', createUserSequence);
  // }

});
