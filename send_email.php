<?php
// Inclure PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger PHPMailer
require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

// Configuration du message
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$adresse = $_POST['adresse'];
$ville = $_POST['ville'];
$prixLivraison = 1500; // exemple de tarif basé sur le lieu de livraison

// Créer une instance de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuration du serveur SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Utilisez le serveur SMTP de votre choix
    $mail->SMTPAuth = true;
    $mail->Username = 'votre_email@gmail.com'; // Votre adresse Gmail
    $mail->Password = 'votre_mot_de_passe'; // Mot de passe de votre compte Gmail
    $mail->SMTPSecure = 'tls'; // TLS ou SSL
    $mail->Port = 587;

    // Destinataire et expéditeur
    $mail->setFrom('votre_email@gmail.com', 'Votre Nom');
    $mail->addAddress('matchatcha@gmail.com', 'Matchatcha');

    // Contenu de l'email
    $mail->isHTML(true);
    $mail->Subject = 'Nouvelle commande';
    $mail->Body = "<h1>Détails de la commande</h1>
                   <p><strong>Nom :</strong> $nom</p>
                   <p><strong>Prénom :</strong> $prenom</p>
                   <p><strong>Email :</strong> $email</p>
                   <p><strong>Téléphone :</strong> $telephone</p>
                   <p><strong>Adresse :</strong> $adresse</p>
                   <p><strong>Ville :</strong> $ville</p>
                   <p><strong>Frais de livraison :</strong> $prixLivraison FCFA</p>";

    // Envoyer l'email
    $mail->send();
    echo 'Email envoyé avec succès';
} catch (Exception $e) {
    echo "L'email n'a pas pu être envoyé. Erreur de messagerie : {$mail->ErrorInfo}";
}
?>
