
var afficheAnalogie = [];
fetch('data.json').then(function (response) {
    response.json().then(function (data) {

        var modele = "<section class=\"container-analogie\"><div class=\"image-analogie\"><img src=\"{{image}}\" alt=\"{{alt}}\"></div><div class=\"description-analogie\"><p class='content-analogie'>Si j’étais {{analogie}}, je serais {{valeurAnalogie}} parce que {{explication}}</p></div></section>";

        var main = document.querySelector("main");

        var text = "";
        data.forEach(function (element) {
            text += modele
            Object.keys(element).forEach(function (clef) {
                text = text.replaceAll("{{" + clef + "}}", element[clef]);
            })
        })

        main.innerHTML = text
    })

    const infoanalogieperso = document.querySelector('button#envoyer');
    // Les données du formulaire sont envoyés à l'API après qu'on appuie sur le bouton "Envoyer"
    infoanalogieperso.addEventListener('click', function () {

        var main = document.querySelector("main");
        main.innerHTML += "<section class=\"container-analogie\"><div class=\"image-analogie\"><img src=\"" + document.querySelector('input#imageform').value + "\"></div><div class=\"description-analogie\"><p class='content-analogie'>Si j’étais, " + document.querySelector('input#analogie').value + "je serais " + document.querySelector('input#valeurAnalogie').value + " parce que" + document.querySelector('textarea#explicationform').value + "</p></div></section>"

        // Lien vers l'API de monsieur Gambette
        const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=anthony.stanislas&courriel=" + document.querySelector('input#mail').value + "&message=Si j'étais" + document.querySelector('input#analogie').value + "je serais " + document.querySelector('input#valeurAnalogie').value + " car " + document.querySelector('textarea#explicationform').value + " Image choisie : " + document.querySelector('input#imageform').value;

        // Affichage d'un message de confirmation de réception des données
        fetch(lien).then(function (response) {
            response.json().then(function (data) {
                console.log("Réponse reçue : ")
                console.log(data);
                alert(data.message)
            })
        })
        // Sert à réinitialiser le formulaire. 
        resetForm();
    })

})

function resetForm() {
    const formulaire = document.querySelectorAll('form input, form textarea');
    formulaire.forEach(function (entree) {
        entree.value = "";
    })
}


