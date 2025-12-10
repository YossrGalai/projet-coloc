-- TABLE UTILISATEUR
CREATE TABLE utilisateur (
  cin NUMBER(8),
  role VARCHAR2(20),
  nom VARCHAR2(100) NOT NULL,
  prenom VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) NOT NULL,
  mot_de_passe VARCHAR2(255) NOT NULL,
  telephone VARCHAR2(20),
  date_naissance DATE,
  date_inscription DATE DEFAULT CURRENT_DATE,
  photo VARCHAR2(255),
  CONSTRAINT pk_utilisateur PRIMARY KEY (cin, role),
  CONSTRAINT uq_email UNIQUE (email),
  CONSTRAINT chk_role CHECK (role IN ('colocataire','proprietaire','admin'))
);

-- TABLE LOGEMENT
CREATE TABLE logement (
  id_logement NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titre VARCHAR2(150),
  adresse VARCHAR2(255),
  ville VARCHAR2(100),
  prix NUMBER(10,2),
  nb_chambres NUMBER,
  superficie NUMBER(6,2),
  description VARCHAR2(255),
  photo VARCHAR2(255),
  type VARCHAR2(50),
  reserve CHAR(1) CHECK (reserve IN ('Y','N')),
  cin_proprietaire Number(8),
  role_proprietaire VARCHAR2(20),
  CONSTRAINT fk_logement_utilisateur FOREIGN KEY (cin_proprietaire, role_proprietaire)
    REFERENCES utilisateur(cin, role)
    ON DELETE CASCADE,
  CONSTRAINT chk_role_proprietaire CHECK (role_proprietaire IN ('colocataire','proprietaire','admin'))
);

-- TABLE RESERVATION
CREATE TABLE reservation (
  id_reservation NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cin_colocataire Number(8),
  role_colocataire VARCHAR2(20),
  id_logement NUMBER,
  date_debut DATE,
  date_fin DATE,
  statut VARCHAR2(20) DEFAULT 'en_attente',
  CONSTRAINT fk_reservation_utilisateur FOREIGN KEY (cin_colocataire, role_colocataire)
    REFERENCES utilisateur(cin, role)
    ON DELETE CASCADE,
  CONSTRAINT fk_reservation_logement FOREIGN KEY (id_logement)
    REFERENCES logement(id_logement)
    ON DELETE CASCADE,
  CONSTRAINT chk_statut CHECK (statut IN ('en_attente','acceptée','refusée','terminée')),
  CONSTRAINT chk_role_colocataire CHECK (role_colocataire IN ('colocataire','proprietaire','admin'))
);

--REMPLISSAGE UTILISATEUR
INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (10000001, 'admin', 'Admin', 'System', 'admin@mail.com', 'admin123', '00000000', TO_DATE('01-01-1990', 'DD-MM-YYYY'), 'photo.jpg');

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (20000001, 'proprietaire', 'Ben Ali', 'Sami', 'sami.proprio@mail.com', 'pass123', '22112211', TO_DATE('15-05-1985', 'DD-MM-YYYY'),'/uploads/utilisateur/Sami.jpg');

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (20000002, 'proprietaire', 'Khaldi', 'Mouna', 'mouna.proprio@mail.com', 'pass456', '33443344', TO_DATE('23-08-1987', 'DD-MM-YYYY'),'/uploads/utilisateur/Mouna.jpg');

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (30000001, 'colocataire', 'Hammami', 'Yassine', 'yassine.coloc@mail.com', 'coloc123', '44554455', TO_DATE('12-02-1999', 'DD-MM-YYYY'),'/uploads/utilisateur/Yassine.jpg');

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (30000002, 'colocataire', 'Salah', 'Nour', 'nour.coloc@mail.com', 'coloc456', '55665566', TO_DATE('27-11-2000', 'DD-MM-YYYY'),'/uploads/utilisateur/Nour.jpg');

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance,photo)
VALUES (30000003, 'colocataire', 'Mejri', 'Malek', 'malek.coloc@mail.com', 'coloc789', '66776677', TO_DATE('05-07-1998', 'DD-MM-YYYY'),'/uploads/utilisateur/Malek.jpg');

--REMPLISSAGE LOGEMENT
INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Appartement Centre Ville', 'Avenue Habib Bourguiba', 'Tunis', 750, 3, 120, 'Appartement spacieux proche de toutes commodités', '/uploads/logement/Appartement Centre Ville.jpg', 'Appartement', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Studio Lac 2', 'Rue du Lac Biwa', 'Tunis', 450, 1, 45, 'Studio moderne très bien équipé', '/uploads/logement/Studio Lac 2.jpg', 'Studio', 'Y', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Maison Bord de Mer', 'Route Sidi Bou Ali', 'Sousse', 1200, 4, 200, 'Grande maison proche de la plage', '/uploads/logement/Maison Bord de Mer.jpg', 'Maison', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Maison Panorama', 'Chemin des Dunes', 'Nabeul', 2000, 6, 350, 'Maison spacieuse avec vue panoramique sur la mer', '/uploads/logement/Maison Panorama.jpg', 'Maison', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Maison Ancienne', 'Rue du Marché', 'Sfax', 850, 3, 130, 'Maison ancienne rénovée au cœur de la ville', '/uploads/logement/Maison Ancienne.jpg', 'Maison', 'N', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Appartement Design', 'Boulevard de la Liberté', 'Tunis', 900, 3, 100, 'Appartement moderne avec décoration design', '/uploads/logement/Appartement Design.jpg', 'Appartement', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Appartement Petit Budget', 'Rue El Manar', 'Ariana', 500, 1, 60, 'Petit appartement pratique et lumineux', '/uploads/logement/Appartement Petit Budget.jpg', 'Appartement', 'N', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Studio Zen', 'Rue des Palmiers', 'Monastir', 420, 1, 40, 'Studio minimaliste et bien organisé', '/uploads/logement/Studio Zen.jpg', 'Studio', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Studio Meublé', 'Rue Ibn Sina', 'Tunis', 430, 1, 38, 'Studio meublé idéal pour jeunes professionnels', '/uploads/logement/Studio Meublé.jpg', 'Studio', 'N', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Chambre Étudiante', 'Rue des Universités', 'Sousse', 210, 1, 20, 'Chambre à partager dans un appartement étudiant', '/uploads/logement/Chambre Étudiante.jpg', 'Chambre Partagée', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Chambre Coloc', 'Rue de la Plage', 'Nabeul', 230, 1, 22, 'Chambre partagée proche de la plage', '/uploads/logement/Chambre Coloc.jpg', 'Chambre Partagée', 'N', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Studio Étudiant', 'Rue des Universités', 'Sfax', 350, 1, 30, 'Petit studio pratique pour étudiants, proche du campus', '/uploads/logement/Studio Étudiant.jpg', 'Studio', 'N', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, type, reserve, cin_proprietaire, role_proprietaire)
VALUES ('Appartement Partagé Étudiant', 'Avenue Habib Bourguiba', 'Tunis', 300, 2, 50, 'Appartement à partager entre étudiants, proche des transports et universités', '/uploads/logement/Appartement Partagé Étudiant.jpg', 'Appartement', 'N', 20000002, 'proprietaire');



COMMIT;
-- AFFICHAGE
SELECT * FROM utilisateur;
SELECT * FROM logement;
SELECT * FROM reservation;



