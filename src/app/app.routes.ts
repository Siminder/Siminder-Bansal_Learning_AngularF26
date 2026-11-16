import { Routes } from '@angular/router';
import { ContentList } from './content-list/content-list';
import {LakeDetail} from './lake-detail/lake-detail';

export const routes: Routes = [
   { path: '', redirectTo: 'lakes', pathMatch: 'full' },
   { path: 'lakes', component: ContentList },
   {path: 'lakes/:id', component: LakeDetail}
 ];
