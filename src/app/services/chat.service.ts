import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesRef = collection(this.firestore, 'messages');
  constructor(private firestore: Firestore) {}

  getMessages(): Observable<Message[]> {
    return collectionData(this.messagesRef, { idField: 'id' }) as Observable<
      Message[]
    >;
  }
  addMessage(message: Message) {
    return addDoc(this.messagesRef, message);
  }
}
