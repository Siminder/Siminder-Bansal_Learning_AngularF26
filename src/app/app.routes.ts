import { Routes } from '@angular/router';
import { ContentList } from './content-list/content-list'; // landing page stays eager
import { editGuard } from './guards/edit-guard';
import { lakeResolver } from './resolvers/lake-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'lakes', pathMatch: 'full' },
  { path: 'lakes', component: ContentList },
  {
    path: 'lakes/add',
    loadComponent: () => import('./lake-form/lake-form').then((m) => m.LakeForm),
  },
  {
    path: 'lakes/edit/:id',
    loadComponent: () => import('./lake-form/lake-form').then((m) => m.LakeForm),
    canActivate: [editGuard],
    resolve: { lake: lakeResolver },
  },
  {
    path: 'lakes/:id',
    loadComponent: () => import('./lake-detail/lake-detail').then((m) => m.LakeDetail),
    resolve: { lake: lakeResolver },
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  },
];
