import { Routes } from '@angular/router';
import { ContentList } from './content-list/content-list';
import {LakeDetail} from './lake-detail/lake-detail';
import { LakeForm } from './lake-form/lake-form';

export const routes: Routes = [
  { path: '', redirectTo: 'lakes', pathMatch: 'full' },
  { path: 'lakes', component: ContentList },
  { path: 'lakes/add', component: LakeForm },
  { path: 'lakes/:id', component: LakeDetail },

];
