import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthersJsComponent } from './ethers.js.component';

describe('EthersJsComponent', () => {
  let component: EthersJsComponent;
  let fixture: ComponentFixture<EthersJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EthersJsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EthersJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
