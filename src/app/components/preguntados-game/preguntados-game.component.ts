import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaService } from 'src/app/services/trivia.service';
import { ModalCustomComponent } from '../modal-custom/modal-custom.component';

@Component({
  selector: 'app-preguntados-game',
  standalone: true,
  imports: [CommonModule, ModalCustomComponent],
  templateUrl: './preguntados-game.component.html',
  styleUrls: ['./preguntados-game.component.css'],
})
export class PreguntadosGameComponent implements OnInit {
  @Output() playGame = new EventEmitter<boolean>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  score = 0;
  showModal = false;
  lifes = 3;
  options!: Array<{ text: string; isValid: boolean }>;
  question!: string;
  answer!: string;
  modal!: any;

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadQuestion();
    }, 10);
  }

  selectAnswer(event: any, response: boolean) {
    if (!response) {
      this.lifes--;
      event.classList.add('incorrect');
      this.showModal = true;
    } else {
      this.score++;
      event.classList.add('correct');
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.loadingEvent.emit(true);
    this.triviaService.getRandomQuestion(1).then((res) => {
      const data = res[0];
      const options = [];

      data.incorrectAnswers.forEach((item: any) => {
        options.push({ text: item, isValid: false });
      });
      options.push({ text: data.correctAnswer, isValid: true });
      options.sort((a, b) => {
        return 0.5 - Math.random();
      });

      this.options = options;
      this.answer = data.correctAnswer;
      this.question = data.question.text;
      this.loadingEvent.emit(false);
    });
  }

  resetGame() {
    this.showModal = false;
    this.lifes = 3;
    this.score = 0;
    this.loadQuestion();
  }

  funcModal() {
    this.lifes ? this.loadQuestion() : this.resetGame();
    this.showModal = false;
  }
}
