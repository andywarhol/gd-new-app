import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExitsComponent } from './add-exits.component';

describe('AddExitsComponent', () => {
  let component: AddExitsComponent;
  let fixture: ComponentFixture<AddExitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
