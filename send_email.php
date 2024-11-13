<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = htmlspecialchars($_POST["firstName"]);
    $lastName = htmlspecialchars($_POST["lastName"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $city = htmlspecialchars($_POST["city"]);
    $address = htmlspecialchars($_POST["address"]);
    $deliveryFee = htmlspecialchars($_POST["deliveryFee"]);

    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'votre.email@gmail.com'; // Ton email Gmail
        $mail->Password = 'votre_mot_de_passe'; // Ton mot de passe Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configuration de l'email
        $mail->setFrom('noreply@votredomaine.com', 'Nom de ton site');
        $mail->addAddress('dd.somanager@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = "Nouvelle commande de $firstName $lastName";
        $mail->Body = "
            <h2>Nouvelle commande reçue</h2>
            <p><strong>Nom :</strong> $firstName $lastName</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Téléphone :</strong> $phone</p>
            <p><strong>Ville :</strong> $city</p>
            <p><strong>Adresse :</strong> $address</p>
            <p><strong>Frais de livraison :</strong> $deliveryFee FCFA</p>
        ";

        // Envoyer l'email
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Email envoyé avec succès."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Erreur : {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
