import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  URL_API = 'https://random-word-api.vercel.app';

  constructor() {}

  getRandomWord() {
    const data = fetch(`${this.URL_API}/api?words=1&alphabetize=true`).then(
      (res) => res.json()
    );
    return data;
  }

  transformWordToArray(word: string) {
    const arrayLetters: Array<{ letter: string; active: boolean }> = [];

    word.split('').forEach((letter) => {
      arrayLetters.push({ letter: letter, active: false });
    });

    return arrayLetters;
  }
}
