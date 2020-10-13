/*Bootcamp Project Module 4
<!--Version 1.0-->
<!--Author:AC-->
<!--Date: 10-12-2020*/
//Variables
var scores = 0;
var sec = 30;
var time = setInterval(myTimer, 1000);
var lbl = document.createElement("LABEL");
lbl.innerHTML = "Enter Initial: ";
var inp = document.createElement("INPUT");
    inp.setAttribute("type", "text");
    inp.setAttribute("id", "Initial");
var btn = document.createElement("BUTTON");
    btn.innerHTML = "Submit";
    btn.setAttribute("id", "Submit")    

//Setter method.
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

//Set QuestionIndex
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

//Evaluate answer and decrement the clock on incorrect answer
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    else
    {
        this.score;
        sec--;
    }    
    this.questionIndex++;
}

//Check for End of questions
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
// 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
//Set the value of choice
Question.prototype.isCorrectAnswer = function(choice) 
{
    return this.answer === choice;
}
 
//Populate values 
function populate() {
    if(quiz.isEnded()) 
    {
        showScores();
    }
    else 
    {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        var choices = quiz.getQuestionIndex().choices;
        //Populate choices using for loop
        for(var i = 0; i < choices.length; i++) 
        {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
           
        }
        myTimer();
        showProgress();
    }
}
//Populate choice and button click for selecting the choice
function guess(id, guess) 
{
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

//Show Progress
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//Show scores and dynamically append child elements to DOM
function showScores() {
    var gameOverHTML = "<h1>All Done</h1>";

    gameOverHTML += "<h2 id='score'> Your final scores: " + (quiz.score/questions.length)*100 + "/100" + "</h2>";
    var element = document.getElementById("quiz");
    
    element.innerHTML = gameOverHTML;
    
    element.appendChild(lbl);
   
    element.appendChild(inp);
    
    element.appendChild(btn);
    
    var bt = document.getElementById("Submit");
    //Check for button value and add event listener for the button
    if (bt)
    {
        bt.addEventListener("click", buttonclick);
    }
   
};
 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["A. JavaScript", "B. XHTML","C. CSS", "D. HTML"], "D. HTML"),
    new Question("Which language is used for styling web pages?", ["A. HTML", "B. JQuery", "C. CSS", "D. XML"], "C. CSS"),
    new Question("Which is not a JavaScript Framework?", ["A. Python Script", "B. JQuery","C. Django", "D. NodeJS"], "C. Django"),
    new Question("Which is used for Connect To Database?", ["A. PHP", "B. HTML", "C. JS", "D. All"], "A. PHP"),
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();

//Timer for the quiz
function myTimer()
{
    if (quiz.questionIndex < quiz.questions.length)
    {
        if ((time <= sec) && (time >0))
        {
            document.getElementById('timer').innerHTML = sec + "sec left";
            sec--;
        }
        else
        {
            clearInterval(time);
            showScores();
        }
    }
}
//button click for storing the score and initial in local storge.
function buttonclick(){
    var inpValue = document.getElementById("Initial").value;
    localStorage.setItem("Score", (quiz.score/questions.length)*100);
    localStorage.setItem("Initial", inpValue);
    console.log("Initials " + localStorage.getItem("Initial") + " " + "Score " + localStorage.getItem("Score"));
    }