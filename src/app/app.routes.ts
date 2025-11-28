import { RouterModule, Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Profil } from './profil/profil';
import { Proprietaire } from './proprietaire/proprietaire';
import { Logement } from './logement/logement';
import {RechercheLogement} from  "./recherche-logement/recherche-logement";
import {Inscription} from  "./inscription/inscription";
import {SeConnecter} from  "./se-connecter/se-connecter";
import { Apropos } from './apropos/apropos';
import { Admin } from './admin/admin';
import { LoginAdmin } from './login-admin/login-admin';
import { adminGuard } from './guards/admin.guards';


 export const routes: Routes = [
  { path: '', 
    component: Accueil ,
    title:' Page d\'acceuil '
  },
  
  { path: 'profil', component: Profil,title:'Profil Locataire' },
  { path: 'proprietaire', component: Proprietaire,title:'Profil Propriétaire' },
  { path: 'logement', component: Logement,title:'Ajout de Logement' },
  { path: 'recherche-logement', component: RechercheLogement },
  { path: 'se-connecter', component: SeConnecter },
  { path: 'inscription', component: Inscription },
  { path: 'apropos', component: Apropos },
  { path: 'login', component: LoginAdmin },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
] 