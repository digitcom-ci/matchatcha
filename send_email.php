<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du formulaire
    $firstName = htmlspecialchars($_POST["firstName"]);
    $lastName = htmlspecialchars($_POST["lastName"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST["phone"]);
    $city = htmlspecialchars($_POST["city"]);
    $address = htmlspecialchars($_POST["address"]);
    $deliveryFee = htmlspecialchars($_POST["deliveryFee"]);

    // Récupérer le panier de l'utilisateur (localStorage converti en tableau JSON côté client)
    $cartItems = json_decode($_POST["cartItems"], true);

    // Construire le contenu de l'e-mail
    $subject = "Nouvelle commande de $firstName $lastName";
    $to = "dd.somanager@gmail.com";

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

    // Entêtes de l'e-mail
    $headers = "From: no-reply@tonsite.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Envoi de l'e-mail
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Commande envoyée avec succès !"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Une erreur s'est produite lors de l'envoi de l'e-mail."]);
    }
    exit;
}
?>
