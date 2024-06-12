//Add questions and answers

let questions = [{
    numb: 1,
    question: "What is the longest river in the world?",
    answer: "Nile",
    options: ["Nile",
      "Danube",
      "Amazon River",
      "Amur"
    ]
  },


  {
    numb: 2,
    question: "What country has the most natural lakes?",
    answer: "Canada",
    options: ["France",
      "Poland",
      "Canada",
      "Japan"
    ]
  },

  {
    numb: 3,
    question: "What is the capital city of Australia?",
    answer: "Canberra",
    options: ["Sydney",
      "Canberra",
      "Perth",
      "Melbourne"
    ]
  },

  {
    numb: 4,
    question: "Who discovered penicillin?",
    answer: "Alexander Fleming",
    options: ["Alexander Fleming",
      "Marie Curie",
      "Isaac Newton",
      "Albert Einstein"
    ]
  },

  {
    numb: 5,
    question: "Mount Everest is located in which mountain range?",
    answer: "Himalayas",
    options: ["Pyrenees",
      "Karakoram",
      "Alps",
      "Himalayas"
    ]
  },


  {
    numb: 6,
    question: "What is the largest country in Africa by area?",
    answer: "Algeria",
    options: ["Ethiopia",
      "Algeria",
      "Egypt",
      "Cameroon"
    ]
  },

  {
    numb: 7,
    question: "Which country is known as the Land of the Rising Sun?",
    answer: "Japan",
    options: ["Thailand",
      "China",
      "Korea",
      "Japan"
    ]
  },

]

//Reading DOM elements

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit-btn");
const continueBtn = infoBox.querySelector(".buttons .restart-btn");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
const time_line = document.querySelector("header .time-line");
const timeText = document.querySelector(".timer time-left");
const timeCount = document.querySelector(".timer timer-sec");

startBtn.onclick = () => {
    infoBox.classList.add("activeInfo"); // Show the information box

};

exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide the information box

};

continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide the information box
  quizBox.classList.add("activeQuiz"); // Show the Quiz box
  showQuestions(); //Dislpay Questions
  startTimer(); // Start Timer countdown
  startTimerLine(); // Start Timer Line
  queCounter(1); //Count que
};

//Variable for quiz

let time_Value = 12;
let queCount = 0;
let queNumb = 1;
let user_Score = 0;
let counter;
let counter_Line;
let widthValue;


const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = ()=> {
  quizBox.classList.add("activeQuiz"); //Show quiz box
  resultBox.classList.remove("activeResult "); //hide result box
  time_Value = 12;
  queCount = 0;
  queNumb = 1;
  user_Score = 0;
  widthValue = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counter_Line);
  startTimer(time_Value);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left"; //Change the text of timeText
  next-btn.classList.remove("show");

}

quitQuiz.onclick = ()=>{
  window.location.reload();
}