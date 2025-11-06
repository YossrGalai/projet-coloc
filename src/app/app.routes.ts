import { Routes } from '@angular/router';
import {Accueil} from  "./accueil/accueil";
import {RechercheLogement} from  "./recherche-logement/recherche-logement";
import {Inscription} from  "./inscription/inscription";
import {SeConnecter} from  "./se-connecter/se-connecter";


export const routes: Routes = [
     { path: '', component: Accueil }, // default route
     { path: 'recherche-logement', component: RechercheLogement },
     { path: 'se-connecter', component: SeConnecter },
     { path: 'inscription', component: Inscription }
];
