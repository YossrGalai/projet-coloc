-- TABLE UTILISATEUR
CREATE TABLE utilisateur (
  cin NUMBER( 8 ),
  role VARCHAR2(20),
  nom VARCHAR2(100) NOT NULL,
  prenom VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) NOT NULL,
  mot_de_passe VARCHAR2(255) NOT NULL,
  telephone VARCHAR2(20),
  date_naissance DATE,
  date_inscription DATE DEFAULT CURRENT_DATE,
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
  description CLOB,
  photo VARCHAR2(255),
  cin_proprietaire Number(8 ),
  role_proprietaire VARCHAR2(20),
  CONSTRAINT fk_logement_utilisateur FOREIGN KEY (cin_proprietaire, role_proprietaire)
    REFERENCES utilisateur(cin, role)
    ON DELETE CASCADE,
  CONSTRAINT chk_role_proprietaire CHECK (role_proprietaire IN ('colocataire','proprietaire','admin'))
);

-- TABLE RESERVATION
CREATE TABLE reservation (
  id_reservation NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cin_colocataire Number(8 ),
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
INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (10000001, 'admin', 'Admin', 'System', 'admin@mail.com', 'admin123', '00000000', TO_DATE('01-01-1990', 'DD-MM-YYYY'));

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (20000001, 'proprietaire', 'Ben Ali', 'Sami', 'sami.proprio@mail.com', 'pass123', '22112211', TO_DATE('15-05-1985', 'DD-MM-YYYY'));

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (20000002, 'proprietaire', 'Khaldi', 'Mouna', 'mouna.proprio@mail.com', 'pass456', '33443344', TO_DATE('23-08-1987', 'DD-MM-YYYY'));

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (30000001, 'colocataire', 'Hammami', 'Yassine', 'yassine.coloc@mail.com', 'coloc123', '44554455', TO_DATE('12-02-1999', 'DD-MM-YYYY'));

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (30000002, 'colocataire', 'Salah', 'Nour', 'nour.coloc@mail.com', 'coloc456', '55665566', TO_DATE('27-11-2000', 'DD-MM-YYYY'));

INSERT INTO utilisateur (cin, role, nom, prenom, email, mot_de_passe, telephone, date_naissance)
VALUES (30000003, 'colocataire', 'Mejri', 'Malek', 'malek.coloc@mail.com', 'coloc789', '66776677', TO_DATE('05-07-1998', 'DD-MM-YYYY'));

--REMPLISSAGE LOGEMENT
INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, cin_proprietaire, role_proprietaire)
VALUES ('Appartement Centre Ville', 'Avenue Habib Bourguiba', 'Tunis', 750, 3, 120, 'Appartement spacieux proche de toutes commodités', 'photo1.jpg', 20000001, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, cin_proprietaire, role_proprietaire)
VALUES ('Studio Lac 2', 'Rue du Lac Biwa', 'Tunis', 450, 1, 45, 'Studio moderne très bien équipé', 'photo2.jpg', 20000002, 'proprietaire');

INSERT INTO logement (titre, adresse, ville, prix, nb_chambres, superficie, description, photo, cin_proprietaire, role_proprietaire)
VALUES ('Maison Bord de Mer', 'Route Sidi Bou Ali', 'Sousse', 1200, 4, 200, 'Grande maison proche de la plage', 'photo3.jpg', 20000001, 'proprietaire');


--REMPLISSAGE RESERVATION
INSERT INTO reservation (cin_colocataire, role_colocataire, id_logement, date_debut, date_fin, statut)
VALUES (30000001, 'colocataire', 1, TO_DATE('01-03-2025','DD-MM-YYYY'), TO_DATE('01-04-2025','DD-MM-YYYY'), 'en_attente');

INSERT INTO reservation (cin_colocataire, role_colocataire, id_logement, date_debut, date_fin, statut)
VALUES (30000002, 'colocataire', 2, TO_DATE('10-02-2025','DD-MM-YYYY'), TO_DATE('10-03-2025','DD-MM-YYYY'), 'acceptée');

INSERT INTO reservation (cin_colocataire, role_colocataire, id_logement, date_debut, date_fin, statut)
VALUES (30000003, 'colocataire', 3, TO_DATE('15-03-2025','DD-MM-YYYY'), TO_DATE('15-04-2025','DD-MM-YYYY'), 'refusée');

commit;