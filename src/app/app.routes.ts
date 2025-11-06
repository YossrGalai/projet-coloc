import { Routes } from '@angular/router';
import { Inscription } from './inscription/inscription';
import {Accueil} from  "./accueil/accueil";
import { Apropos } from './apropos/apropos';
//import { Recherche } from './recherche/recherche';
export const routes: Routes = [
     { path: '', component: Inscription }, // default route
     { path: 'inscription', component: Inscription },
     //{ path: 'recherche', component: Recherche }
     { path: 'apropos', component: Apropos },
];
