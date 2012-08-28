package com.playfulplay.partymanager.data 
{
	import com.amf.AMFConnector;
	import com.carlcalderon.arthropod.Debug;
	import com.demonsters.debugger.MonsterDebugger;
	import com.playfulplay.partymanager.managers.GameManager;
	import flash.external.ExternalInterface;
	/**
	 * ...
	 * @author Iván Mervich
	 */
	public class User 
	{
		///Datos Basicos de Usuario
		public var idUser:int = 0;
		public var facebookID:String = "0";
		
		public var first_name:String;
		public var last_name:String;
		
		public var location:String;
		public var gender:String;
		public var email:String;
		public var friends:*;
		
		private var gameManager:GameManager;
		private var amf:AMFConnector;
		
		public function User(gameManager:GameManager)
		{
			this.gameManager = gameManager;
			init();
		}
		
		private final function init():void
		{
			amf = new AMFConnector(this.gameManager, GameManager.URL_CONNECTOR);
		}
		
		public final function createUser():void
		{
			//var user_data:Object;
			if (GameManager.ENABLE_FACEBOOK_API)
			{
				Debug.log("CREA USUARIO!!!");
				
				if (!this.location)
					this.location = "NO MENCIONADO";
					
				if (!this.gender)
					this.gender = "Male";
				
				if (!this.email)
					this.email = "NO MENCIONADO";
				
				//user_data = {facebook_id: this.facebookID, gender: this.gender.substring(0, 1), first_name: this.first_name, last_name: this.last_name, //+ " " + this.last_name,
						//email: this.email, location: this.location};
			}
			//else
			//{
				//user_data = { facebook_id: this.facebookID, gender: "M", first_name: "Juan", last_name: "Perez", email: "elchavomail@juego.com", location: "Monterrey" };
				//Debug.log("----------->MANDA CREAR USUARIO ", Debug.RED);
			//}
			
			this.amf.callSix("UserClass", "createNewUser", gender, facebookID, first_name, last_name, location, email);
			
			Debug.log(" Game | Create New User");
			
		}
		
		public final function loginUser():void
		{
			if (!GameManager.ENABLE_FACEBOOK_API  && ExternalInterface.available)
			{ 
				facebookID = "1";///673144024
				//facebookID = "100";///673144024
				//facebookID = "100";///673144024
				//facebookID = "100002439414209";///673144024
			}
			
			Debug.log("------------- USER LOGIN " + facebookID, Debug.PINK);
			
			//facebookID = "1";
			
			amf.call("UserClass", "loginUser", facebookID);
			
			//didLogin = true;
			
			//CONFIG::debug
			//{
				//MonsterDebugger.inspect(this);
			//} 
			//gameManager.facebookManager.sendToFriends();
			gameManager.interfaceManager.init();
		}
		
		public final function initUser():void
		{
			
		}
		
		// EVENTS
		public function createEvent(eventName:String, description:String, startDate:String, endDate:String, location:String, privacy:String, type:String):void
		{
			//crear evento
			Debug.log("user: " + gameManager.user.idUser + " eventName: " + eventName + " description: " + description + " location: " + location + " privacy: " + privacy + " type: " + type);
			amf.callEight("EventClass", "createEvent", gameManager.user.idUser, eventName, description, startDate, endDate, location, privacy, type);
		}
		
		public function updateEvent(id_event:int, eventName:String,description:String,startDate:String,endDate:String,location:String,type:String):void
		{
			//actualizar evento
			amf.callSeven("EventClass", "updateEvent", id_event, eventName, description, startDate, endDate, location, type);
		}
		
		public function getEventData(id_event:int):void
		{
			// get Event data
			amf.call("EventClass", "getEvent", id_event);
		}
		// COMMENTS
		
		public function createComment(id_event:int, facebook_id_friend:String, comment:String):void
		{
			amf.callThree("CommentClass", "createEvent", id_event, facebook_id_friend, comment);
		}

		public function displayComments(id_event:int):void
		{
			amf.call("CommentClass", "displayComments", id_event);
		}

		/// EVENT FRIENDS
		
		public function selectFriends(idEvent:int):void
		{
			//seleccionar amigos
			amf.call("EventFriendClass", "selectFriends", idEvent);
		}
		
		public function createNewEventfriend(idUserFriend:int, idEvent:int, idItem:int, amount:Number, confirm:Boolean):void
		{
			//crear event friend
			amf.callFive("EventFriendClass", "createNewEventfriend", idUserFriend, idEvent, idItem, amount, confirm);
		}
		
		public function updateEventFriendItem(idUserFriend:int, idEvent:int, idItem:int, amount:Number, confirmed:Boolean):void
		{
			//actualizar event friend
			amf.callFive("EventFriendClass", "updateEventFriendItem", idUserFriend, idEvent, idItem, amount, confirmed);
		}
		
	}

}