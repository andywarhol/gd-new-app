import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitDetailsComponent } from './exit-details.component';

describe('ExitDetailsComponent', () => {
  let component: ExitDetailsComponent;
  let fixture: ComponentFixture<ExitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
