const monInput = document.getElementById('monInput'); // Récupération de l'élément input
const monBouton = document.getElementById('monBouton'); // Récupération de l'élément bouton
const monBouton2 = document.getElementById('monBouton2'); // Récupération du deuxième bouton

// Ajout d'un écouteur d'événement au deuxième bouton
monBouton2.addEventListener('click', () => {

    fetch('/info').then( // Requête GET vers /info
        response => response.json() // Conversion de la réponse en JSON
    ).then(JsonReponse => { // Traitement de la réponse JSON
        document.getElementById('rep').innerHTML = JsonReponse.clef1;// Affichage de clef1 dans l'élément rep
        document.getElementById('rep').innerHTML += '<input type="button" value="Cliquez-encore" id="monBouton3"></input>'; // Ajout d'un troisième bouton invisble car pas integrer dans le html
        const monBouton3 = document.getElementById('monBouton3'); // Récupération du troisième bouton
        monBouton3.addEventListener('click', () => { // Ajout d'un écouteur d'événement au troisième bouton

            fetch('/info').then( // Requête GET vers /info
                response => response.json() // Conversion de la réponse en JSON
            ).then(JsonReponse => { // Traitement de la réponse JSON
                document.getElementById('rep2').innerHTML = JsonReponse.clef2; // Affichage de clef2 dans l'élément rep2
            });

        });
    });
});


monBouton.addEventListener('click', () => { // Ajout d'un écouteur d'événement au bouton
    fetch('/register', { // Requête POST vers /register
        method: 'POST', // Méthode POST
        headers: { // En-têtes de la requête
            'Content-Type': 'application/json' // Indication que le corps de la requête est en JSON
        },
        body: JSON.stringify({ inputValue: monInput.value }) // Corps de la requête avec la valeur de l'input convertie en JSON
    })
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => { // Traitement de la réponse JSON
            alert(data); // Affichage d'une alerte avec la réponse
        });
});
