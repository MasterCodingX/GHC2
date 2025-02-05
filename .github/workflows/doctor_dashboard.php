<?php
include 'config.php';
session_start();
if ($_SESSION['role'] !== "doctor") {
    header("Location: login.php");
}

$result = $conn->query("SELECT p.name, t.blood_sugar1, t.blood_sugar2, t.blood_sugar3, t.blood_sugar4 FROM patients p
    JOIN treatments t ON p.id = t.patient_id");
?>

<h2>Doctor Dashboard</h2>
<a href="logout.php">Logout</a>

<h3>Blood Sugar Levels</h3>
<ul>
<?php while ($row = $result->fetch_assoc()) { ?>
    <li><?= $row['name'] ?>: <?= $row['blood_sugar1'] ?>, <?= $row['blood_sugar2'] ?>, <?= $row['blood_sugar3'] ?>, <?= $row['blood_sugar4'] ?></li>
<?php } ?>
</ul>