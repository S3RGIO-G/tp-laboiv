import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados-about.component.html',
  styleUrls: ['./preguntados-about.component.css']
})
export class PreguntadosAboutComponent implements OnInit {
  @Output() playGame = new EventEmitter<boolean>();
  
  ngOnInit(): void {}
}
