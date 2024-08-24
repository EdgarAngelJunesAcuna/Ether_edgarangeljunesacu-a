import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruffleComponent } from './truffle.component';

describe('TruffleComponent', () => {
  let component: TruffleComponent;
  let fixture: ComponentFixture<TruffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruffleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
