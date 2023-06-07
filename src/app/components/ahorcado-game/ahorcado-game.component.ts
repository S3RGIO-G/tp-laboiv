import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from 'src/app/components/keyboard/keyboard.component';
import { WordService } from 'src/app/services/word.service';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';

@Component({
  selector: 'app-ahorcado-game',
  standalone: true,
  imports: [CommonModule, KeyboardComponent, ModalCustomComponent],
  templateUrl: './ahorcado-game.component.html',
  styleUrls: ['./ahorcado-game.component.css'],
})
export class AhorcadoGameComponent implements OnInit {
  errors: number = 0;
  wordToGuess!: string;
  letters: Array<{ letter: string; active: boolean }> = [];
  showModal = false;
  modalInfo!: any;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() playGame = new EventEmitter<boolean>();
  @ViewChild('keyboard') keyboard!: KeyboardComponent;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadWord();
    }, 10);
  }

  loadWord() {
    this.loadingEvent.emit(true);

    this.wordService.getRandomWord().then((res) => {
      this.wordToGuess = res[0];
      this.letters = this.wordService.transformWordToArray(this.wordToGuess);
      this.loadingEvent.emit(false);
    });
  }

  searchConcidences(letter: string) {
    let concidence = false;
    let counter = 0;
    this.letters.forEach((item) => {
      if (item.letter === letter) {
        item.active = true;
        concidence = true;
      }
      if (item.active) counter++;
    });

    if (!concidence) {
      this.errors += 1;
      if (this.errors === 7) {
        this.showModal = true;
        this.modalInfo = {
          titulo: '¡PERDISTE!',
          textButton: 'Reintentar',
          classButton: 'btn-danger',
        };
      }
    }

    if (counter === this.letters.length) {
      this.showModal = true;
      this.modalInfo = {
        titulo: '¡GANASTE!',
        textButton: 'Jugar otra vez',
        classButton: 'btn-success',
      };
    }
  }

  restart() {
    this.letters = [];
    this.errors = 0;
    this.loadWord();
    this.keyboard.resetKeyboard();
    this.showModal = false;
  }
}
