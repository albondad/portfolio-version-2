<?php

if isset($_POST['submit'])) {
    $email = $_POST['name'];
    //$subject = $_POST['name'];
    //$message = $_POST['name'];
    $subject = "testetstestadsfasdf"
    $message = "testetstestadsfasdf"
    $mailTo = "contact@albondad.com";

    mail($maleTo, $subject, $message);
    echo "test";
}
