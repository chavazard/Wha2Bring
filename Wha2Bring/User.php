<?php
require_once  'ElementClass.php';
require_once  'LevelClass.php';
require_once  'SceneClass.php';
require_once  'TaskClass.php';
require_once  'DepotClass.php';


// NO BORRAR HAY FALLAS EN PRODUCCIÓN SI SE ELIMINA
require_once 'classes/ECController.php';
require_once 'classes/Error.php';
require_once 'classes/Database.php';
require_once 'classes/Session.php';

/**
 * Class used to manage, storage and create user related information.
 *
 * @author Carlos Morales ( carlos.morales@playfulplay.com )
 */
class UserClass extends ECController {

  /**
   * Method to create a new user from the given information.
   *
   * @author Carlos Morales ( carlos.morales@playfulplay.com )
   * @param  array with the user information, containing the following fields:
   *  `facebook_id`
   *  `user_reference` (optional),
   *  `gender`,
   *  `username`,
   *  `email`,
   *  `password` (optional),
   *  `location`,
   *  `birth`,
   *  `service_type` (optional)
   *
   * @return int 0 if ok, ErrorCode on error,.
   */
  public function createNewUser ( $userinfo = array() )
  {
    $friend_id= 1;
    $field_list = array();
    $field_data = array();
	
    if(!is_array($userinfo)) {
      return Error::load( Error::User_create_user_options_missing );
    }else if(count($userinfo) == 1 && array_key_exists(0, $userinfo)){
      $userinfo = $userinfo[0];
    }

    if( !array_key_exists( 'facebook_id', $userinfo ) ||
    !array_key_exists( 'gender', $userinfo ) ||
    !array_key_exists( 'username', $userinfo ) ||
    !array_key_exists( 'email', $userinfo ) ||
    !array_key_exists( 'location', $userinfo ) ||
    !array_key_exists( 'birth', $userinfo ) ) {

      return Error::load( Error::User_create_params_incomplete, $userinfo );
    }

    foreach ( $userinfo as $key => $value ) {

      switch ( $key ) {

        case 'facebook_id':

          $fbid = $value;
          if(!is_numeric($fbid)) {
            return Error::load( Error::User_create_malformed_options );
          }
          $field_list[] = '`id_facebook`';
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'user_reference':
          $field_list[] = '`id_user_reference`';
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'gender':

          $field_list[] = '`c_gender`';
          if(strtolower($value) != 'm' and strtolower($value) != 'f') {
            return Error::load( Error::User_create_malformed_options );
          }
          $field_data[] = '"'. strtoupper(htmlspecialchars($value)) . '"';
          break;

        case 'username':

          $field_list[] = '`vc_name`';
          if(!is_string($value)){
            return Error::load( Error::User_create_malformed_options );
          }
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'email':

          $field_list[] = '`vc_email`';
          if(!is_string($value)) {
            return Error::load( Error::User_create_malformed_options );
          }
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'password':

          $field_list[] = '`vc_password`';
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'location':

          $field_list[] = '`vc_location`';
          if(!is_string($value)) {
            return Error::load( Error::User_create_malformed_options );
          }
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        case 'birth':

          $field_list[] = '`d_birth`';
          if(!is_string($value)) {
            return Error::load( Error::User_create_malformed_options );
          }
          $field_data[] = '"'. date('Y/m/d', strtotime($value)) . '"';
          break;

        case 'service_type':

          $field_list[] = '`i_service_type`';
          $field_data[] = '"'. htmlspecialchars($value) . '"';
          break;

        default:

          return Error::load( Error::User_create_malformed_options );
      }
    }

    if(defined('GEOIP_COUNTRY_EDITION')){
      geoip_db_filename( GEOIP_COUNTRY_EDITION );
      if (geoip_db_avail( GEOIP_COUNTRY_EDITION ) ) {
  
        $domain = $_SERVER['REMOTE_ADDR'];
  
        $country = geoip_country_code_by_name( $domain );
  
  
        if ( $country ) {
          $field_list[] = '`vc_country`';
          $field_data[] = '"'. $country . '"';
        }
      }
    }

    $statement = array();
    $statement[0] = 'INSERT INTO `user` ('. implode(',' ,$field_list) .', `dt_creation` ) '.
                      'VALUES (' . implode(',' , $field_data ) . ', "' . date('c') . '")';

    $statement[1] = 'INSERT INTO `user_data` (`id_user`,`id_scene`,`id_guild`,`id_level`, `i_savings`, `i_imagination`) '.
                      'VALUES ( :userId, 1,NULL,1,0,0)';

    $statement[2] = 'INSERT `friendship`(`id_user`,`id_friend`,`dt_date`) VALUES';
    $statement[2] .=' ( :userId,'. $friend_id .', "'. date('c') .'"),';
    $statement[2] .=' ('. $friend_id .', :userId, "'. date('c') .'")';
    $statement[3] = '
        INSERT INTO `depot` (`id_user`,`id_category`,`id_table`,`i_amount`) VALUES
          (:userId, 26, 220, 1),
          (:userId, 27, 251, 1),
          (:userId, 28,   1, 1),
          (:userId, 31,  28, 1),
          (:userId, 31,  29, 1),
          (:userId, 44, 299, 1),
          (:userId, 46, 298, 1),
          (:userId, 47, 297, 1)';
    $statement[4] = 'INSERT INTO `avatar_home` (`id_user`,`id_expansion`,`id_item`,`i_pivot`,`i_pos_x`,`i_pos_y`,`vc_area`,`i_rotation`) VALUES
        (:userId,0,251,0,0,0, "floorSkin",0),
        (:userId,0,220,0,0,0, "wallSkin",0),
        (:userId,0,1,0,4,3,   "right",1),
        (:userId,0,29,0,15,3, "floor",1),
        (:userId,0,28,0,16,3, "floor",1),
        (:userId,0,298,1,17,2,"floor",1),
        (:userId,0,297,0,19,2,"front",1),
        (:userId,0,299,0,22,2,"floor",1)';

    try {

      //      $db = new Database('w');
      $db = dbconn('w');

    } catch ( PDOException $e ) {

      return Error::load( Database::getCustomErrorCode( $e->getMessage() ) );
    }

    $db->beginTransaction();

    $arr_user = null;
    foreach($statement as $sql){
      $prep_user = $db->prepare( $sql );

      if ( !$prep_user->execute($arr_user) ) {

        $db->rollBack();

        unset( $db );

        return Error::load( Error::User_data_not_writen , array($sql, $arr_user));
      }
      if(is_null($arr_user)){
        $arr_user = array (':userId' => $db->lastInsertId());
      }
    }


    $db->commit();

    unset( $db, $depot );

    $arr_return =    $this->login( $fbid );
    return $arr_return;



  }

  /**
   * Method which will let the user login a new session.
   *
   * @author Carlos Morales ( carlos.morales@playfulplay.com )
   * @param long $id is the facebook Id for the requested user
   * @return array with the users data including with error field set on error.
   */
  public function login( $id = 0, $db = null)
  {
    if(!is_numeric($id)){

      return Error::load(Error::User_not_found);
    }
    $arr_result = array();
    $fetch = null;

    if ( !false ) {

      // TODO add memcached validation //

      $sql = 'SELECT `user`.`id_user`, `user`.`vc_email` as `email`, `user`.`b_avatar_gender` as `avatar_gender`, `user`.`vc_name`,unix_timestamp(`user`.`dt_creation`) as `dt_creation`,  `user_data`.`id_user_data` ,  `user_data`.`vc_username` as `username`, `user_data`.`i_tut_step` as `tutorial`,`user_data`.`i_energy` ,';
      $sql .= ' `user_data`.`i_coin` , `user_data`.`i_savings` ,  `user_data`.`id_level` ,  `user_data`.`i_xp` , `user_data`.`i_imagination` ,  `user_data`.`i_premium` ,  `user_data`.`i_total_energy` ,  `user_data`.`i_total_imagination` ,';
      $sql .= ' `user_data`.`i_next_xp`, `user_data`.`dt_last_session`, `user_data`.`i_config_music`, `user_data`.`i_config_fx`, `user_data`.`dt_last_energy_update`,`user_data`.`dt_dailysession` , `user_data`.`i_count_session`';
      $sql .= ' FROM `user` LEFT JOIN `user_data` ON  `user`.`id_user` =  `user_data`.`id_user`';
      $sql .= ' WHERE  `user`.`id_facebook` =' . htmlspecialchars($id);
      $sql .= ' LIMIT 0 , 1';

      //TODO save `user`.`id_user` ,  `user`.`vc_name` ,  `user_data`.`id_user_data` values on memcache with $id as key

    } else {

      $sql = 'SELECT  `user_data`.`vc_username`, `user_data`.`i_tut_step` as `tutorial`, `i_energy` ,  `i_coin` ,  `id_level` , `i_xp` , `i_imagination` , `i_premium` , `i_total_energy` , `i_total_imagination` , `i_next_xp` , `dt_last_session` '.
                   'FROM  `user_data` WHERE  `id_user_data` = ' . intval($key['id_user_data']);
    }

    try {
      $dbw = dbconn('w');
    } catch( PDOException $e ) {
      return Error::load(Database::getCustomErrorCode( $e->getMessage() ));
    }

    $fetch = $dbw->query( $sql, true, true );

    if(!is_array($fetch)){
      $arr_result = Error::load(Error::User_not_found );
    } else
    {
      $GLOBALS['user_id'] = $fetch['id_user'];
      if(array_key_exists('dt_last_energy_update', $fetch)) {
        $fetch['dt_last_energy_update'] = strtotime($fetch['dt_last_energy_update']);
      }
      if($fetch['id_level'] > 1){
        $level = new LevelClass();
        $currLevel = $level->getLevelReq($fetch['id_level'],$dbw);
        if($currLevel['type']=='level'){
          $fetch['required_xp'] = $currLevel['data']['i_xp_required'];
        }else{
          //on error return the error code to the frontend.
          return $currLevel;
        }
      }

      if( intval($fetch['avatar_gender']) < 0){
        $fetch['avatar_gender'] = 'f';
      }else if(intval($fetch['avatar_gender'] > 0)){
        $fetch['avatar_gender'] = 'm';
      }else{
        $fetch['avatar_gender'] = '';
      }

      $fetch['dt_dailysession'] = $fetch['dt_dailysession'];
      $fetch['i_count_session'] = (int) $fetch['i_count_session'];
      $fetch['has_reward'] = $this->updateLastSession($fetch['id_user_data'], $fetch['i_savings'],strtotime($fetch['dt_dailysession']), $fetch['i_count_session'], $dbw);

      if(is_array($fetch['has_reward'])){
        foreach($fetch['has_reward'] as $key => $value){
          if(strcmp($key, 'savings') != 0 && strcmp($key,'debug') != 0){
            $fetch['i_'. $key] = $fetch['i_'. $key] + $value;
          } else if(strcmp($key, 'savings') == 0){
            $fetch['i_'. $key] = $value;
          } else {
            $fetch[$key] = $value;
          }
        }

        $fetch['has_reward'] = true;
      }

      // Session stuff 
      $GLOBALS['user_id'] = $fetch['id_user'];
      $session = new Session( true );
      $session->setUserId( $fetch['id_user'] );
      $session->registerSession();

      $arr_result['type'] = 'user';
      $arr_result['data'] = $fetch;
      $arr_result['date'] = (int) date('U');

    }

    return $arr_result;
  }

  }
