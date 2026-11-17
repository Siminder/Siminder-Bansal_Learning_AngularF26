import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LakeForm } from './lake-form';

describe('LakeForm', () => {
  let component: LakeForm;
  let fixture: ComponentFixture<LakeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LakeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LakeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
