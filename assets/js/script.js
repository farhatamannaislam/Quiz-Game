/**
 * Read DOM elements
 */

const Heading = document.querySelector(".title-container");
const StartButton = document.querySelector(".start-btn button");
const InfoBox = document.querySelector(".info-box");
const ExitButton = InfoBox.querySelector(".buttons .quit-btn");
const ContinueButton = InfoBox.querySelector(".buttons .restart-btn");
const QuizBox = document.querySelector(".quiz-box"); 
const TimeCount = document.querySelector(".timer .timer-sec");
const TimeLine = document.querySelector("header .time-line");
const Question = document.getElementById("question");
const AnswerOptions = document.querySelector(".answer-options");
const ResultBox = document.querySelector(".result-box");
const RestartButton = ResultBox.querySelector(".buttons .restart-btn");
const QuitBtn = ResultBox.querySelector(".buttons .quit-btn");
const PageFooter = document.querySelector(".page-footer");

/**
 * Variables for Quiz States
 */

let time = 12; // Initial time to give answer
let timerInterval; // Interval for the timer countdown
let timerLineAnimtion; // Interval for the timer line animation
let currentQuestionIndex = 0; // Index of the current question
let correctScore = 0; // Number of correct answers
let incorrectScore = 0; // Number of incorrect answers

// START BUTTON

// Event handler for the start button click
StartButton.onclick = () => {
    try {
      questions = shuffle(questions ); // Shuffle the questions
      Heading.classList.add("hide"); // Hide the heading element
      PageFooter.classList.add("hide");
      InfoBox .classList.add("activeInfo"); // Show the information box
    } catch (error) {
      alert("Oops! Gremlins invaded the Mushroom Quiz machinery. Try again later!");
    }
  };

// Event handler for the continue button click
ContinueButton.onclick = () => {
    InfoBox.classList.remove("activeInfo"); // Hide Info box
    QuizBox.classList.add("activeQuiz"); // Show Quiz box
    showQuestions(); //Dislpay Questions
    startTimer(); // Start Timer countdown
    startTimerLine(); // Start Timer Line
  };



  // Array passing the questions, answer options and setting the correct answer
let questions = [
    {
      question: "What is the longest river in the world?",
      answers: [
        { text: "Nile", correct: true },
        { text: "Danube", correct: false },
        { text: "Amazon River", correct: false },
        { text: "Amur", correct: false },
      ],
    },
    {
      question: "What country has the most natural lakes??",
      answers: [
        { text: "France", correct: false },
        { text: "Poland", correct: false },
        { text: "Canada", correct: true },
        { text: "Japan", correct: false },
      ],
    },
    {
      question: "What is the capital city of Australia?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Canberra", correct: true },
        { text: "Perth", correct: false },
        { text: "Melbourne", correct: false },
      ],
    },
    {
      question: "Who discovered penicillin?",
      answers: [
        { text: "Alexander Fleming", correct: true },
        { text: "Marie Curie", correct: false },
        { text: "Isaac Newton", correct: false },
        { text: "Albert Einstein", correct: false },
      ],
    },
    {
      question: "Mount Everest is located in which mountain range?",
      answers: [
        { text: "Pyrenees", correct: true },
        { text: "Karakoram", correct: false },
        { text: "Alps", correct: false },
        { text: "Himalayas", correct: true },
      ],
    },
    {
      question: "What is the largest country in Africa by area?",
      answers: [
        { text: "Ethiopia", correct: false },
        { text: "Algeria", correct: true },
        { text: "Egypt", correct: false },
        { text: "Cameroon", correct: false },
      ],
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      answers: [
        { text: "Thailand", correct: false },
        { text: "China", correct: false },
        { text: "Korea", correct: false },
        { text: "Japan", correct: true },
      ],
    },
  ];