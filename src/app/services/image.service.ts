import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getBytes, getDownloadURL} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: Storage) { }

  addImage(image : File){
    const imgRef = ref(this.storage, `images/${image.name}`);
    return uploadBytes(imgRef, image);
  }

  getImages(){
    //Mejor me creo un array aca y directamente paso un array de URL's
    const imgRef = ref(this.storage, `images`);
    return listAll(imgRef);
  }

  getImage(name: string){
    const imgRef = ref(this.storage, `images/${name}`);
    return imgRef;
  }

  // test(){
  //   return getDownloadURL(ref(this.storage, 'images/backgroundIcon.png'));
  // }


}
