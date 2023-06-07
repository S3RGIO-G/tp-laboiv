import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { RouterModule } from '@angular/router';
import { User } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { BlackjackPipe } from 'src/app/pipes/blackjack.pipe';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';

@Component({
  selector: 'app-my-game',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ChatComponent,
    RouterModule,
    BlackjackPipe,
    ModalCustomComponent,
  ],
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css'],
})
export class MyGameComponent implements OnInit {
  usuario!: User | null;
  loading = false;
  cardsDealer!: Array<number>;
  cardsPlayer!: Array<number>;
  scoreDealer = 0;
  scorePlayer = 0;
  showModal = false;
  disableBtns = false;
  modalData: any = {};
  @ViewChild('card') card!: ElementRef;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.usuario = this.userService.getCurrentUser();
    this.loadCards();
  }

  giveCards() {
    this.cardsPlayer.push(this.getRandomNumber(1, 13));
    this.scorePlayer = this.calculateScore(this.cardsPlayer);
    if (this.scorePlayer === 21) {
      this.setModalData('GANASTE', 'Conseguiste un BlackJack');
      this.showModal = true;
    } else if (this.scorePlayer > 21) {
      this.setModalData(
        'PERDISTE',
        'Te pasaste de 21',
        'Reintentar',
        'btn-danger'
      );
      this.showModal = true;
    }
  }

  holdCards() {
    this.disableBtns = true;
    this.card.nativeElement.classList.add('flip');
    const intervalo = setInterval(() => {
      this.scoreDealer = this.calculateScore(this.cardsDealer);

      if (this.scoreDealer < 17) {
        this.cardsDealer.push(this.getRandomNumber(1, 13));
      } else if (this.scoreDealer > 21) {
        this.setModalData('GANASTE', 'El Dealer se pasó de 21');
        this.showResult(intervalo);
      } else if (this.scoreDealer < this.scorePlayer) {
        this.setModalData('GANASTE', 'Superaste los puntos del Dealer');
        this.showResult(intervalo);
      } else if (this.scoreDealer === this.scorePlayer) {
        this.setModalData(
          'EMPATE',
          'Tienen los mismos puntos',
          'Otra vez',
          'btn-primary'
        );
        this.showResult(intervalo);
      } else if (this.scoreDealer > this.scorePlayer) {
        this.setModalData(
          'PERDISTE',
          `El Dealer te superó con ${this.scoreDealer} puntos`,
          'Reintentar',
          'btn-danger'
        );
        this.showResult(intervalo);
      }
    }, 600);
  }

  showResult(interval: NodeJS.Timer) {
    setTimeout(() => {
      this.disableBtns = false;
      this.showModal = true;
      clearInterval(interval);
    }, 500);
  }

  loadCards() {
    this.cardsDealer = [];
    this.cardsPlayer = [];

    setTimeout(() => {
      for (let i = 0; i < 4; i++) {
        if (i < 2) {
          this.cardsDealer.push(this.getRandomNumber(1, 13));
        } else {
          this.cardsPlayer.push(this.getRandomNumber(1, 13));
        }
      }
      this.scoreDealer = this.calculateScore([this.cardsDealer[0]]);
      this.scorePlayer = this.calculateScore(this.cardsPlayer);
      this.disableBtns = true;
      setTimeout(() => {
        if (this.scorePlayer === 21) {
          this.showModal = true;
          this.setModalData('GANASTE', 'Conseguiste un BlackJack');
        }
        this.disableBtns = false;
      }, 1000);
    }, 50);
  }

  playAgain() {
    this.showModal = false;
    this.loadCards();
  }

  calculateScore(array: Array<number>) {
    let totalScore = 0;
    let counter = 0;
    array.forEach((item) => {
      if (item > 10) totalScore += 10;
      else if (item === 1) counter++;
      else totalScore += item;
    });

    for (let i = 0; i < counter; i++) {
      if (totalScore + 11 <= 21) totalScore += 11;
      else totalScore++;
    }
    return totalScore;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setModalData(
    title = 'GANASTE',
    description = '',
    btnText = 'De nuevo',
    btnClass = 'btn-success'
  ) {
    this.modalData = {
      title: title,
      description: description,
      btnText: btnText,
      btnClass: btnClass,
    };
  }
}
