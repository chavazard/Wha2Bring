<?php

class CommentClass
{
    public function createComment($id_event, $id_user_friend, $comment)
    {
         $db = 'partymgr';
        
        $statement = "INSERT INTO $db.Event_comment (`id_event`, `id_facebook`, `t_comment`)"
        . " VALUES ('$id_event', '$id_user_friend', '$comment')";
        
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
            return 4; // ERROR COMMENT NOT CREATED
        }
        else
        {
            $id = mysql_insert_id($con);
            mysql_close($con);
            
            $commentData['id_comment'] = $id;
            $commentData['id_event'] = $id_event;
            $commentData['id_facebook'] = $id_user_friend;
            $commentData['t_comment'] = $comment;
            
            $data[0] = "comment";
            $data[1]= $commentData;
          
            return $data; 
        }
    }
    
    
    /* Select Comments */
    
    
     public function displayComments($id_event)
    {
        $db = 'partymgr';
    
        $statement = "SELECT `Event_comment`.`t_comment`, `Event_comment`.`id_facebook` FROM `$db`.`Event_comment`".
        " WHERE `Event_comment`.`id_event` = '$id_event'".
        "ORDER BY `Event_comment`.`id_comment` ASC";
        
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
            return 8; // COMMENTS_NOT_FOUND
        }
        
        if($row = mysql_fetch_array($result))
        {
            $i = -1;
            while($row = mysql_fetch_array($result)){
            	$commentData['id_facebook'] = $row['id_facebook'];
                $commentData['t_comment'] = $row['t_comment'];
                
                $comments[++$i] = $commentData;
            }
            
            mysql_close($con);
            
            
            
            $data[0] = "comments";
            $data[1]= $comments;
          
            return $data; 
        }
        else
        {
            mysql_close($con);
            return 1; // ERROR USER NOT FOUND
        }   
    }
    
}


?>