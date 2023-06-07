import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersRef = collection(this.firestore, 'users');
  logsRef = collection(this.firestore, 'logs');

  constructor(private auth: Auth, private firestore: Firestore) {}

  getCurrentUser() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  //** AUTH **
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  //** FIRESTORE **
  addUserAuto(user: User) {
    return addDoc(this.usersRef, user);
  }

  addLogAuto(log: any){
    return addDoc(this.logsRef, log);
  }
}
