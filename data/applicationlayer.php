<?php
	header('Accept: application/json');
	header('Content-type: application/json');
	require_once __DIR__ . '/datalayer.php';
	$action = $_POST["action"];

	switch ($action) {
		case "login":
			loginFunction();
			break;
		case "register":
			registerFunction();
			break;
		case "ask":
			askfunction();
			break;
		case "search":
			SearchFunction();
			break;
		/*case "freq":
			FriendSearch(); 
			break;*/
	}
	function SearchFunction()
	{
		$num = $_SESSION["uidnum"];

		$aux = search($num);
		echo json_encode($aux);
	}

	function loginFunction()
	{
		$uName = $_POST["username"];
		$uPassword = $_POST["upassword"];
		$remember = $_POST["rememberme"];
		$response = tryLogin($uName, $uPassword);

		if($response["status"] == "EXITO")
		{
			//$pss = decryptPassword($response["password"]);
			
			if($response["password"] === $uPassword)
			{
				if(!isset($_SESSION["firstName"]))
				{
					$otroaux = startSession($response["Name"], $response["LName"], $response["cal"], $response["weight"], $response["dweight"], $response["uidnum"]);
					//$response["status"] = $otroaux."ajad";
				}
				if($remember == "true")
				{
					startCookie($uName);
				}
			}
			else
			{
				$response["status"] = "wrongpassword";
			}

			echo json_encode($response);
		}
		else
		{
			errorHandling($response["status"]);
		}
	}

	function askfunction()
	{
		$aux = "nnnn";
		$numbersid = $_POST["sessid"];


		if(!isset($_SESSION["firstName"]))
		{
			session_id($numbersid);
			session_start();
		}

		if(isset($_SESSION["firstName"]))
		{
			echo json_encode($_SESSION);
		}
		else
		{
			echo json_encode($aux);
		}

	}

	function startSession($fName, $lName, $cal, $weight, $dweight, $uidnum)
	{
		$aux = session_start();
		$_SESSION["firstName"]=$fName;
		$_SESSION["lastName"]=$lName;
		$_SESSION["cal"]=$cal;
		$_SESSION["weight"]=$weight;
		$_SESSION["dweight"]=$dweight;
		$_SESSION["uidnum"]=$uidnum;
		return $aux;
	}

	function startCookie($uName)
	{
		setcookie("username", $uName, time() + 3600*24);
	}
?>