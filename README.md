*======================================== Instructions ========================================*

*=======================*
NodeJs version: v18.9.0
*=======================*

*=======================*
Vous trouverez le projet sur mon compte Github: www.github.com/amineech => OkVoiture Repository

Au cas ou vous voulez 

*=======================*

*===== Les etapes pour lancer le projet =====* 
1. Installer NodeJs: v18.9.0 ou plus
2. accéder au dossier server(a l'aide de la ligne de commande) et taper la commande 'npm install' 
3. accéder au dossier client(a l'aide de la ligne de commande) et taper la commande 'npm install' 
*NB: 'npm install' pour installer tout les dépendances qui existent dans le fichier package.json soit dans
le dossier 'server' ou 'client', c'est tout les modules nécessaires pour le bon fonctionnement du projet 
4. ouvrer un terminal dans le dossier 'server' et tapez 'node index' pour lancer la partie Back (Express) du projet
5. ouvrer un terminal dans le dossier 'client' et taper 'npm start' pour lancer la partie Front (React) du projet
=> Le navigateur va lancer la page Home (Path '/') automatiquement apres l'execution de la commande 'npm start'
6. Les requetes Front qui peuvent etre executées (affichage des pages) pour tester sur le projet sont: 

6.1 Afficher la page d'ajout d'une voiture: http://localhost:3000/cars/create
6.2 Afficher la liste des voitures (BD rempli !): http://localhost:3000/cars/list
6.3 Afficher la liste des reservations (BD rempli !): http://localhost:3000/reservations/list

7. Il ya d'autres requetes comme la creation d'une reservation (Boite Modal, POST), la suppression d'une reservation(POST), la creation d'une voiture(POST) qui doivent, au mieux, etre tester après l'integration de la base de donnees attaches au projet en .zip (SGBD MySQL integré en XAMPP)

*NB: vous devez avoir XAMPP installé