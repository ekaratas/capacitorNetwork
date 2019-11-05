import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
const { Network } = Plugins;
const { Toast } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private loader: any;
  private loaderActive: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let handler = Network.addListener('networkStatusChange', (status) => {
        console.log(status);
        if (!status.connected) {
          this.showLoader('İnternet Bağlantınız Yok !');
        } 

        if (status.connected) {
          this.dismissLoader();
        }
        if (status.connectionType === 'wifi') {
          this.show('Güvenliğiniz için Hücresel Ağa geçiniz !');
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async show(msg) {
    await Toast.show({
      text: msg
    });
  }

  async showLoader(msg) {
    this.loaderActive = true;
    this.loader = await this.loadingController.create({
      message: msg,
      spinner: null,
      translucent: true
    });
    await this.loader.present();
    }

async dismissLoader() {
      if (this.loaderActive === true) {
        await this.loader.dismiss();
      }
      this.loaderActive = false;
      }

}
