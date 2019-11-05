import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;
const { Toast } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  deger: string = "Merhaba Elmadağ !";

  constructor() {}

  async show(msg) {
    await Toast.show({
      text: msg
    });
  }

  async yaz() {
    Clipboard.write({
      string: this.deger,
    });
  }

  async oku() {

    let str = await Clipboard.read({
      type: "string"
    });
    console.log('Panodaki Değer : ', str.value);
    this.show('Panodaki Değer : ' + str.value);

  }

}
