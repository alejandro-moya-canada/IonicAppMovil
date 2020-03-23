import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScannerQRPage } from './scanner-qr.page';

describe('ScannerQRPage', () => {
  let component: ScannerQRPage;
  let fixture: ComponentFixture<ScannerQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerQRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
