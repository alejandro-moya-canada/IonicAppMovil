import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientsTablePage } from './clients-table.page';

describe('ClientsTablePage', () => {
  let component: ClientsTablePage;
  let fixture: ComponentFixture<ClientsTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
