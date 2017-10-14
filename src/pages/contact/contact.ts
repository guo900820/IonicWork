import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { AppService } from '../../app/app.service';
import { PublicJs } from '../../app/app.publicJs';
import { outparam } from "../../app/model/outparam";
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [AppService]
})

export class ContactPage {
  //public navCtrl: NavController

 
  name: string
  out: outparam = new outparam()
  constructor(public publicJs: PublicJs,
    public loadingCtrl: LoadingController,
    public NavController:NavController,
    public navParams: NavParams,
    public appService: AppService,
    public viewCtrl: ViewController) {

  }
  test() {
    this.appService.toServiceGet("geocoding", { a: this.name }).then(
      (result) => {
        if(result!=null)
        this.out = result;
        alert(JSON.stringify(result))
      }
    )
    console.log("111111111")
  }
}
