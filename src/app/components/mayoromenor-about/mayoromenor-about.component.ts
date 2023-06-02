import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MayoromenorGameComponent } from '../mayoromenor-game/mayoromenor-game.component';

@Component({
  selector: 'app-mayoromenor-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayoromenor-about.component.html',
  styleUrls: ['./mayoromenor-about.component.css']
})
export class MayoromenorAboutComponent implements OnInit {
  @Output() playGame = new EventEmitter<boolean>();
  
  ngOnInit(): void {}
}
