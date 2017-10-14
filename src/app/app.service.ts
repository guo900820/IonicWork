import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import { NavController, NavParams } from 'ionic-angular';
import { PublicJs } from './app.publicJs';

//


@Injectable()
export class AppService {

    private headers = new Headers();
    constructor(private http: Http,
        private publicJsServer: PublicJs,
        public navCtrl: NavController,
        navParams: NavParams) {
    }


 


    //Get方式发送(不需要有token验证的请求)
    toServiceGet(action: string, param: any, sendtype: string = "form"): Promise<any> {
        return this.get(action, param, null, sendtype);
    }

    //Post方式发送(不需要有token验证的请求)
    toServicePost(action: string, param: any, sendtype: string = "form"): Promise<any> {
        return this.post(action, param, null, sendtype);
    }
    //Get方式发送
    get(action: string, param: any, token: string,  contentType = "json", istimeout = true): Promise<any> {
        var host = this.publicJsServer.getHost()

        //发送数据类型
        switch (contentType) {
            case "json":
                this.headers.set('Content-Type', 'application/json');
                break;
            case "form":
                this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
                break;
        }
        //如果Token不等于空则需要带Authorization发送
        if (token != null)
            this.headers.set("Authorization", "Bearer " + token);

        var p = this.convertParam(param);

        p = "?" + p;


        return this.http
            .get(host + action + p, { headers: this.headers })
            .timeout(120000)
            .toPromise()
            .then(res => {

                //console.log("end==>>" + new Date())
                return res.json()
            })
            .catch(error => this.handleError(error));
    }
    //Post方式发送
    post(action: string, param: any, token: string, contentType = "json"): Promise<any> {
        var p;
        var host = this.publicJsServer.getHost()


        //发送数据类型
        switch (contentType) {
            case "json":
                this.headers.set('Content-Type', 'application/json');
                p = this.convertParam(param, contentType);
                break;
            case "form":
                this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
                p = this.convertParam(param, "url");
                break;
        }
        //如果Token不等于空则需要带Authorization发送
        if (token != null)
            this.headers.set("Authorization", "Bearer " + token);

        return this.http
            .post(host + action, p, { headers: this.headers })
            .timeout(120000)
            .toPromise()
            .then(res => {
                return res.json()
            })
            .catch(error => this.handleError(error));
    }
    //错误处理
    private handleError(error: any) {
        this.publicJsServer.presentToast("错误信息" + error)
    }

  
    //转换发送数据格式
    convertParam(param: any, type = "url"): string {
        var p: string = ""
        if (type == "url") {
            p = this.jsonToQueryString(param)
        } else {
            p = this.publicJsServer.buildAutograph(param, "json")
        }
        return p;
    }
    jsonToQueryString(data: any) {
        var result = this.publicJsServer.buildAutograph(data);
        return result
    }
}
