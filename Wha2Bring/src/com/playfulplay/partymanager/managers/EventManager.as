package com.playfulplay.partymanager.managers 
{
	import com.carlcalderon.arthropod.Debug;
	import com.playfulplay.partymanager.data.User;
	/**
	 * ...
	 * @author Iván Mervich
	 */
	public class EventManager 
	{
		private const USER_CREATED:int = 0;
		private const ERROR_USER_NOT_FOUND:int = 1;
		private const ERROR_USER_NOT_CREATED:int = 2;
		private const ERROR_EVENT_NOT_CREATED:int = 3;
		private const ERROR_COMMENT_NOT_CREATED:int = 4;
		
		private const ERROR_EVENT_NOT_UPDATED:int = 5;
		
		private const ERROR_EVENT_FRIEND_NOT_CREATED:int = 6;
		private const ERROR_EVENT_FRIEND_NOT_UPDATED:int = 7;
		
		private const ERROR_EVENT_COMMENTS_NOT_FOUND:int = 8;
		
		private const ERROR_EVENT_NOT_FOUND:int = 9;
		
		private const ERROR_USER_SELECT:int = 10;
		private const ERROR_EVENT_FRIEND_SELECT:int = 11;
		
		private const ERROR_EVENT_SELECT:int = 12;
		
		private const ERROR_NO_DB_CONNECTION:int = 50;
		private const ERROR_NO_DB_SELECTED:int = 51;
		
		////////////////////////////////////////
		private var gameManager:GameManager;
		private var user:User;
		
		public function EventManager(gameManager:GameManager) 
		{
			this.gameManager = gameManager;
			this.user = this.gameManager.user;
		}
		
		/**
		 * 
		 * @param	data
		 */
		public function resultHandler(data:*):void
		{
			if (data is int) // ERROR
				errorHandler(data);
			else
			{
				Debug.log("Datos de usuario");
				Debug.object(data);
				Debug.log("DATA[0] = " + data[0]);
				Debug.object("objeto: " + data[1]);
				
				switch (data[0]) 
				{
					case "user":
						user.idUser = int(data[1].id_user);
						Debug.log("--------- ID USER:"  + user.idUser);
						user.gender  = data[1].gender;
						user.email = data[1].email;
						user.first_name = data[1].first_name;
						user.last_name = data[1].last_name;
						user.location = data[1].location;
						break;
					case "event":
						//$eventData['id_event'] = $id;
						//$eventData['id_user'] = $id_user;
						//$eventData['name'] = $event_name;
						//$eventData['description'] = $description;
						//$eventData['startDate'] = $startDate;
						//$eventData['endDate'] = $endDate;
						//
						//$eventData['location'] = $location;
						//$eventData['privacy'] = $privacy;
						//$eventData['type'] = $type;
						break;
					case "event_friend":
						//$eventData['id_event_friend'] = $id;
						//$eventData['id_user_friend'] = $id_user_friend;
						//$eventData['id_item'] = $id_item;
						//$eventData['d_amount'] = $amount;
						//$eventData['b_confirmed'] = $confirm;
						break;
					case "comments":
						//$data[0] = "comments";
						//$data[1]= $comments;
						break;
				}
			}
		}
		
		private function errorHandler(error:int):void 
		{
			switch (error) 
			{
				case USER_CREATED:
					Debug.log("usuario creado");
					break;
				case ERROR_USER_NOT_FOUND:
					Debug.log("----------- Game | ERROR: USER NOT FOUND", Debug.RED);
					gameManager.user.createUser();
					break;
				case ERROR_USER_NOT_CREATED:
					Debug.log("----------- Game | ERROR: USER NOT CREATED", Debug.RED);
					break;
					
				case ERROR_EVENT_NOT_CREATED:
					Debug.log("----------- Game | ERROR_EVENT_NOT_CREATED", Debug.RED);
					break;
				case ERROR_COMMENT_NOT_CREATED:
					Debug.log("----------- Game | ERROR: COMMENT NOT CREATED", Debug.RED);
					break;
				case ERROR_EVENT_NOT_UPDATED:
					Debug.log("----------- Game | ERROR: EVENT NOT UPDATED", Debug.RED);
					break;
				case ERROR_EVENT_FRIEND_NOT_UPDATED:
					Debug.log("----------- Game | ERROR: EVENT FRIEND NOT UPDATED", Debug.RED);
					break;
				case ERROR_EVENT_COMMENTS_NOT_FOUND:
					Debug.log("----------- Game | ERROR: EVENT COMMENTS NOT FOUND", Debug.RED);
					break;
				case ERROR_EVENT_NOT_FOUND:
					Debug.log("----------- Game | ERROR: EVENT NOT FOUND", Debug.RED);
					break;
				case ERROR_USER_SELECT:
					Debug.log("----------- Game | ERROR: USER SELECT", Debug.RED);
					break;
				case ERROR_EVENT_FRIEND_SELECT:
					Debug.log("----------- Game | ERROR: EVENT FRIEND SELECT", Debug.RED);
					break;
				case ERROR_EVENT_SELECT:
					Debug.log("----------- Game | ERROR: EVENT SELECT", Debug.RED);
					break;
				case ERROR_NO_DB_CONNECTION:
					Debug.log("----------- Game | ERROR: NO DB CONNECTION", Debug.RED);
					break;
				case ERROR_NO_DB_SELECTED:
					Debug.log("----------- Game | ERROR: NO DB SELECTED", Debug.RED);
					break;
					
			}
		}
	}

}