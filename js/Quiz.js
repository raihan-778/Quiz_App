

class Quiz {
    constructor(questions){
    this.questions = questions;
    this.score = 0;
    this.currIndex = 0;
    }

    getCurrQues(){
        return this.questions[this.currIndex];
    } 
    nextIndex(){
      this.currIndex ++;
    }

    increaseScore(userGuess){
        const currQues = this.getCurrQues();
        if(currQues.isCorrect(userGuess)){
            this.score ++;
        }
            this.nextIndex();
    }

    QuizEnded(){
      return this.questions.length == this.currIndex;
    }
    
    restart(){
        this.currIndex = 0;
        this.score = 0;
    }
}

export default Quiz;