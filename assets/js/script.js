// Array passing the questions, answer options
let questions = [{
    question: "What is the longest river in the world?",
    answers: [{
        text: "Danube",
        correct: false
      },
      {
        text: "Nile",
        correct: true
      },
      {
        text: "Amazon River",
        correct: false
      },
      {
        text: "Amur",
        correct: false
      },
    ],
  },
  {
    question: "What country has the most natural lakes?",
    answers: [{
        text: "France",
        correct: false
      },
      {
        text: "Poland",
        correct: false
      },
      {
        text: "Canada",
        correct: true
      },
      {
        text: "Finland",
        correct: false
      },
    ],
  },
  {
    question: "What is the capital city of Australia?",
    answers: [{
        text: "Sydney",
        correct: false
      },
      {
        text: "Canberra",
        correct: true
      },
      {
        text: "Perth",
        correct: false
      },
      {
        text: "Melbourne",
        correct: false
      },
    ],
  },
  {
    question: "Who discovered penicillin?",
    answers: [{
        text: "Albert Einstein",
        correct: false
      },
      {
        text: "Marie Curie",
        correct: false
      },
      {
        text: "Isaac Newton",
        correct: false
      },
      {
        text: "Alexander Fleming",
        correct: true
      },
    ],
  },
  {
    question: "Mount Everest is located in which mountain range?",
    answers: [{
        text: "Himalayas",
        correct: true
      },
      {
        text: "Pyrenees",
        correct: false
      },
      {
        text: "Karakoram",
        correct: false
      },
      {
        text: "Alps",
        correct: false
      },
    ],
  },
  {
    question: "What is the largest country in Africa by area?",
    answers: [{
        text: "Egypt",
        correct: false
      },
      {
        text: "Algeria",
        correct: true
      },
      {
        text: "Cameroon",
        correct: false
      },
      {
        text: "Ethiopia",
        correct: false
      },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [{
        text: "Thailand",
        correct: false
      },
      {
        text: "China",
        correct: false
      },
      {
        text: "Korea",
        correct: false
      },
      {
        text: "Japan",
        correct: true
      },
    ],
  },
];

// Selected DOM elements
const heading = document.querySelector(".title-container");
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const timeCount = document.querySelector(".timer .timer-sec");
const timeLineElement = document.querySelector("header .time-line");
const question = document.getElementById("question");
const answerOptions = document.querySelector(".answer-options");
const resultBox = document.querySelector(".result-box");
const restartBtn = resultBox.querySelector(".buttons .restart-btn");
const quitBtn = resultBox.querySelector(".buttons .quit-btn");


// Variables for quiz state
let time = 15; // Initial time for each question
let timerInterval; // Interval for the timer countdown
let timerLine; // Interval for the timer line animation
let currentQuestionIndex = 0; // Index of the current question
let correctScore = 0; // Number of correctly answered questions
let incorrectScore = 0; // Number of incorrectly answered questions



// Event handler for the start button click
startBtn.onclick = () => {
  try {
    questions = shuffle(questions); // Shuffle the questions
    heading.classList.add("hide"); // Hide the heading element
    infoBox.classList.add("activeInfo"); // Show the information box
  } catch (error) {
    alert("Sorry som error is there!Please try again later!");
  }
};


// Event handler for the exit button click
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  heading.classList.remove("hide");
};

// Event handler for the continue button click
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide Info box
  quizBox.classList.add("activeQuiz"); // Show Quiz box
  showQuestions(); //Dislpay Questions
  startTimer(); // Start Timer countdown
  startTimerLine(); // Start Timer Line
};

//QUIZ BOX

/**
 * Shuffles the order of elements in an array
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}


/**
 * Displays the current question and its answer options to the user.
 * Updates the question number and displays the question text.
 * Shuffles answer options
 */
function showQuestions() {
  resetState(); // Remove the previous answer options

  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;

  question.innerHTML = questionNumber + ". " + currentQuestion.question;
  document.getElementById("current-question").textContent = questionNumber; // Update the current question number in the span
  currentQuestion.answers = shuffle(currentQuestion.answers);// Shuffle the answer options to randomize their order
  // Iterate through each answer option and create a button for it
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    answerOptions.appendChild(button);
    // Set a data attribute for the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Function to remove the previously displayed answer options from the DOM.
 */
function resetState() {
  while (answerOptions.firstChild) {
    answerOptions.removeChild(answerOptions.firstChild);
  }
}

/**
 * Starts the timer for each question.
 * Increments the incorrect score if time runs out without an answer.
 */
function startTimer() {
  time = 15;
  timeCount.textContent = time; // Update the timer display initially
  clearInterval(timerInterval); // Clear any existing interval, prevent overlapping timers
  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval); // Stop the timer if time reaches 0
      incorrectScore = incorrectScore + 1; // Incrementing incorrect score if no answer selected
      document.getElementById("incorrect-score").textContent = incorrectScore;

      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestions();
        startTimer();
        startTimerLine();
      } else {
        showResult();
      }
    } else {
      time--; // Decrement the time if it's greater than 0
      timeCount.textContent = time; // Update the timer display
    }
  }, 1000); // Repeat every 1 second (1000 milliseconds)
}


/**
 * Initializes the timer line and updates its width until reaching 100% or when an answer is selected.
 * Stops the timer when the width reaches 100% or when an answer is selected.
 */
function startTimerLine() {
  let time = 0;
  clearInterval(timerLine);
  timerLine = setInterval(timer, 100);
  //Increments the time by 1 on each interval, updates the width of the time line element
  function timer() {
    time += 1;
    timeLineElement.style.width = time + "%";

    if (time >= 100) {
      clearInterval(timerLine);
    }
  }
}

/**
 * Displays the current question and its answer options to the user.
 * Updates the question number and displays the question text.
 */
function selectAnswer(e) {
  let selectedBtn = e.target;
  let isCorrect = selectedBtn.dataset.correct === "true";

  clearInterval(timerInterval); //Stop the timer when any answer buttons are clicked
  clearInterval(timerLine); //Stop the timer line when any answer buttons are clicked

  // Add appropriate classes and update scores based on correctness of the selected answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    correctScore++;
    document.getElementById("correct-score").textContent = correctScore;
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.classList.add("apply-shake"); // Add shake animation class to incorrect answer button
    incorrectScore++;
    document.getElementById("incorrect-score").textContent = incorrectScore;
  }
  // Disable all answer buttons and highlight the correct one
  Array.from(answerOptions.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  setTimeout(showNextQuestion, 1500); //Show next question after 1,5sec
}

/**
 * Display the next question or show the result if all questions have been answered.
 */
function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; //increment the current question number
    showQuestions();
    startTimer();
    startTimerLine();
  } else {
    // If there are no more questions remaining, show the Result box
    showResult();
  }
}

// RESULT BOX

/**
 * Displays the result of the quiz to the user.
 * Updates the final score element with the score message.
 */
function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");

  let finalScoreElement = resultBox.querySelector(".final-score");
  let scoreMessage;
  // Determine the score message based on the number of correct answers
  if (correctScore <= 3) {
    scoreMessage = '<span>You did<div>' + correctScore + ' out of ' + questions.length + '</div><div>Better luck next time!</div></span>';
  } else if (correctScore >= 4 && correctScore <= 6) {
    scoreMessage = '<span>You did<div>' + correctScore + ' out of ' + questions.length + '</div><div>Good job! <br> You did really well!</div></span>';
  } else if (correctScore >= 7 ) {
    scoreMessage = '<span>You did<div>' + correctScore + ' out of ' + questions.length + '</div><div>AWESOME! <br> Excellent!</div></span>';
  }
  finalScoreElement.innerHTML = scoreMessage;
}

// Event listener for the Quit quiz button, reloads the window to restart the quiz upon click
quitBtn.onclick = () => {
  window.location.reload();
};

// Event listener for the Play again button
restartBtn.onclick = () => {
  // Remove the result box and show the quiz box
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  // Reset question index and scores
  currentQuestionIndex = 0;
  correctScore = 0;
  incorrectScore = 0;
  // Display the first question and start the timer and timer line
  showQuestions();
  startTimer();
  startTimerLine();
};