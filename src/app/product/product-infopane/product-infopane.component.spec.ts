import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfopaneComponent } from './product-infopane.component';

describe('ProductInfopaneComponent', () => {
  let component: ProductInfopaneComponent;
  let fixture: ComponentFixture<ProductInfopaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfopaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfopaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
