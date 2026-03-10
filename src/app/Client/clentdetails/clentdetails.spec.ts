import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clentdetails } from './clentdetails';

describe('Clentdetails', () => {
  let component: Clentdetails;
  let fixture: ComponentFixture<Clentdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clentdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clentdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
