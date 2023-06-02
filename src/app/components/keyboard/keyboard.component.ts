import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { letters } from 'src/app/data/letters';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class KeyboardComponent implements OnInit {
  letters = letters;
  @Output() selectedKeyEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  pressKey(letter: any) {
    letter.active = true;
    this.selectedKeyEvent.emit(letter.letter);
  }

  resetKeyboard(){
    this.letters.forEach(item => {
      item.active = false;
    })
  }
}
