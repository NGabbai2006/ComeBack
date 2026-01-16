
const express = require('express'); // importation d'express
const app = express(); // création de l'application express
const mysql= require('mysql2');


const connection = mysql.createConnection({ // configuration de la connexion à la base de données
    host: '172.29.18.123',
    user: 'site',
    password: 'site',
    database: 'test'
});

connection.connect((err) => { // connexion à la base de données
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données avec l\'ID ' + connection.threadId);
});

app.use(express.static('public')); // servir les fichiers statiques du dossier public
app.use(express.json()); // middleware pour parser le JSON

app.get('/login', (req, res) => { // route GET pour /login
  res.send('<h1>bienvenue sur la page de login!</h1>'); // envoi d'une réponse HTML
});

app.get('/info', (req, res) => { // route GET pour /info
    res.json({clef1 : 'test=', clef2: 'test'}); //    envoi d'une réponse JSON
});

app.use(express.json()); // middleware pour parser le JSON


app.post('/register', (req, res) => { // route POST pour /register
    console.log('Données recues pour l\'inscription'); // log dans la console
    console.log(req.body); // affichage du corps de la requête
    res.json({ message: 'Inscription réussie !'}); // envoi d'une réponse JSON
});


app.listen(3000, ()=>{ // démarrage du serveur sur le port 3000
    let monIp = require("ip").address(); // récupération de l'adresse IP locale
    console.log(`Server running on http://${monIp}:3000`); // log de l'URL du serveur
})