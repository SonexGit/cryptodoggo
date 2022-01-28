import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptolineComponent } from './cryptoline.component';

describe('CryptolineComponent', () => {
  let component: CryptolineComponent;
  let fixture: ComponentFixture<CryptolineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptolineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptolineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
