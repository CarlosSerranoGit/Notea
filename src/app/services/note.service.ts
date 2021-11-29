import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private myCollection:AngularFirestoreCollection;
  constructor(private db:AngularFirestore) {
      this.myCollection=db.collection<any>(environment.firebaseConfig.todoCollection);
   }

   public addNote(note:Note):Promise<string>{
     return new Promise(async (resolve,reject)=>{
        try{
          let response:DocumentReference<firebase.default.firestore.DocumentData> = 
                        await this.myCollection.add({
                          title:note.title,
                          description:note.description
                        });
          resolve(response.id);
        }catch(err){
          reject(err);
        }
      })
   }

   public getNotes():Observable<Note[]>{
    return new Observable((observer)=>{
      let result:Note[]=[];
     this.myCollection.get().subscribe(
       (data:firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>)=>{
       data.docs.forEach((d:firebase.default.firestore.DocumentData)=>{
         let tmp=d.data(); //devuelve el objeto almacenado -> la nota con title y description
         let id=d.id; //devuelve la key del objeto
         result.push({'key':id,...tmp}); 
        //operador spread-> 'title':tmp.title,'description':tmp.description
       })
       observer.next(result);  ///este es el return del observable que devolvemos
       observer.complete();
     }) //final del subscribe
    }); //final del return observable
   } //final del método getNotes

   public getNote(id:string):Promise<Note>{
     return new Promise(async (resolve,reject)=>{
        let note:Note=null;
        try{
          let result:firebase.default.firestore.DocumentData=await this.myCollection.doc(id).get().toPromise();
          note={
            id:result.id,
            ...result.data()
          }
          resolve(note);
        }catch(err){
          reject(err);
        }
     })
     
   }

   public remove(id:string):Promise<void>{
     return this.myCollection.doc(id).delete();
   }

   //modificar addNote para que no meta key, borrar nota, leer por criterio
}
