<?php

class UserClass
{   
    public function test()
    {
        $con = mysql_connect("mysql.imervich.com", "partyadmin","PaRTy12");
        
        if(!$con)
        {
            die('No hay conexion: ' . mysql_error());
            return "ERROR EN CONEXION";
        }
        
        return "Conexion exitosa";
        mysql_close($con);
    }
    
    /**
     * Creates a new user
     * 
     * 
     */
    public function loginUser($facebook_id)
    {
        $db = 'partymgr';
    
        $statement = "SELECT `User`.`c_gender`, `User`.`id_user`, `User`.`vc_email`, `User`.`vc_first_name`, `User`.`vc_last_name`, `User`.`vc_location` FROM `$db`.`User`".
        " WHERE `User`.`id_facebook` = $facebook_id";
        
        $con = mysql_connect("mysql.imervich.com", "partyadmin","PaRTy12");
        
        if(!$con)
        {
            die('No hay conexion: ' . mysql_error());
            return 50; // ERROR NO DB CONNECTION
        }
        
        if(!mysql_select_db($db, $con))
        {
            die('No se pudo acceder a la base de datos: ' . mysql_error());
            return 51; // ERROR NO DB SELECTED
        }
        
        $result = mysql_query($statement);
        
        if(!$result)
        {
            mysql_close($con);
            die('No se pudo hacer el query: ' . mysql_error());
            return 10; // ERROR USER SELECT
        }
        
        if($row = mysql_fetch_array($result))
        {
            $userData['gender'] = $row['c_gender'];
            $userData['id_user'] = $row['id_user'];
            $userData['email'] = $row['vc_email'];
            $userData['first_name'] = $row['vc_first_name'];
            $userData['last_name'] = $row['vc_last_name'];
            $userData['location'] = $row['vc_location'];
            $data[0] = "user";
            $data[1]= $userData;
            
            mysql_close($con);
            return $data;
        }
        else
        {
            mysql_close($con);
            return 1; // ERROR USER NOT FOUND
        }   
    }
    
     
    /**
     * Creates a new user
     * 
     * 
     */
    public function createNewUser($gender,$facebook_id,$first_name,$last_name, $location, $email)
    {
        $db = 'partymgr';
        
        $statement = "INSERT INTO $db.User (`c_gender`, `id_facebook`,`vc_first_name`,`vc_last_name`,`vc_location`,`vc_email`)"
        . " VALUES ('$gender', '$facebook_id', '$first_name', '$last_name', '$location', '$email')";
        
        $con = mysql_connect("mysql.imervich.com", "partyadmin","PaRTy12");
        
        if(!$con)
        {
            die('No hay conexion: ' . mysql_error());
            return 50; // ERROR NO DB CONNECTION
        }
        
        if(!mysql_select_db($db, $con))
        {
            die('No se pudo acceder a la base de datos: ' . mysql_error());
            return 51; // ERROR NO DB SELECTED
        }
        
        $result = mysql_query($statement);
        
        if(!$result)
        {
            die('No se pudo hacer el query: ' . mysql_error());
            mysql_close($con);
            return 2; // USER NOT CREATED
        }
        else
        {
            mysql_close($con);
            return UserClass::loginUser($facebook_id);
        }
    }
    
}

?>