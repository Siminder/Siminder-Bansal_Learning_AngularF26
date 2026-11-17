import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EditLock } from '../services/edit-lock';

// Runs before lakes/edit/:id loads. While editing is locked, send the user
// back to the list; when unlocked, let the edit form open.
export const editGuard: CanActivateFn = () => {
  const editLock = inject(EditLock);
  const router = inject(Router);

  if (editLock.guardEnabled()) {
    return router.parseUrl('/lakes');
  }
  return true;
};
