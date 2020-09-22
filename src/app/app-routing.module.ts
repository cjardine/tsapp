import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionModule),
    data: {title: 'Introduction'},
  },
  {
    path: 'typing',
    loadChildren: () => import('./pages/typing/typing.module').then(m => m.TypingModule),
    data: {title: 'Typing'}
  },
  {
    path: 'type',
    loadChildren: () => import('./pages/custom-type/custom-type.module').then(m => m.CustomTypeModule),
    data: {title: 'Custom Types'}
  },
  {
    path: 'resources',
    loadChildren: () => import('./pages/resources/resources.module').then(m => m.ResourcesModule),
    data: {title: 'Resources'},
  },
  // {
  //   path: 'intro',
  //   loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionModule),
  //   data: {title: 'Introduction'},
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
