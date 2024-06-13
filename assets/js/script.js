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

restartQuiz.onclick = () => {
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
  next - btn.classList.remove("show");

}

quitQuiz.onclick = () => {
  window.location.reload();
}

const nextBtn = document.querySelector("footer .next-btn");
const bootmQuesCounter = document.querySelector("footer .total-ques");

nextBtn.onclick = () => {
  quizBox.classList.add("activeQuiz"); //Show quiz box
  resultBox.classList.remove("activeResult"); //Hide result box
  time_Value = 12;
  queCount = 0;
  queNumb = 1;
  user_Score = 0;
  widthValue = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter); //Clear counter
  clearInterval(counter_Line); //Clear counter line
  startTimer(time_Value);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left"; //Change the text of timeText to Time Left
  nextBtn.classList.remove("show"); //Hide next button

}

quitQuiz.onclick = () => {
  window.location.reload();
}

//if Next Que button is clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) { //If question count is less than total question length
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    clearInterval(counter_Line);
    startTimer(time_Value);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");

  } else {
    clearInterval(counter);
    clearInterval(counter_Line);
    showResult();
  }

}

//Get questions and optins from array

function showQuestions(index) {
  const queText = document.querySelector(".ques-text");

  //Create a new span and div tag for question and optionand passing the value using array index

  let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let optionTag = '<div class = "option"><span>' + questions[index].options[0] + '</span></div>' +
    '<div class = "option"><span>' + questions[index].options[1] + '</span></div>' +
    '<div class = "option"><span>' + questions[index].options[2] + '</span></div>' +
    '<div class = "option"><span>' + questions[index].options[3] + '</span></div>';
  queText.innerHTML = queTag; //Add new span tag inside queTag
  option_list.innerHTML = optionTag; //Add new div tag inside option tag
  const option = option_list.querySelector(".option");

  //set onclick attribute to all available options
  for (let i = 0; i < option.length; i++) {
    option[i].setAtrribute("onclick", "optioSelected(this)");
  }
}

//When user clicks an option
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counter_Line);
  let user_Ans = answer.textContent; //Get user selected option
  let correct_Ans = questions[queCount].answer; //Get correct answer from array
  const all_Options = option_list.children.length; //Get all optins items

  if (user_Ans == correct_Ans) { //If user seleted option is equal to correct answer
    user_Score += 1; //Update score with 1
    answer.classList.add("correct"); //Add green to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + user_Score);

  } else {
    answer.classList.add("incorrect"); //Add red to correct selected option
    console.log("Wrong Answer");

    for (let i = 0; i < all_Options; i++) {
      if (option_list.children[i].textContent == correct_Ans) {
        option_list.children[i].setAttribute("class", "option correct"); //Add green to correct selected option
        console.log("Auto selected correct answer");
      }
    }
  }
  for (let i = 0; i < all_Options; i++) {
    option_list.children[i].classList.add("disabled"); //Once user selets an options other options are disabled
  }
  nextBtn.classList.add("show"); //Show next button
}

function showResult() {
  infoBox.classList.remove("activeInfo"); //Hide info box
  quizBox.classList.remove("activeQuiz"); //Hide quiz box
  resultBox.classList.add("activeResult"); //Show result box
  const score_Text = resultBox.querySelector("score-text");
  if (user_Score > 5) { //if user scores more than 3 
    //Create new span
    let scoreTag = '<span>and Congratulations! You got <p>' + user_Score + '</p> out of <p>' + questions.length + '</p></span>';
    score_Text.innerHTML = scoreTag;
  } else if (user_Score > 3) { //if you score more than 3
    let scoreTag = '<span>and Nice! You got <p>' + user_Score + '</p> out of <p>' + questions.length + '</p></span>';
    score_Text.innerHTML = scoreTag;
  } else {
    let scoreTag = '<span>and Sorry! You got <p>' + user_Score + '</p> out of <p>' + questions.length + '</p></span>';
    score_Text.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time; //change value of timeCount with time value
    time--;
    if (time < 9) {
      let add_Zero = timeCount.textContent;
      timeCount.textContent = "0" + add_Zero; //add 0 before time value
    }
    if (time < 0) {
      clearInterval(counter); //clear counter
      timeText.textContent = "Time off"; //Change time text to time off
      const all_Options = option_list.children.length; //Get all option
      let correct_Ans = questions[queCount].answer; //Get correct answer from array
      for (let i = 0; all_Options; i++) {
        if (option_list.children[i].textContent == correct_Ans) {
          option_list.children[i].setAttribute("class", "option correct"); //Add green color to matched option
          console.log("Time off: Auto selected correct answer")
        }
      }
      for (let i = 0; i < all_Options; i++) {
        option_list.children[i].classList.add("disabled"); //Once user selects an option opther options are disabled
      }

      nextBtn.classList.add("show");
    }
  }
}