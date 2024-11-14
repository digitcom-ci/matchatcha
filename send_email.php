<?php
// Inclure PHPMailer
require 'libs/PHPMailer/PHPMailer.php';
require 'libs/PHPMailer/SMTP.php';
require 'libs/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du formulaire
    $firstName = htmlspecialchars($_POST["firstName"]);
    $lastName = htmlspecialchars($_POST["lastName"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST["phone"]);
    $city = htmlspecialchars($_POST["city"]);
    $address = htmlspecialchars($_POST["address"]);
    $deliveryFee = htmlspecialchars($_POST["deliveryFee"]);
    $cartItems = json_decode($_POST["cartItems"], true);

    // Contenu de l'email
    $subject = "Nouvelle commande de $firstName $lastName";
    $message = "<h2>Nouvelle commande</h2>";
    $message .= "<p><strong>Nom :</strong> $firstName $lastName</p>";
    $message .= "<p><strong>Email :</strong> $email</p>";
    $message .= "<p><strong>Téléphone :</strong> $phone</p>";
    $message .= "<p><strong>Ville :</strong> $city</p>";
    $message .= "<p><strong>Adresse complète :</strong> $address</p>";
    $message .= "<p><strong>Frais de livraison :</strong> $deliveryFee FCFA</p>";
    $message .= "<h3>Liste des articles commandés :</h3>";

    if (!empty($cartItems)) {
        $message .= "<ul>";
        foreach ($cartItems as $item) {
            $message .= "<li><strong>Produit :</strong> " . htmlspecialchars($item["name"]) . 
                        " | <strong>Variante :</strong> " . htmlspecialchars($item["variant"]) . 
                        " | <strong>Quantité :</strong> " . htmlspecialchars($item["quantity"]) . "</li>";
        }
        $message .= "</ul>";
    } else {
        $message .= "<p>Le panier est vide.</p>";
    }

    // Configurer PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Exemple pour Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'matchatcha.ci@gmail.com'; // Remplacez par votre adresse email
        $mail->Password = 'MAtchatcha225'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataire
        $mail->setFrom('matchatcha.ci@gmail.com', 'matchatcha');
        $mail->addAddress('matchatcha.ci@gmail.com');

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        // Envoyer l'email
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Commande envoyée avec succès !"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi : {$mail->ErrorInfo}"]);
    }
    exit;
}
?>
