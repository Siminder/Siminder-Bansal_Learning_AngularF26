import { Routes } from '@angular/router';
import { ContentList } from './content-list/content-list';
import { LakeDetail } from './lake-detail/lake-detail';
import { LakeForm } from './lake-form/lake-form';
import { editGuard } from './guards/edit-guard';
import { lakeResolver } from './resolvers/lake-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'lakes', pathMatch: 'full' },
  { path: 'lakes', component: ContentList },
  { path: 'lakes/add', component: LakeForm },
  {
    path: 'lakes/edit/:id',
    component: LakeForm,
    canActivate: [editGuard],
    // Wait for the API data so the form can pre-fill on a direct visit/refresh
    resolve: { lake: lakeResolver },
  },
  { path: 'lakes/:id', component: LakeDetail, resolve: { lake: lakeResolver } },
];
