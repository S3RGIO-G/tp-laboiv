import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blackjack',
  standalone: true,
})
export class BlackjackPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
    }
    return value.toString();
  }
}
