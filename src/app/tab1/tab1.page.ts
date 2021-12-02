import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite:IonInfiniteScroll;

  public notas:Note[]=[];
  private miLoading:HTMLIonLoadingElement;

  constructor(private ns:NoteService,
    private loading:LoadingController,
    private toast:ToastController) {}

  async ionViewDidEnter(){
    await this.cargaNotas();
  }

  public async borra(nota:Note){
    await this.presentLoading();
    await this.ns.remove(nota.key);
    let i=this.notas.indexOf(nota,0);
    if(i>-1){
      this.notas.splice(i,1);
    }
    await this.miLoading.dismiss();
    //await this.cargaNotas();
  }

  public async cargaNotas(event?){
    if(this.infinite){
      this.infinite.disabled=false;
    }
    if(!event){
      await this.presentLoading();
    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotesByPage('algo').toPromise();
    }catch(err){
      console.error(err);
      await this.presentToast("Error cargando datos","danger");
    } finally{
      if(event){
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
    }
  }

   public async cargaInfinita($event){
    console.log("CARGAND");
    let nuevasNotas=await this.ns.getNotesByPage().toPromise();
    if(nuevasNotas.length<10){
      $event.target.disabled=true;
    }
    this.notas=this.notas.concat(nuevasNotas);
    $event.target.complete();
  }
  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: ''
    });
    await this.miLoading.present();
  }

  async presentToast(msg:string,clr:string) {
    const miToast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:clr
    });
    miToast.present();
  }

  public async edita(nota:Note){

  }

}
