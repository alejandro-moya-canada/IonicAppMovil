import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQRPage {

  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private plt: Platform) { 
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator['standalone'];

    if(this.plt.is('ios') && isInStandaloneMode()) {
      
    }
  }


  // acceder al elemento nativo de video
  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  captureImage() {
    this.fileinput.nativeElement.click();
  }

  // funcion que se ejecuta cuando se agrega una imagen
  handleFile(files: FileList) {
    const file = files.item(0);

    var img = new Image();
    img.onload = () => {
      // dibujo el mismo canvas que si se escanease por cámara
      this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      // cargamos los datos con la imagen
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if(code) {
        this.scanResult = code.data;
        this.showQrToast();
      }

    };
    // una vez cargada, se crea la imagen
    img.src = URL.createObjectURL(file);

  }

  async startScan() {
    // accedo a la camara frontal del dispositivo
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'enviroment' }
    });

    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    // activa la operacion de reproduccion
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    requestAnimationFrame(this.scan.bind(this));

  }

  async scan() {
    console.log("SCAN");
    // compruebo si el elemento de video esta listo porque hay que inicializarlo
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      console.log("ENTRO");
      if (this.loading) {
        console.log("ENTRO 2");
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.wifth = this.videoElement.videoWidth;

      // dibujo el canvas
      // PASO OBLIGATORIO SIEMPRE !!
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      // obtengo los datos de la imagen
      // PASO OBLIGATORIO SIEMPRE !!
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log("CODE  ", code);

      if(code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();

      } else {
        if(this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }

    } else {
      requestAnimationFrame(this.scan.bind(this));
    }

  }

  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  // funcion que muestra un toast
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Abrir ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Abrir',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }

}
