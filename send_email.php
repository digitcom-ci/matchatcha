<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstName = htmlspecialchars($_POST["firstName"]);
    $lastName = htmlspecialchars($_POST["lastName"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $city = htmlspecialchars($_POST["city"]);
    $address = htmlspecialchars($_POST["address"]);
    $deliveryFee = htmlspecialchars($_POST["deliveryFee"]);

    // Configuration de l'email
    $to = "dd.somanager@gmail.com";
    $subject = "Nouvelle commande de $firstName $lastName";
    $message = "
        <h2>Nouvelle commande reçue</h2>
        <p><strong>Nom :</strong> $firstName $lastName</p>
        <p><strong>Email :</strong> $email</p>
        <p><strong>Téléphone :</strong> $phone</p>
        <p><strong>Ville :</strong> $city</p>
        <p><strong>Adresse :</strong> $address</p>
        <p><strong>Frais de livraison :</strong> $deliveryFee FCFA</p>
    ";
    $headers = [
        "MIME-Version: 1.0",
        "Content-type: text/html; charset=utf-8",
        "From: noreply@votredomaine.com",
        "Reply-To: $email"
    ];

    // Envoyer l'email
    if (mail($to, $subject, $message, implode("\r\n", $headers))) {
        echo json_encode(["status" => "success", "message" => "Email envoyé avec succès."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi de l'email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
