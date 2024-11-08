// Fonction pour afficher/masquer le menu
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active'); // Ajoute ou enlève la classe active pour afficher/masquer le menu
}

// Fonction de déconnexion
function logout() {
  // Effacer les informations de session
  // Dans ce cas, vous pouvez également rediriger vers une page d'index ou de connexion
  alert("Déconnexion réussie !");
  // Redirige vers la page index (remplacer 'index.html' par le nom de votre page d'index)
  window.location.href = 'index.html'; // Assurez-vous que cette page existe
}

// Fonction d'ajout de tâche
document.getElementById('add-task').addEventListener('click', function() {
    const newTaskInput = document.getElementById('new-task');
    const newTaskValue = newTaskInput.value.trim();
    const timeOfDay = document.getElementById('time-of-day').value; // Récupère la valeur du menu déroulant

    if (newTaskValue) {
        const newTaskItem = document.createElement('li');

        // Crée une case à cocher
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Crée un label
        const label = document.createElement('label');
        label.textContent = newTaskValue;

        // Crée un sticker
        const sticker = document.createElement('span');
        sticker.className = 'sticker';
        sticker.textContent = '✅'; // Exemple de sticker

        // Ajoute les éléments
        newTaskItem.appendChild(checkbox);
        newTaskItem.appendChild(label);
        newTaskItem.appendChild(sticker);

        // Ajoute la nouvelle tâche à la routine appropriée
        if (timeOfDay === 'morning') {
            document.getElementById('morning-routine').appendChild(newTaskItem);
        } else if (timeOfDay === 'evening') {
            document.getElementById('evening-routine').appendChild(newTaskItem);
        } else {
            document.getElementById('day-routine').appendChild(newTaskItem);
        }

        // Efface le champ de saisie
        newTaskInput.value = '';
    }
});

