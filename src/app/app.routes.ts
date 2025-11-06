import { RouterModule, Routes } from '@angular/router';
import { Contact } from './contact/contact';
import { Accueil } from './accueil/accueil';
import { Profil } from './profil/profil';
import { Proprietaire } from './proprietaire/proprietaire';
import { Logement } from './logement/logement';

 const routes: Routes = [
  { path: '', 
    component: Accueil ,
    title:' Page d\'acceuil '
  },
  {
    path: 'contact', 
    component:Contact,
    title:'Page de Contact'
  },
  { path: 'profil', component: Profil,title:'Profil Locataire' },
  { path: 'proprietaire', component: Proprietaire,title:'Profil Propriétaire' },
  { path: 'logement', component: Logement,title:'Ajout de Logement' },
    
  
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


export default routes;
