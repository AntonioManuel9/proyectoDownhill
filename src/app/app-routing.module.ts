import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'riders/:id', loadChildren: './riders/riders.module#RidersPageModule' },
  { path: 'imagenes', loadChildren: './imagenes/imagenes.module#ImagenesPageModule' },
  { path: 'info-event', loadChildren: './info-event/info-event.module#InfoEventPageModule' },
  { path: 'patrocinadores', loadChildren: './patrocinadores/patrocinadores.module#PatrocinadoresPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
