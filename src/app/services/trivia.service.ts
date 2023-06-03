import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  URL_API = 'https://the-trivia-api.com/v2/';

  constructor() {}

  getRandomQuestion(
    limit = 1,
    difficulty = 'easy,medium',
    categories = 'food_and_drink,general_knowledge'
  ) {
    const data = fetch(`${this.URL_API}questions?limit=${limit}&difficulty=${difficulty}&categories=${categories}`)
    .then((res) => {
      return res.json()
    });

    return data;
  }

}
