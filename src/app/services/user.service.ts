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
  collectionData,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

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

  getUsersObserver(): Observable<User[]> {
    return collectionData(this.usersRef, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  getUsersByEmailObserver(email: string) {
    const q = query(this.usersRef, where('email', '==', email));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  addUserById(user: User, id: string) {
    setDoc(doc(this.usersRef, id), user);
  }

  getUserById(id: string) {
    return getDoc(doc(this.usersRef, id));
  }

  // //** TESTING
  // setTest() {
  //   const usuarioTest = {
  //     email: 'sergio@gmail.com',
  //     password: '12345678',
  //     profile: 2,
  //     gender: 2,
  //     urlImg: '..',
  //   };

  //   //* Setear un documento con un id especifico, si no existe lo crea.
  //   //* Tiene que se un objeto normal.

  //   // setDoc(doc(this.usersRef, '8X0pYR650YaqYG.TESTING'), usuarioTest)
  //   //   .then((res) => console.log(res))
  //   //   .catch((err) => console.log(err));

  //   //* Obtener un documento por su id

  //   // getDoc(doc(this.usersRef, '8ko70UusxiZKkRcQUmYadPca1kj1'))
  //   //   .then((res) => console.log(res.data()))
  //   //   .catch((err) => console.log(err));

  //   //* Obtener el primer documento de un array usando una query

  //   const consulta = query(
  //     this.usersRef,
  //     where('email', '==', 'sergio@gmail.com')
  //   );
  //   getDocs(consulta)
  //     .then((res) => console.log(res.docs[0].data()))
  //     .catch((err) => console.log(err));
  // }
}
