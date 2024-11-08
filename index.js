const express = require('express');
const bodyParser = require('body-parser');
const { Database } = require('replit-db'); // Import Replit DB
const bcrypt = require('bcrypt'); // Pour le hachage des mots de passe
const app = express();
const db = new Database(); // Créer une instance de la base de données

app.use(bodyParser.json());
// Fonction pour hacher un mot de passe
async function hashPassword(password)

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await db.get(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Enregistrer l'utilisateur dans la base de données
  await db.set(email, { username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Récupérer l'utilisateur à partir de la base de données
  const user = await db.get(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Logged in successfully', username: user.username });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

fetch('https://ton-projet.replit.app/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'JohnDoe',
    email: 'john@example.com',
    password: 'yourpassword',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification des identifiants
  // Supposons que "user" est l'utilisateur authentifié récupéré de la base de données
  if (user) {
      req.session.userId = user.id; // Marque l'utilisateur comme connecté
      res.json({ message: "Connexion réussie" });
  } else {
      res.status(401).json({ message: "Identifiants incorrects" });
  }
});

app.get('/isAuthenticated', (req, res) => {
  // Vérifie si l'utilisateur est connecté en vérifiant la variable de session
  if (req.session.userId) {
      res.json({ isAuthenticated: true });
  } else {
      res.json({ isAuthenticated: false });
  }
});
