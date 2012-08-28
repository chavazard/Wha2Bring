<?php

class EventClass
{
    
    public function createEvent($id_user, $event_name, $description, $startDate, $endDate, $location, $privacy, $type)
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
        
        $statement = "INSERT INTO $db.Event_by_user (`id_user`, `vc_name`, `t_description`,`dt_start_date`,`dt_end_date`,`vc_location`,`vc_privacy`, `vc_type`, `id_facebook_event`)"
        . " VALUES ('$id_user', '$event_name', '$description', '$mysqlStartDate', '$mysqlEndDate', '$location', '$privacy', '$type', '0')";
        
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
            return 3; // EVENT NOT CREATED
        }
        else
        {
            $id = mysql_insert_id($con);
            mysql_close($con);
          
            $eventData['id_event'] = $id;
            $eventData['id_user'] = $id_user;
            $eventData['name'] = $event_name;
            $eventData['description'] = $description;
            $eventData['startDate'] = $startDate;
            $eventData['endDate'] = $endDate;
            
            $eventData['location'] = $location;
            $eventData['privacy'] = $privacy;
            $eventData['type'] = $type;
            
            $data[0] = "event";
            $data[1]= $eventData;
          
            return $data;
        }
    }
    
    public function updateEvent($id_event, $event_name, $description, $startDate, $endDate, $location, $privacy, $type)
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
        
        $statement = "UPDATE $db.Event_by_user SET `vc_name` = '$event_name', `t_description` = '$description',`dt_start_date` = '$mysqlStartDate',`dt_end_date` = '$mysqlEndDate',`vc_location` = '$location',`vc_privacy` = '$privacy', `vc_type` = '$type'"
        . " WHERE `id_event` = '$id_event'";
        
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
            return 5; // EVENT NOT UPDATED
        }
        else
        {
            $id = mysql_insert_id($con);
            mysql_close($con);
            
            $eventData['id_event'] = $id;
            //$eventData['id_user'] = $id_user;
            $eventData['name'] = $event_name;
            $eventData['description'] = $description;
            $eventData['startDate'] = $startDate;
            $eventData['endDate'] = $endDate;
            
            $eventData['location'] = $location;
            $eventData['privacy'] = $privacy;
           // $eventData['type'] = $type;
            
            $data[0] = "event";
            $data[1]= $eventData;
            
            return $data;
        }
    }
    
    public function getEvent($id_event)
    {
        $db = 'partymgr';
    
        $statement = "SELECT
`Event_by_user`.`dt_end_date`, `Event_by_user`.`dt_start_date`,`Event_by_user`.`id_custom_table`,`Event_by_user`.`id_facebook_event`,`Event_by_user`.`id_user`,
`Event_by_user`.`t_description`,`Event_by_user`.`vc_location`,`Event_by_user`.`vc_name`,`Event_by_user`.`vc_privacy`,`Event_by_user`.`vc_type`
FROM `partymgr`.`Event_by_user` WHERE `Event_by_user`.`id_event` = '$id_event'";
        
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
            
            return 12; // ERROR EVENT SELECT
        }
        
        if($row = mysql_fetch_array($result))
        {
             $id = mysql_insert_id($con);
            mysql_close($con);
            
            $eventData['id_event'] = $id;
            $eventData['id_user'] = $row['id_user'];
            $eventData['name'] = $row['vc_name'];
            $eventData['description'] = $row['t_description'];
            $eventData['startDate'] = $row['dt_start_date'];
            $eventData['endDate'] = $row['dt_end_date'];
            
            $eventData['location'] = $row['vc_location'];
            $eventData['privacy'] = $row['vc_privacy'];
            $eventData['type'] = $row['vc_type'];
            
            $data[0] = "event";
            $data[1]= $eventData;
            
            return $data;
            
            mysql_close($con);
            return $data;
        }
        else
        {
            mysql_close($con);
            return 9; // ERROR EVENT NOT FOUND
        }   
    }
    
}

?>