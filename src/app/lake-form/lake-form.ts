import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LakeService } from '../services/lake';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-lake-form',
  styleUrl: './lake-form.css',
  templateUrl: './lake-form.html',
})
export class LakeForm {
  // nonNullable so reset() goes back to the starting values below instead of null
  private fb = inject(FormBuilder).nonNullable;
  private lakeService = inject(LakeService);

  savedMessage = signal('');

  lakeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    waterTemperature: [15, [Validators.required, Validators.min(0), Validators.max(40)]],
    windSpeed: [10, [Validators.required, Validators.min(0)]],
    waveHeight: [0 as number | null, [Validators.min(0)]],
    waterQuality: [100, [Validators.required, Validators.min(0)]],
  });

  // Shortcut so the template can write c.name instead of lakeForm.controls.name
  get c() {
    return this.lakeForm.controls;
  }

  onSubmit(): void {
    if (this.lakeForm.invalid) {
      this.lakeForm.markAllAsTouched();
      return;
    }

    const value = this.lakeForm.getRawValue();
    const name = value.name.trim();

    this.lakeService.addLake({ ...value, name, id: this.lakeService.nextId() });
    this.savedMessage.set(`${name} was added.`);
    this.lakeForm.reset();
  }
}
