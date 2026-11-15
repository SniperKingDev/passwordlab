# PasswordLab

**PasswordLab** est un petit projet Open Source développé avec React et CSS. Il permet d'analyser instantanément la robustesse d'un mot de passe directement dans le navigateur.

L'objectif est de comprendre les bases de React, la manipulation des données et la création d'une interface interactive.

## Fonctionnalités

- Saisie d'un mot de passe.
- Affichage ou masquage du mot de passe.
- Analyse instantanée.
- Score de sécurité sur 100.
- Classification : Weak, Medium, Strong et Very Strong.
- Vérification de plusieurs critères de sécurité.

## Technologies utilisées

- React : création de l'interface et gestion des données.
- JavaScript : logique d'analyse du mot de passe.
- CSS : mise en forme et design.
- Vite : environnement de développement.

## Installation

Clone le dépôt :

```bash
git clone URL_DU_DEPOT
```

Entre dans le dossier :

```bash
cd passwordlab
```

Installe les dépendances :

```bash
npm install
```

Lance le serveur local :

```bash
npm run dev
```

## Architecture du projet

```text
passwordlab/
│
├── src/
│   ├── components/
│   │   ├── PasswordInput.jsx
│   │   ├── PasswordInput.css
│   │   ├── StrengthMeter.jsx
│   │   ├── StrengthMeter.css
│   │   ├── CriteriaList.jsx
│   │   └── CriteriaList.css
│   │
│   ├── utils/
│   │   └── analyzePassword.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
└── README.md
```

## Comment fonctionne le code ?

### 1. PasswordInput.jsx

Ce composant contient le champ de saisie.

Il récupère le mot de passe entré par l'utilisateur et transmet sa nouvelle valeur à `App.jsx` grâce à la fonction `onChange`.

Il permet également d'afficher ou de masquer le mot de passe.

### 2. analyzePassword.js

C'est le moteur logique de l'application.

Cette fonction reçoit le mot de passe et vérifie plusieurs éléments :

- La longueur.
- La présence de majuscules.
- La présence de minuscules.
- La présence de chiffres.
- La présence de caractères spéciaux.
- L'absence de motifs courants et de répétitions.

Elle retourne trois informations :

- `score` : le score sur 100.
- `strength` : le niveau de robustesse.
- `criteria` : la liste des critères validés ou non.

### 3. StrengthMeter.jsx

Ce composant reçoit les informations calculées par `analyzePassword.js`.

Il affiche le score, le niveau de robustesse et la barre de progression.

### 4. CriteriaList.jsx

Ce composant affiche les critères de sécurité.

Il utilise `map()` pour parcourir la liste des critères et afficher une coche lorsque le critère est validé, ou une croix lorsqu'il ne l'est pas.

### 5. App.jsx

C'est le composant principal.

Il rassemble les différents composants et gère le mot de passe avec `useState`.

À chaque modification du mot de passe, React actualise l'état, relance l'analyse et met à jour l'interface.

### 6. main.jsx

C'est le point d'entrée de l'application.

Il permet à React d'afficher le composant `App` dans la page HTML.

## Comment le score est-il calculé ?

Le score repose sur un système de points :

| Critère | Points |
|---|---:|
| Longueur de 8 à 11 caractères | 15 |
| Longueur de 12 à 15 caractères | 25 |
| Longueur de 16 caractères ou plus | 35 |
| Majuscules | 10 |
| Minuscules | 10 |
| Chiffres | 10 |
| Caractères spéciaux | 10 |
| Absence de motifs courants | 25 |

Les niveaux sont déterminés ainsi :

- 0 à 29 : Weak
- 30 à 59 : Medium
- 60 à 84 : Strong
- 85 à 100 : Very Strong

Ce système est une estimation pédagogique basée sur des règles simples. Il ne constitue pas une certification de sécurité.

## Confidentialité

L'analyse est effectuée localement dans le navigateur.

Aucun backend ni aucune base de données ne sont utilisés pour traiter les mots de passe dans cette version.

**Important :** PasswordLab ne vérifie pas si un mot de passe figure dans une base de données de mots de passe compromis. Son score ne garantit donc pas qu'un mot de passe est sûr.

## Version

PasswordLab v1.0

Projet Open Source — construit avec React et JavaScript.