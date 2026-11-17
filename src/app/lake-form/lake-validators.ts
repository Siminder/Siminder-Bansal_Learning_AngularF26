import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Single-field validator: rejects a value made of only spaces, like "   ".
// Validators.required lets that through because the string isn't empty.
export const noWhitespaceValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;
  if (typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
    return { whitespace: true };
  }
  return null;
};

// Cross-field validator, attached to the whole FormGroup so it can see both fields.
// Waves are driven by wind, so wave height (m) can't be more than wind speed (km/h) / 10.
// Example: 20 km/h of wind allows waves up to 2 m.
export const waveHeightVsWindValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const waveHeight = group.get('waveHeight')?.value;
  const windSpeed = group.get('windSpeed')?.value;

  // Wave height is optional, and missing wind speed is already reported by required
  if (waveHeight == null || windSpeed == null) {
    return null;
  }

  const maxWaveHeight = windSpeed / 10;
  if (waveHeight > maxWaveHeight) {
    return { waveTooHighForWind: { maxWaveHeight, actual: waveHeight } };
  }
  return null;
};
