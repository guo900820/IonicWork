import { Injectable } from '@angular/core';
import { NavController, Loading, ToastController, LoadingController, AlertController, Alert, Toast } from 'ionic-angular'
import { NgForm } from '@angular/forms';
@Injectable()
export class PublicJs {
    toast: Toast
    private storage: Storage
    constructor(

        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
    }
    getHost() {
        var host = "http://gc.ditu.aliyun.com/";
        return host
    }
    presentToast(msg: string, timeout?: number, errorcode?: string) {
        if (this.toast != null) {
            this.toast.dismiss()
            this.toast = null
        }
        var more = timeout == null ? 5000 : timeout == 0 ? null : timeout
        this.toast = this.toastCtrl.create({
            message: msg,
            duration: more,
            position: 'bottom',
            showCloseButton: timeout == 0 ? true : false,
            closeButtonText: '知道了'
        });
        this.toast.present();
    }
    replace(key, value) {
        if (value === undefined) {
            return "undefined";
        }
        else if (value === null) {
            return "null";
        }
        return value;
    }
    buildAutograph(data: any = null, backtype: string = "url"): string {
        if (backtype == "json") {
            return JSON.stringify(data, this.replace);
        }
        else {
            var result = "";
            for (let key in data) {
                result += key + '=' + data[key] + '&';
            }
            result = result.slice(0, result.length - 1);
            return result;
        }
    }
}