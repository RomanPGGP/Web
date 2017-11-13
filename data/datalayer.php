<?php
	header('Content-type: application/json');
	function connectiondb()
	{
		$servername = "localhost";
		$dbname = "hawdb";
		$username = "root";
		$password = "root";
		$port = 8889;

		$connection = new mysqli($servername, $username, $password, $dbname, $port);

		if($connection->connect_error)
		{
			return null;
		}
		else
		{
			return $connection;
		}
	}

	function search($uidnum)
	{
		$connection = connectiondb();

		if($connection != null)
		{
			$sql = "SELECT * FROM friends WHERE fuidnum='$uidnum'";
			$result = $connection->query($sql);

			if($result->num_rows > 0)
			{
				$response = array('status' => "EXITO");
				while ($row = $result->fetch_assoc())
				{
					$response2 = array("numero" => $row["suidnum"]);
					array_push($response, $response2);
				}

				$connection->close();
				return $response;
			}
			else
			{
				return array('status' => "500" );
			}
		}
		else
		{
			return array('status' => "500" );
		}
	}
	function registerFunction(){

		$connection = connectiondb();
		$uidnum = $_POST["useridnumber"];
		$Name = $_POST["name"];
		$LName = $_POST["lastname"];
		$uName = $_POST["username"];
		$psswrd = $_POST["psswrd"];
		$gender = $_POST["gender"];
		//ENCRYPTION
		
		//$passwrd = encryptPassword($psswrd);

		if($connection != null)
		{
			$sql = "INSERT INTO users(uidnum, Name, LName, Username, Psswrd, Gender) VALUES ('$uidnum', '$Name', '$LName', '$uName', '$psswrd', '$gender')";
			$result = $connection->query($sql);

			if($result)
			{
				$response = array("status" => "EXITO");
			}
			else
			{
				$response = array("status"=>"500");
			}

			$connection->close();
			echo json_encode($response);
		}
		else
		{
			$connection->close();
			return array('status' => "500");
		}
		
	}
	
	function trylogin($uname, $upassword){
		$connection = connectiondb();
		$debug = "default";
		if($connection != null)
		{
			$sql = "SELECT * FROM users WHERE Username = '$uname'";
			$result = $connection->query($sql);

			if($result->num_rows == 1)
			{
				while($row = $result->fetch_assoc())
				{
					$password = $row["Psswrd"];
					$response = array('status' => "EXITO", "Name" => $row["Name"], "LName" => $row["LName"], 
									"cal" => $row["kCal"], "weight" => $row["Weight"], "dweight" => $row["DWeight"], 
									"password" => $password);
				}	
			}
			else
			{
				$response = array('status' =>"406");
			}
		}
		else
		{
			$response = array('status' => "500");
		}

		$connection->close();
		return $response;
	} 

	function encryptPassword()
	{
		$userPassword = $_POST['userPassword'];

	    $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $key_size =  strlen($key);
	    
	    $plaintext = $userPassword;

	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	    
	    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	    $ciphertext = $iv . $ciphertext;
	    
	    $userPassword = base64_encode($ciphertext);

	    return $userPassword;
	}

	function decryptPassword($password)
	{
		$key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    
	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    	
	    $ciphertext_dec = base64_decode($password);
	    $iv_dec = substr($ciphertext_dec, 0, $iv_size);
	    $ciphertext_dec = substr($ciphertext_dec, $iv_size);

	    $password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
	   	
	   	
	   	$count = 0;
	   	$length = strlen($password);

	    for ($i = $length - 1; $i >= 0; $i --)
	    {
	    	if (ord($password{$i}) === 0)
	    	{
	    		$count ++;
	    	}
	    } 

	    $password = substr($password, 0,  $length - $count); 

	    return $password;
	}


	function errorHandling($errorStatus)
	{
		switch ($errorStatus) {
				case "406":
					header('HTTP/1.1 406 User not Found');
					die("Wrong credentials! ");
					break;
				case "500":
					header('HTTP/1.1 500 Bad connection to DB');
					die("Ther server is out");
			}
	}



?>