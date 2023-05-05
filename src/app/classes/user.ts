import { UserGender } from "../enums/user-gender";

export class User {

  id : string;
  email: string;
  password: string;
  gender: UserGender | null;
  urlImg: string;

  constructor(email = '', password = '', gender : UserGender | null = null, urlImg = '', id = '') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.urlImg = urlImg;
  }

}
