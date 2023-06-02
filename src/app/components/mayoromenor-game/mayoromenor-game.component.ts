import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';

@Component({
  selector: 'app-mayoromenor-game',
  standalone: true,
  imports: [CommonModule, ModalCustomComponent],
  templateUrl: './mayoromenor-game.component.html',
  styleUrls: ['./mayoromenor-game.component.css'],
})
export class MayoromenorGameComponent implements OnInit {
  @Output() playGame = new EventEmitter<boolean>();
  currentNumber!: number;
  nextNumber!: number;
  points = 0;
  showModal = false;
  disableBtns = false;
  @ViewChild('card') card!: ElementRef;

  ngOnInit(): void {
    this.currentNumber = this.getRandomNumber(1, 12);
  }

  play(prediction: number) {
    this.disableBtns = true;
    this.nextNumber = this.getRandomNumber(1, 12);
    const response = this.compareNumbers(this.currentNumber, this.nextNumber);
    this.card.nativeElement.classList.add('flip-reverse');

    setTimeout(() => {
      this.currentNumber = this.nextNumber;
      this.card.nativeElement.classList.remove('flip-reverse');
    }, 750);

    setTimeout(() => {
      if (response && prediction === response) {
        this.points++;
      } else if (response && prediction !== response) {
        this.showModal = true;
      }
      this.disableBtns = false;
    }, 1200);
  }

  resetGame(){
    this.showModal = false;
    this.points = 0;
  }

  compareNumbers(currentNuber: number, nextNumber: number) {
    return nextNumber > currentNuber ? 1 : nextNumber < currentNuber ? -1 : 0;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
