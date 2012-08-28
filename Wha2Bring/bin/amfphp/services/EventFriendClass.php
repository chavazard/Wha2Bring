<?php

class EventFriendClass
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
     * Creates a new 
     * 
     * 
     */
    public function selectFriends($id_event) //Puede cambiar el nombre
    {
        $db = 'partymgr';
    
        $statement = "SELECT  `Event_friend`.`id_event`, `Event_friend`.`id_user_friend`, `Event_friend`.`id_item`, `Event_friend`.`d_amount`, `Event_friend`.`b_confirmed` FROM `$db`.`Event_friend`".
        " WHERE `Event_by_user`.`id_event` = $id_event";
        
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
            return 11; // ERROR SELECT EVENT FRIEND
        }
        
        if($row = mysql_fetch_array($result))
        {
            $eventbyfriendData['id_event'] = $row['id_event'];
            $eventbyfriendData['id_user_friend'] = $row['id_user_friend'];
            $eventbyfriendData['id_item'] = $row['id_item'];
            $eventbyfriendData['d_amount'] = $row['d_amount'];
            $eventbyfriendData['b_confirmed'] = $row['b_confirmed'];
            $data[0] = "eventbyfriend";
            $data[1]= $eventbyfriendData;
            
            mysql_close($con);
            return $data;
        }
        else
        {
            mysql_close($con);
            return 1;
        }   
    }
    
     
    /**
     * Creates a new event friend
     * 
     * 
     */
    public function createNewEventfriend( $id_user_friend, $id_event, $id_item, $amount, $confirm )  //$gender,$facebook_id,$first_name,$last_name, $location, $email)
    {
        $db = 'partymgr';
        
        
        $statement = "INSERT INTO $db.Event_friend ( `id_event` , `id_user_friend`,`id_item`,`d_amount`,`b_confirmed`)"
        			. "VALUES ('$id_event','$id_user_friend', '$id_item', '$amount', $confirm)";

        
        //return $statement;
        
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
            return 6; // EVENT NOT CREATED
        }
        else
        {
            $id = mysql_insert_id($con);
            mysql_close($con);
            
            $eventData['id_event_friend'] = $id;
            $eventData['id_user_friend'] = $id_user_friend;
            $eventData['id_item'] = $id_item;
            $eventData['d_amount'] = $amount;
            $eventData['b_confirmed'] = $confirm;
            
            $data[0] = "event_friend";
            $data[1] = $eventData;
          
            return $data;
        }
    }
    
    public function updateEventFriendItem($id_user_friend, $id_event, $id_item, $amount, $confirmed)
    {
         $db = 'partymgr';
        
        $mysqlStartDate = date('Y-m-d H:i:s', $startDate);
        
        if (isset($endDate)) {
            $mysqlEndDate = date('Y-m-d H:i:s', $endDate);
        }
        else
        {
            $endDate = NULL;
            $mysqlEndDate = NULL;
        }
        
        if (!isset($location)) {
            $location = NULL;
        }
        
        //$phpdate = strtotime( $mysqldate );
        
        $statement = "UPDATE $db.Event_friend SET `id_item` = '$id_item', `d_amount` = '$amount',`b_confirmed` = $confirmed"
        . " WHERE `id_event` = '$id_event' AND `id_user_friend` = '$id_user_friend'";
        
        return $statement;
        
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
        
        //$result = mysql_query($statement);
        
        if(!$result)
        {
            die('No se pudo hacer el query: ' . mysql_error());
            mysql_close($con);
            return 3; // EVENT NOT UPDATED
        }
        else
        {
            $id = mysql_insert_id($con);
            mysql_close($con);
            
            $eventData['id_event'] = $id_event;
            
            $id = mysql_insert_id($con);
            mysql_close($con);
            
            $eventData['id_event_friend'] = $id;
            $eventData['id_user_friend'] = $id_user_friend;
            $eventData['id_item'] = $id_item;
            $eventData['d_amount'] = $amount;
            $eventData['b_confirmed'] = $confirm;
            
            $data[0] = "event_friend";
            $data[1] = $eventData;
          
            return $data;
        }
    }
    
}

?>