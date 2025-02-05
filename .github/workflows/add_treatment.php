<?php
include 'config.php';
session_start();

if ($_SESSION['role'] !== "admin") {
    header("Location: login.php");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patient_id = $_POST['patient_id'];
    $bp = $_POST['blood_pressure'];
    $dose1 = $_POST['infusion_dose1'];
    $dose2 = $_POST['infusion_dose2'];
    $dose3 = $_POST['infusion_dose3'];
    $sugar1 = $_POST['blood_sugar1'];
    $sugar2 = $_POST['blood_sugar2'];
    $sugar3 = $_POST['blood_sugar3'];
    $sugar4 = $_POST['blood_sugar4'];
    $recorded_by = $_SESSION['user_id'];

    $sql = "INSERT INTO treatments (patient_id, blood_pressure, infusion_dose1, infusion_dose2, infusion_dose3, blood_sugar1, blood_sugar2, blood_sugar3, blood_sugar4, recorded_by)
            VALUES ('$patient_id', '$bp', '$dose1', '$dose2', '$dose3', '$sugar1', '$sugar2', '$sugar3', '$sugar4', '$recorded_by')";

    if ($conn->query($sql) === TRUE) {
        echo "Treatment added!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>