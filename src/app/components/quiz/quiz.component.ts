import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = ""
  questions:any
  selectedQuestion:any

  answers:string[] = []
  selectedAnswer:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false


  constructor() { }

  ngOnInit(): void {
    if (quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.selectedQuestion = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex]
    }else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.selectedAnswer = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
      // Usando 'as keyof typeof' estamos garantindo que 'finalAnswer' é do mesmo tipo que
      // 'quiz_question.results'.
    }
  }

  async checkResult(answers:string[]){
    // Aqui ele irá percorrer o array de respostas do jogador, que contém os 'alias' A ou B,
    //e irá contabilizar cada um e verificar qual aparece mais.
    const result = answers.reduce((previous, current, index, array) => { // Aqui ele irá buscar
                                                            //o item que mais aparece no array.
      if (
        array.filter(item => item === previous).length > // Verifica se o item atual é igual
                                                    //ao item anterior e verifica o tamanho do
                                                    //array do item atual. E verifica se é maior que
                                                    //o próximo array.
        array.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    });
    return result;
  }

  restart(){
    this.answers = []
    this.selectedAnswer = ""

    this.questionIndex = 0
    this.questionMaxIndex = 0

    this.finished = false
    this.ngOnInit()
  }

}
