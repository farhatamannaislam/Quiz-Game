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

/**
 * The idea of this JavaScript functions are taken from Ali Aslan, Great Stack and Mushroom Quiz
 */

// Selected DOM elements
const heading = document.querySelector(".title-container");
const start_Btn = document.querySelector(".start-btn button");
const info_Box = document.querySelector(".info-box");
const exit_Btn = info_Box.querySelector(".buttons .quit");
const continue_Btn = info_Box.querySelector(".buttons .restart");
const quiz_Box = document.querySelector(".quiz-box");
const time_Count = document.querySelector(".timer .timer-sec");
const timeLineElement = document.querySelector("header .time-line");
const question = document.getElementById("question");
const answer_Options = document.querySelector(".answer-options");
const resultBox = document.querySelector(".result-box");
const restart_Btn = resultBox.querySelector(".buttons .restart-btn");
const quit_Btn = resultBox.querySelector(".buttons .quit-btn");



// Variables for quiz state
let time = 15; // Initial time for each question
let timer_Interval; // Interval for the timer countdown
let timer_Line; // Interval for the timer line animation
let currentQuestionIndex = 0; // Index of the current question
let correct_Score = 0; // Number of correctly answered questions
let incorrect_Score = 0; // Number of incorrectly answered questions



// Event handler for the start button click
start_Btn.onclick = () => {
  questions = shuffle(questions); // Shuffle the questions
  heading.classList.add("hide"); // Hide the heading element
  info_Box.classList.add("activeInfo"); // Show the information box

};


// Event handler for the exit button click
exit_Btn.onclick = () => {
  info_Box.classList.remove("activeInfo");
  heading.classList.remove("hide");
};

// Event handler for the continue button click
continue_Btn.onclick = () => {
  info_Box.classList.remove("activeInfo"); // Hide Info box
  quiz_Box.classList.add("activeQuiz"); // Show Quiz box
  loadQuestions(); //Dislpay Questions
  startTimer(); // Start Timer countdown
  starttimer_Line(); // Start Timer Line
};

//QUIZ BOX

/**
 * Shuffles the order of elements in an array
 */

function shuffle(array) {
  let currentIndex = array.length;


  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    let randomIndex = Math.floor(Math.random() * currentIndex);
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
function loadQuestions() {
  resetState(); // Remove the previous answer options

  let currentQuestion = questions[currentQuestionIndex]; //Get the current questins with index from 0 to 6
  let questionNumber = currentQuestionIndex + 1; //Question no is always 1 ahead of index

  question.innerHTML = questionNumber + ". " + currentQuestion.question;
  document.getElementById("current-question").textContent = questionNumber; // Update the current question number in the span
  currentQuestion.answers = shuffle(currentQuestion.answers); // Shuffle the answer options to randomize their order
  // Iterate through each answer option and create a button for it
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    answer_Options.appendChild(button);
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
  while (answer_Options.firstChild) {
    answer_Options.removeChild(answer_Options.firstChild);
  }
}

/**
 * Starts the timer for each question.
 * Increments the incorrect score if time runs out without an answer.
 */
function startTimer() {
  time = 15;
  time_Count.textContent = time; // Update the timer display initially
  clearInterval(timer_Interval); // Clear any existing interval, prevent overlapping timers

  timer_Interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer_Interval); // Stop the timer if time reaches 0
      incorrect_Score = incorrect_Score + 1; // Incrementing incorrect score if no answer selected
      document.getElementById("incorrect-score").textContent = incorrect_Score;

      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestions();
        startTimer();
        starttimer_Line();
      } else {
        showResult();
      }
    } else {
      time--; // Decrement the time if it's greater than 0
      time_Count.textContent = time; // Update the timer display
      if (time <= 9) { //if timer is less than 9
        let addZero = time_Count.textContent;
        time_Count.textContent = "0" + addZero; //add a 0 before time value
      }
    }
  }, 1000); // Repeat every 1 second (1000 milliseconds)
}


/**
 * Initializes the timer line and updates its width.
 * Stops the timer when the width reaches 100% or when an answer is selected.
 */
function starttimer_Line() {

  clearInterval(timer_Line);
  //Increments the time by 1 on each interval, updates the width of the time line element
  function timer() {
    time += 1; //upgrading time value with 1
    timeLineElement.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time >= 100) { //if time value is greater or equal to 100
      clearInterval(timer_Line); //clear counterLine
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

  clearInterval(timer_Interval); //Stop the timer when any answer buttons are clicked
  clearInterval(timer_Line); //Stop the timer line when any answer buttons are clicked

  // Add appropriate classes and update scores based on correctness of the selected answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    correct_Score++;
    document.getElementById("correct-score").textContent = correct_Score;
  } else {
    selectedBtn.classList.add("incorrect");
    incorrect_Score++;
    document.getElementById("incorrect-score").textContent = incorrect_Score;
  }
  // Disable all answer buttons and highlight the correct one
  Array.from(answer_Options.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  setTimeout(showNextQuestion, 1000); //Show next question after 1,5sec
}

/**
 * Display the next question or show the result if all questions have been answered.
 */
function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; //increment the current question number
    loadQuestions();
    startTimer();
    starttimer_Line();
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
  info_Box.classList.remove("activeInfo");
  quiz_Box.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");

  let finalScoreElement = resultBox.querySelector(".final-score");
  let scoreMessage;
  // Determine the score message based on the number of correct answers
  if (correct_Score <= 3) {
    scoreMessage = '<span>You scored<div>' + correct_Score + ' out of ' + questions.length + '</div><div>Better luck next time!</div></span>';
  } else if (correct_Score >= 4 && correct_Score <= 6) {
    scoreMessage = '<span>You scored<div>' + correct_Score + ' out of ' + questions.length + '</div><div>Good job! <br> You did really well!</div></span>';
  } else if (correct_Score >= 7) {
    scoreMessage = '<span>You scored<div>' + correct_Score + ' out of ' + questions.length + '</div><div>AWESOME! <br> Excellent!</div></span>';
  }
  finalScoreElement.innerHTML = scoreMessage;
}

// Event listener for the Quit quiz button, reloads the window to restart the quiz upon click
quit_Btn.onclick = () => {
  window.location.reload();
};

// Event listener for the Play again button
restart_Btn.onclick = () => {
  // Remove the result box and show the quiz box
  resultBox.classList.remove("activeResult");
  quiz_Box.classList.add("activeQuiz");
  // Reset question index and scores
  currentQuestionIndex = 0;
  correct_Score = 0;
  incorrect_Score = 0;
  // Display the first question and start the timer and timer line
  loadQuestions();
  startTimer();
  starttimer_Line();
};