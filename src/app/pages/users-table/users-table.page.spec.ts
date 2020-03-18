import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersTablePage } from './users-table.page';

describe('UsersTablePage', () => {
  let component: UsersTablePage;
  let fixture: ComponentFixture<UsersTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
