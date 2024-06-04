Projet d'apprentissage node.js et MySQL

# Créer un site web pour un cabinet dentaire avec Node JS

## Contexte du projet

En tant que développeur backend junior et freelance, vous avez été sollicité pour réaliser une application web de gestion des rendez-vous pour le Dr. Dupont, un dentiste souhaitant renforcer sa présence en ligne. Ce projet a pour but d'attirer de nouveaux patients et de simplifier la gestion des rendez-vous pour les patients actuels.

## Spécifications fonctionnelles

L'application se divise en deux grandes parties :

### Front Office pour les patients

- **Page d'accueil :**
  - Présentation du Dr. Dupont, de son cabinet, des services offerts et des horaires d'ouverture.
  - Images de la clinique.
  - Bouton "Prendre rendez-vous".

- **Page de prise de rendez-vous :**
  - Formulaire de prise de rendez-vous avec nom et prénom, choix de la date, de l'heure et du type de consultation.

- **Page de présentation des services :**
  - Présentation du Dr. Dupont, de son parcours, de ses qualifications et de son équipe.
  - Détails des soins proposés (soins courants, orthodontie, implantologie, etc.).

- **Page actualité :**
  - Actualités dans le domaine de la santé bucco-dentaire.

### Back Office

- **Gestion des rendez-vous :** Visualisation, modification, confirmation ou annulation des rendez-vous.
- **Gestion des services :** Ajout, modification ou suppression des services proposés.
- **Gestion des actualités :** Ajout, modification ou suppression d'articles d'actualité.
- **Gestion des patients :** Gestion des informations des patients.
- **Gestion des horaires :** Modification des horaires d'ouverture du cabinet.

## Exigences Techniques

- Le projet doit être développé en utilisant Node.js et MySQL.
- Les frameworks tels que Express.js sont autorisés;
- Pour le Frontend, vous pour utiliser EJS ou Nunjucks
- Les frameworks tels que bootstrap ou Tailwind CSS sont autorisés 
- Chiffrement des mots de passe en base de données.
- Implémentation des relations entre les tables de la base de données.

## Livrables

- Diagrammes de cas d'utilisation et diagramme de classe.
- Code source du site web sur GitHub.
- Lien vers le site web hébergé sur un serveur distant.


## Notes

- Diagramme de classe : [https://drive.google.com/file/d/1QxpD6kzZo02YJPceZ4SohObwG0Fje8xc/view?usp=sharing](https://drive.google.com/file/d/1QxpD6kzZo02YJPceZ4SohObwG0Fje8xc/view?usp=sharing)
- Pour créer le premier admin, attribuer le role "admin" à un utilisateur en base
- Documentation API : /api-docs
- URL prod : https://learning-campus-dental-office.onrender.com/

  ### Installation
- cloner le projet
- npm install
- créer un fichier .env en remplissant les variables suivantes:
````
DB_HOST=""
DB_NAME=""
DB_PORT=""
DB_USER=""
DB_PWD=""
TOKEN_KEY=""
TINYMCE_API_KEY=""
NODE_ENV="development"
````
