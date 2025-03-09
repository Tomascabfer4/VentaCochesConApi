import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'coche',
        loadComponent: () =>
          import('../coche/coche.page').then((m) => m.CochePage),
      },
      {
        path: 'busqueda',
        loadComponent: () =>
          import('../busqueda/busqueda.page').then((m) => m.BusquedaPage),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];
