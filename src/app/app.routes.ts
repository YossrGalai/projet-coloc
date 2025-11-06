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
    
  
];


export default routes;