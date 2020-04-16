import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-file-csv',
  templateUrl: './file-csv.page.html',
  styleUrls: ['./file-csv.page.scss'],
})
export class FileCSVPage implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(private http: HttpClient, private papa: Papa, private plt: Platform, private file: File, 
    private socialSharing: SocialSharing) { 
    this.loadCSV();
  }

  ngOnInit() {
  }

  private loadCSV() {
    // cargo el fichero csv desde la ruta interna
    this.http.get('../../assets/data/test.csv', 
    {
      responseType: 'text'
    }).subscribe(
      data => this.extractData(data),
      err => console.log("ERROR  :", err)
    );
  }

  extractData(res) {
    let csvData = res || '';

    this.papa.parse(csvData, {
      complete: parsedData => {
        // devuelve una matriz que coge el primero
        this.headerRow = parsedData.data.splice(0,1)[0];
        this.csvData = parsedData.data;
      }
    })
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  exportCSV() {
    let csv = this.papa.unparse({
      fileds: this.headerRow,
      data: this.csvData
    });
    console.log("CSV:  ", csv);

    // compruebo que estoy en un dispositivo movil
    if(this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, { replace: true }).then(res => {
        this.socialSharing.share(null, null, res.nativeURL, null);
      })
    } else {
      // creo un elemento de bloque y le agrego un clic al enlace
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href=window.URL.createObjectURL(blob);
      a.download = "newdata.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

}
