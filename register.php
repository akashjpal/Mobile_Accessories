<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];

$firstname=filter_input(INPUT_POST,'firstname');
$lastname=filter_input(INPUT_POST,'lastname');
$email=filter_input(INPUT_POST,'email');
$phone=filter_input(INPUT_POST,'phone');
$password=filter_input(INPUT_POST,'password');
$conn = mysqli_connect('localhost','root','','webps');
if($conn->connect_error){
    echo "$conn->connect_error";
    die("Connection Failed : ". $conn->connect_error);
}else {
    $stmt = $conn->prepare("insert into registration(firstname, lastname, email, phone, password ) values(?, ?, ?, ?, ?)");
    $stmt->bind_param("sssis", $firstname, $lastname, $email, $phone, $password);
    $execval = $stmt->execute();
    echo $execval;
    echo "Registration successfully...";
    $stmt->close();
    $conn->close();
}
/*
$firstname=filter_input(INPUT_POST,'firstname');
$lastname=filter_input(INPUT_POST,'lastname');
$email=filter_input(INPUT_POST,'email');
$phone=filter_input(INPUT_POST,'phone');
$password=filter_input(INPUT_POST,'password');

    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "root";
    $dbname = "webps";
    // Create connection
    $conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);
    if (mysqli_connect_error()){
    die('Connect Error ('. mysqli_connect_errno() .') '
    . mysqli_connect_error());
    }
    else{
    $sql = "INSERT INTO registration (firstname, lastname, email, phone, password )values ('$firstname', '$lastname', '$email',' $phone', '$password')";
    if ($conn->query($sql)){
    echo "New record is inserted sucessfully";
    }
    else{
    echo "Error: ". $sql ."
    ". $conn->error;
    }
    $conn->close();
    }
   */
?>