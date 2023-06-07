import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timeChat',
  standalone: true,
})
export class TimeChatPipe implements PipeTransform {
  transform(value: string): string {
    const dateTime = new Date(value).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - dateTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let mensaje = ''
    if (seconds < 60) mensaje = 'Justo Ahora';
    if (minutes !== 0 && minutes < 60) mensaje = `Hace ${minutes} minutos`;
    if(hours !== 0 && hours < 24) mensaje = `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
    if(days > 0){
      const date = new Date(dateTime);
      const dateDay = `${date.getDate()}/${date.getMonth()}`;
      mensaje = `${days === 1 ? 'Ayer' : dateDay} ${date.getHours()}:${date.getMinutes()}`;
    }

    return mensaje;
  }
}
