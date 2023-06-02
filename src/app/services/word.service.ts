import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  URL_API = 'https://random-word-api.herokuapp.com';

  constructor() {}

  getRandomWord() {
    const data = fetch(`${this.URL_API}/word?lang=es&length=7`).then((res) =>
      res.json()
    );
    return data;
  }

  normalizeWord(word: string) {
    const arrayLetters: Array<{ letter: string; active: boolean }> = [];

    const split = word
      .normalize('NFD')
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        '$1'
      )
      .normalize()
      .toLocaleLowerCase()
      .split('');

    split.forEach((letter) => {
      let regex = new RegExp(
        "([^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF])"
      );

      // console.log(regex.test(letter));
      if (regex.test(letter)) {
        arrayLetters.push({ letter: letter, active: false });
      }
    });

    return arrayLetters;
  }
}
