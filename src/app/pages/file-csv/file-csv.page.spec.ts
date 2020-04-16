import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileCSVPage } from './file-csv.page';

describe('FileCSVPage', () => {
  let component: FileCSVPage;
  let fixture: ComponentFixture<FileCSVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCSVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileCSVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
