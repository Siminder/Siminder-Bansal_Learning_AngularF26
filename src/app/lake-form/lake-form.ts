import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LakeService } from '../services/lake';

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
    name: ['', [Validators.required, Validators.minLength(3)]],
    waterTemperature: [15, [Validators.required, Validators.min(0), Validators.max(40)]],
    windSpeed: [10, [Validators.required, Validators.min(0)]],
    waveHeight: [0 as number | null, [Validators.min(0)]],
    waterQuality: [100, [Validators.required, Validators.min(0)]],
  });

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

  private loadLake(id: string | undefined): void {
    this.savedMessage.set('');

    if (!id) {
      this.lakeNotFound.set(false);
      this.lakeForm.reset();
      return;
    }

    const lake = this.lakeService.getLakeById(Number(id));
    this.lakeNotFound.set(!lake);
    if (lake) {
      this.lakeForm.patchValue(lake);
    }
  }

  onSubmit(): void {
    if (this.lakeForm.invalid) {
      this.lakeForm.markAllAsTouched();
      return;
    }

    const value = this.lakeForm.getRawValue();
    const name = value.name.trim();
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
    this.lakeForm.reset();
  }
}
