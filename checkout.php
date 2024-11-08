<?php
session_start();
$totalAmount = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Calculer le total depuis les articles du panier
    foreach ($_POST['cart'] as $item) {
        $totalAmount += $item['price'];
    }

    // Redirige vers PayPal
    header("Location: https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-email@example.com&item_name=Matcha Purchase&amount=$totalAmount&currency_code=FCFA&return=http://yourwebsite.com/success.php&cancel_return=http://yourwebsite.com/cancel.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Procéder au paiement</title>
</head>
<body>
    <h2>Total à payer : <?php echo $totalAmount; ?> FCFA</h2>
    <form method="POST">
        <input type="hidden" name="totalAmount" value="<?php echo $totalAmount; ?>">
        <button type="submit">Payer avec PayPal</button>
    </form>
</body>
</html>
