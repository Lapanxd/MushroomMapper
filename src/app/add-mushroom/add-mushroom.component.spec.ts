import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMushroomComponent } from './add-mushroom.component';

describe('AddMushroomComponent', () => {
  let component: AddMushroomComponent;
  let fixture: ComponentFixture<AddMushroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMushroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMushroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
