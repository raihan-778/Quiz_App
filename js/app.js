
import Question from './Question.js';
import Quiz from './Quiz.js';
import Timer from './Timer.js';
const App = (()=>{

  
 //Question arrey from Question class
const ques1 = new Question('Which is not a programming language',['reactJs', 'C++', 'Laravel','Excel'], 3)
const ques2 = new Question('Which one is used of styling',['HTML', 'CSS', 'Ruby & rails','PHP'], 1)
const ques3 = new Question('Which one is not a css framework',['Bootstrap', 'Tailwind', 'vue','Matarial UI'], 2)
const ques4 = new Question('Which one is not used in react ',['Router', 'Typescript','RxJs','Redux'], 2)
const ques5 = new Question('Which one is first cryptocurrency',['Bitcoin', 'Etherium', 'Doge','Litecoin'], 2)
const quesArrey = [ques1, ques2, ques3, ques4,ques5];


//Quiz object using quiz class.
const myQuiz = new Quiz(quesArrey);
// console.log(myQuiz);

//Caching the dom element.

const quizQuestion = document.querySelector('.quiz__question');
const quizEl = document.querySelector('.quiz');
const quizTracker = document.querySelector('.quiz__tracker');
const tagline = document.querySelector('.quiz__tagline');
const choices = document.querySelector('.quiz__choices');
const innerProgress = document.querySelector('.progress__inner');
const btnNext = document.querySelector('.next');
const btnRestart = document.querySelector('.restart');

//default function for passing element & value.
const setElement = (elem, value) => {
  elem.innerHTML = value
  }
// function for timer start
new Timer (  
  document.querySelector('.timer')
);

// function for timer end


  /* All render functions Start */

const renderQuestion = () => {
  const question = myQuiz.getCurrQues().ques;
  // quizQuestion.innerHTML = question;
  setElement(quizQuestion, question)

}
const renderChoices = () => {
  let markup = '';
const quizChoices = myQuiz.getCurrQues().choices;

quizChoices.forEach((element, index) => {
  markup +=  ` <li class="quiz__choice">
                  <input
                      type="radio"
                      name="choice"
                      class="quiz__input"
                      data-order = "${index}"
                      id="choice${index}"
                  />
                  <label for="choice${index}" class="quiz__label">
                      <i></i>
                      ${element}
                  </label>
                </li>`
                // choices.innerHTML = markup;
                
})
  setElement(choices, markup);
}
renderQuestion();
renderChoices();

const renderEndScreen = () => {
  setElement(quizQuestion, "you'v done it!!" );
  setElement(tagline, `You have scored ${myQuiz.score} in this Quiz!! `);
  //need to refector. 
  
  choices.style.display = "none";
  btnNext.style.display = "none";
}

const renderBar = (width, maxParcent)=>{
// innerProgress.style.width = width + maxParcent + '%';
let loadingBar = setInterval(()=>{
  if(width > maxParcent){
    clearInterval(loadingBar);
  }else{
    width++;
    innerProgress.style.width = width + '%';
  }
})
}

const renderProgress = ()=>{
  const currentWidth = (myQuiz.currIndex / myQuiz.questions.length)*100;
  renderBar(0, currentWidth)
  
}


const render = () => {
  if(myQuiz.QuizEnded()){
    renderEndScreen();
    renderProgress();
  }else{
   
    renderQuestion();
    renderChoices();
    renderProgress();
    
  }
  
}
 
 /*All render functions End */
const eventListener = ()=>{
  btnNext.addEventListener('click', () => {
   const selectedOption = document.querySelector('input[name = "choice"]:checked');
  if(selectedOption){
    const answerKey = Number (selectedOption.getAttribute('data-order'));
    //note: When we access any value form dom. It's default data type is string. so we have to convert it into number instead. 
    myQuiz.increaseScore(answerKey);
  } 
  render();   
  
});

btnRestart.addEventListener('click', ()=>{
  //Revert the state back to default state
  myQuiz.restart();
  //render the hole app
  render();
  choices.style.display = "flex";
  btnNext.style.display = "flex";
  setElement(tagline, 'Pick an option below!');
})
}
return{
   renderApp: render,
  listener: eventListener
}
})(); //here we use the "()" to invoce the app function it self which called iffi.

App.renderApp();
App.listener();


//*** Iffi(Immadiatly Invoce Function) */




