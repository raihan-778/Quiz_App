
class Question{
    constructor(ques, choices, answer){
    this.ques = ques;
    this.choices = choices;
    this.answer = answer;
    }
    isCorrect(choices){
        return this.answer == choices
}
}


export default Question; 


