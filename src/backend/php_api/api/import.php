<?php
//Visit this script in your browser (e.g., https://yourdomain.com/api/import.php)
//Upload your CSV file using the form
//The script will process and import the data into your subscribers table

require_once __DIR__ . '/../config/db.php';

// Handle file upload via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csv'])) {
    $fileTmpPath = $_FILES['csv']['tmp_name'];
    $fileName = $_FILES['csv']['name'];

    // Check file extension
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if ($fileExtension !== 'csv') {
        echo "Please upload a valid CSV file.";
        exit();
    }

    if (($handle = fopen($fileTmpPath, 'r')) !== false) {
        // Skip header row
        fgetcsv($handle);

        $inserted = 0;
        $skipped = 0;
        while (($row = fgetcsv($handle)) !== false) {
            // CSV columns: first_name, last_name, city, email
            $firstName = trim($row[0]);
            $lastName  = trim($row[1]);
            $city      = trim($row[2]);
            $email     = trim($row[3]);

            // Basic validation
            if (!$firstName || !$lastName || !$city || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                continue;
            }

            try {
                // Check if subscriber already exists using a case-insensitive, trimmed match
                $checkStmt = $pdo->prepare("SELECT id FROM subscribers WHERE LOWER(TRIM(first_name)) = LOWER(:first_name) AND LOWER(TRIM(last_name)) = LOWER(:last_name) AND LOWER(TRIM(email)) = LOWER(:email)");
                $checkStmt->bindParam(':first_name', $firstName);
                $checkStmt->bindParam(':last_name', $lastName);
                $checkStmt->bindParam(':email', $email);
                $checkStmt->execute();

                // If a record is found, skip the insertion
                if ($checkStmt->fetchColumn()) {
                    $skipped++;
                    continue;
                }

                // If no existing record is found, insert a new one
                $insertStmt = $pdo->prepare("INSERT INTO subscribers (first_name, last_name, city, email) VALUES (:first_name, :last_name, :city, :email)");
                $insertStmt->bindParam(':first_name', $firstName);
                $insertStmt->bindParam(':last_name', $lastName);
                $insertStmt->bindParam(':city', $city);
                $insertStmt->bindParam(':email', $email);
                $insertStmt->execute();
                $inserted++;
            } catch (\PDOException $e) {
                error_log("Error processing row: " . $e->getMessage());
            }
        }
        fclose($handle);
        echo "Import complete. **$inserted** rows inserted, **$skipped** rows skipped.<br>";
    } else {
        echo "Could not open uploaded CSV file.<br>";
    }
} else {
    // Show upload form
    ?>
    <form method="post" enctype="multipart/form-data">
        <label for="csv">Upload CSV file:</label>
        <input type="file" name="csv" id="csv" accept=".csv" required>
        <button type="submit">Import</button>
    </form>
    <?php
}
?>