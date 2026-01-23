
const express = require('express'); // importation d'express
const app = express(); // création de l'application express
const mysql = require('mysql2');


const connection = mysql.createConnection({ // configuration de la connexion à la base de données
  host: '172.29.18.123',
  user: 'accesNodeServerDemo',
  password: 'accesNodeServerDemo',
  database: 'test'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('public')); // servir les fichiers statiques du dossier public
app.use(express.json()); // middleware pour parser le JSON

app.get('/login', (req, res) => { // route GET pour /login
  res.send('<h1>bienvenue sur la page de login!</h1>'); // envoi d'une réponse HTML
});

app.get('/info', (req, res) => { // route GET pour /info
  res.json({ clef1: 'test=', clef2: 'test' }); //    envoi d'une réponse JSON
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.get('/vote', (req, res) => {
  connection.query('SELECT * FROM Vote', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des votes :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });

});
app.get('/voteCount', (req, res) => {
  connection.query('SELECT User.login, COUNT(Vote.idUser) AS voteCount FROM User, Vote WHERE User.id = Vote.idUser GROUP BY User.id ORDER BY VoteCount DESC;', //autre méthode : 'SELECT User.login, COUNT(Vote.idUser) AS voteCount FROM User JOIN Vote ON User.id = Vote.idUser GROUP BY User.id ORDER BY VoteCount DESC;'
    (err,results) => {
    if (err) {
        console.error('Erreur lors de la récupération du nombre de votes :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
        res.json(results);
    });
});


app.use(express.json());


app.post('/register', (req, res) => { // route POST pour /register
  console.log('Données recues pour l\'inscription'); // log dans la console
  console.log(req.body); // affichage du corps de la requête
  connection.query(
    'INSERT INTO User (login, password) VALUES (?, ?)',
    [req.body.V_log, req.body.V_pass],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }

      console.log('Insertion réussie, ID utilisateur :', results.insertId);
      res.json({ message: 'Inscription réussie !', userId: results.insertId });
    }
  );
});

app.post('/vote', (req, res) => { // route POST pour /vote
  console.log('Données reçues pour le vote'); // log dans la console
  console.log(req.body); // affichage du corps de la requête
  connection.query(
    'INSERT INTO Vote (idUser) VALUES (?)', 
    [req.body.idUser],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion du vote dans la base de données :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      console.log('Vote inséré avec succès, ID du vote :', results.insertId);
      res.json({ message: 'Vote enregistré avec succès !', voteId: results.insertId });
    }
  );
});


  app.listen(3000, () => { // démarrage du serveur sur le port 3000
    let monIp = require("ip").address(); // récupération de l'adresse IP locale
    console.log(`Server running on http://${monIp}:3000`); // log de l'URL du serveur
  })

  