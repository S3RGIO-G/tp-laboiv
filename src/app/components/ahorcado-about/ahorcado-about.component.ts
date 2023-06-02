import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ahorcado-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado-about.component.html',
  styleUrls: ['./ahorcado-about.component.css'],
})
export class AhorcadoAboutComponent implements OnInit {
  @Output() playGame = new EventEmitter<boolean>();
  
  ngOnInit(): void {}
}
