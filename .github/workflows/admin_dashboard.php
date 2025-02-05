<?php
include 'config.php';
session_start();
if ($_SESSION['role'] !== "admin") {
    header("Location: login.php");
}

$result = $conn->query("SELECT * FROM patients");
?>

<h2>Admin Dashboard</h2>
<a href="logout.php">Logout</a>

<h3>All Patients</h3>
<ul>
<?php while ($row = $result->fetch_assoc()) { ?>
    <li>
        <img src="<?= $row['photo'] ?>" width="50">
        <?= $row['name'] ?> (<?= $row['age'] ?>, <?= $row['gender'] ?>) - 
        <a href="view_treatment.php?patient_id=<?= $row['id'] ?>">View Treatment</a>
    </li>
<?php } ?>
</ul>