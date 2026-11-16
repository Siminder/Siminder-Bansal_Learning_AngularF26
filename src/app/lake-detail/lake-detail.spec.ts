import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LakeDetail } from './lake-detail';

describe('LakeDetail', () => {
  let component: LakeDetail;
  let fixture: ComponentFixture<LakeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LakeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(LakeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
