import { Routes } from '@angular/router';
import { ContentList } from './content-list/content-list';
 export const routes: Routes = [
   { path: '', redirectTo: 'lakes', pathMatch: 'full' },
   { path: 'lakes', component: ContentList },
 ];
