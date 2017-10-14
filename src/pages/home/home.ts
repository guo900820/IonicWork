import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { WechatPayParam, WechatPlugin } from "../../app/WechatPlugin";
import { PublicJs } from "../../app/app.publicJs";
import { AppService } from "../../app/app.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppService]
})
export class HomePage {
  payResult: WechatPayParam
  constructor(public navCtrl: NavController,
    public publicJs: PublicJs,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appService: AppService
  ) {

  }


  test() {
    this.topay()
  }
  topay() {
    console.log(this.payResult)



    var params = {
      partnerid: "", // merchant id
      prepayid: "", // prepay id
      noncestr: "", // nonce
      timestamp: "", // timestamp
      sign: ""// signed string
    };



    WechatPlugin.isInstalled().then((installed) => {
      //console.log(installed);

      if (installed) {
        WechatPlugin.sendPaymentRequest(params).then((res) => {
          //调用后台微信前台回调接口
          //处理后显示操作
        })
      } else {
        // 没有安装微信客户端
        this.publicJs.presentToast("您没有安装微信客户端")
      }
    }, (error) => {
      if (error == "ReferenceError: Wechat is not defined")
        this.publicJs.presentToast("您没有安装微信客户端")
      else
        this.publicJs.presentToast(error)
    });

  }
}
