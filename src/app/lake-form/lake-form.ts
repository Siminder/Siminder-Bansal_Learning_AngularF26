import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LakeService } from '../services/lake';
import { noWhitespaceValidator, waveHeightVsWindValidator } from './lake-validators';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-lake-form',
  styleUrl: './lake-form.css',
  templateUrl: './lake-form.html',
})
export class LakeForm {
  // nonNullable so reset() goes back to the starting values below instead of null
  private fb = inject(FormBuilder).nonNullable;
  private lakeService = inject(LakeService);
  private router = inject(Router);

  // Filled from the :id in lakes/edit/:id by withComponentInputBinding().
  // On lakes/add there is no :id, so this stays undefined (add mode).
  id = input<string>();

  isEditMode = computed(() => !!this.id());
  lakeNotFound = signal(false);
  savedMessage = signal('');

  lakeForm = this.fb.group({
    name: ['', [Validators.required, noWhitespaceValidator, Validators.minLength(3)]],
    waterTemperature: [15, [Validators.required, Validators.min(0), Validators.max(40)]],
    windSpeed: [10, [Validators.required, Validators.min(0)]],
    waveHeight: [0 as number | null, [Validators.min(0)]],
    waterQuality: [100, [Validators.required, Validators.min(0)]],
    // Repeating field: one text control per activity, added/removed with buttons
    activities: this.fb.array<string>([]),
  },
  // Group-level validator: it compares two fields, so it belongs to the whole form
  { validators: waveHeightVsWindValidator });

  constructor() {
    // Runs when the id input arrives (or changes), and pre-fills the form in edit mode.
    effect(() => {
      const id = this.id();
      // untracked: only re-run when the id changes, not every time the lake list changes,
      // otherwise saving would re-patch the form underneath the user.
      untracked(() => this.loadLake(id));
    });
  }

  // Shortcut so the template can write c.name instead of lakeForm.controls.name
  get c() {
    return this.lakeForm.controls;
  }

  get activities() {
    return this.lakeForm.controls.activities;
  }

  addActivity(value = ''): void {
    this.activities.push(this.fb.control(value, [Validators.required, noWhitespaceValidator]));
  }

  removeActivity(index: number): void {
    this.activities.removeAt(index);
  }

  // reset() keeps FormArray rows, so clear them too to get a truly empty form
  private resetForm(): void {
    this.lakeForm.reset();
    this.activities.clear();
  }

  private loadLake(id: string | undefined): void {
    this.savedMessage.set('');

    if (!id) {
      this.lakeNotFound.set(false);
      this.resetForm();
      return;
    }

    const lake = this.lakeService.getLakeById(Number(id));
    this.lakeNotFound.set(!lake);
    if (lake) {
      // patchValue can't add FormArray rows, so build one row per activity first
      this.activities.clear();
      lake.activities?.forEach((activity) => this.addActivity(activity));
      this.lakeForm.patchValue(lake);
    }
  }

  onSubmit(): void {
    if (this.lakeForm.invalid) {
      this.lakeForm.markAllAsTouched();
      return;
    }

    const raw = this.lakeForm.getRawValue();
    const name = raw.name.trim();
    const value = { ...raw, activities: raw.activities.map((activity) => activity.trim()) };
    const id = this.id();

    if (id) {
      // Edit mode: replace the existing lake (same id), then go back to its detail page
      this.lakeService.updateLake({ ...value, name, id: Number(id) });
      this.router.navigate(['/lakes', id]);
      return;
    }

    // Add mode: new lake with the next free id, then clear the form for the next one
    this.lakeService.addLake({ ...value, name, id: this.lakeService.nextId() });
    this.savedMessage.set(`${name} was added.`);
    this.resetForm();
  }
}
