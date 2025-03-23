import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAvatarComponent } from './vendor-avatar.component';

describe('VendorAvatarComponent', () => {
  let component: VendorAvatarComponent;
  let fixture: ComponentFixture<VendorAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
