const monInput = document.getElementById('monInput'); // Récupération de l'élément input
const monInput2 = document.getElementById('monInput2'); // Récupération du deuxième élément input
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
        body: JSON.stringify({ V_log: monInput.value, V_pass: monInput2.value }) // Corps de la requête avec la valeur de l'input convertie en JSON
    })
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => { // Traitement de la réponse JSON
            alert(data.message); // Affichage d'une alerte avec la réponse
        });
});

window.onload = () => {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('usersList');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.login;
                usersList.appendChild(option);

            });
        });
    
//===================================================================================================    

    tabvote();
}

const usersList = document.getElementById('usersList');
const userSelectedButton = document.getElementById('userSelectedButton');
userSelectedButton.addEventListener('click', () => {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    alert('Utilisateur sélectionné ID : ' + selectedUserId);
    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUser: selectedUserId })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
        
});

function tabvote(){
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    fetch('/voteCount', {
    })
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('resultat');
            data.forEach(Tvote => {
            const tr = document.createElement("tr");
            result.appendChild(tr);
            const td = document.createElement("td");
            td.innerText = Tvote.login;
            tr.appendChild(td);
            const td1 = document.createElement("td");
            td1.innerText = "   " + Tvote.voteCount;
            tr.appendChild(td1);
            
            
            
        });
    })
}
