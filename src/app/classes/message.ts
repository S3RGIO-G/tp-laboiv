export class Message{
  id ?: string;
  user : string;
  fullDate:string;
  date: string;
  hour:string;
  message !: string;

  constructor(message = '', user = '', date = '', fullDate = '', hour='', id='') {
    this.id=id;
    this.message=message;
    this.user=user;
    this.fullDate=fullDate;
    this.date=date;
    this.hour=hour;
  }
}