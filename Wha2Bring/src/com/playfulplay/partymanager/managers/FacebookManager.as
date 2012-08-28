package com.playfulplay.partymanager.managers
{
	import com.adobe.serialization.json.JSON;
	import com.carlcalderon.arthropod.Debug;
	import com.facebook.graph.Facebook;
	import com.playfulplay.partymanager.data.User;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.external.ExternalInterface;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	//import com.adobe.serialization.json.JSON;
	
	
	/**
	 * ...
	 * @author Salvador
	 */
	public class FacebookManager extends MovieClip
	{
		private var _userIsLoggedin:Boolean;
		
		private var gameManager:GameManager;
		private var accessNum:String;
		private var decodedJSON:*;
		private var friendsInfo:*;
		public var regresaTabJuego:Boolean;
		//Variable para elegir el mensaje de ñoño
		public var casaDePaty:Boolean;
		public var requestToDelete:String;
		public var fbidFriend:String;
		
		public function FacebookManager(gameManager:GameManager)
		{
			this.gameManager = gameManager;
			if (GameManager.ENABLE_FACEBOOK_API && ExternalInterface.available)
			{
				Debug.log("FacebookManager Constructor");
				initializeFBApi();
				Debug.log("FacebookManager Constructor Fin");
			}else
			{
				if (!gameManager.user) 
					gameManager.user = new User(gameManager);
				
					gameManager.user.loginUser();
			}

		}
		
		private function initializeFBApi():void
		{
			Debug.log("FacebookManager initializeFBApi");
			Facebook.init("344729938949340", onInit);
			//Facebook.init("179109662149151", onInit);
			Debug.log("FacebookManager initializeFBApi Fin");
		}
		
		/**
		 * -------------------
		 * FACEBOOK SERVICE
		 * -------------------
		 */ /** INIT **/
		
		private final function onInit(result:Object, fail:Object):void
		{
			
			Debug.log("----------- FACEBOOK MANAGER ON INIT---------", Debug.YELLOW);
			Debug.log("XXXXXXXXXXXXXXXXXXXXXXX RESULT: XXXXXXXXXXXXXXXXXXXXX" + result,Debug.YELLOW);
			
			if (result)
			{
				this.gameManager.user.facebookID = result.uid;
				this.accessNum = result.accessToken;
				this.gameManager.user.loginUser();
				
				//this.sendToFriends();
			}
			else
			{
				Debug.object(result);
				Debug.object(fail);
				Debug.log("----------> FACEBOOK MANAGER | ERROR: LOGIN FAIL", Debug.RED);
				
				ExternalInterface.call("redirect","344729938949340", "email,user_location,user_birthday,publish_stream,read_friendlists,create_event,user_events,friends_events,rsvp_event","http://apps.facebook.com/whatobring/"); 
				//ExternalInterface.call("redirect","179109662149151", "email,user_location,user_birthday,publish_stream,read_friendlists,create_event,user_events,friends_events,rsvp_event","http://apps.facebook.com/whatobring/"); 
				
				return;
			}
			updateLogginStatus();
		}
		
		/**
		 * LOGIN / LOGOUT
		 *
		 * Tip: Request Facebook.login on a MouseEvent handler
		 * to prevent popupBlockers to block your login popup
		 */
		//private function handleLoginLogout(e:MouseEvent):void {
		// /*if (e.target == _loginLogouet.login) {
		//Facebook.login( handleLoginResponse, _permissions);
		//}
		//else if (e.target == _loginLogout.logout) {
		//Facebook.logout( handleLogoutResponse);
		//}*/
		//}
		
		private final function updateLogginStatus():void
		{
			
			Facebook.api('/me', handleUserdataLoad);
		}
		
		/**
		 * FACEBOOK RESPONDER HANDLERS
		 */
		
		/** Facebook.api('/me', handleUserdataLoad) - Responder; */
		
		private final function handleUserdataLoad(result:Object, fail:Object):void
		{
			
			if (result)
			{
				var user:User = this.gameManager.user;
				
				Debug.object(result);
				if (result.location != undefined)
					user.location = result.location.name;
				
				if (result.gender != undefined)
					user.gender = result.gender;
				
				//if (result.name != undefined)
					//user.name = result.name;
				
				if (result.last_name != undefined)
					user.last_name = result.last_name;
				
				if (result.first_name != undefined)
					user.first_name = result.first_name;
				
				//if (result.birthday != undefined)
					//user.birth = result.birthday;
				
				//if (result.email != undefined)
					//user.mail = result.email;
				
				Debug.object(result);
					
				user.facebookID = result.id;
				Debug.log("gameManager.user.facebookID: " + user.facebookID);
				
				//Debug.log("NOMBRE DEL USUARIO DE FACEBOOK: " + user.name);
				
				user.loginUser();
			}
			else
			{
				Debug.log("----------> FACEBOOK MANAGER | ERROR: NO SE ENCONTRARON AMIGOS", Debug.RED);
			}
		}
		
		/********************************************MIS AMIGOS**********************************************************/
		public final function getMyFriendListGame(myQuery:String):void
		{
			if (!GameManager.ENABLE_FACEBOOK_API)
				return;
			
			//Son mis amigos que ya son mis vecinos	
			Debug.log("FACEBOOK | PEDIR LISTA DE AMIGOS que usen la aplicacionX: " + gameManager.user.facebookID, Debug.BLUE);
			//Pedir lista de amigos
			var loader:URLLoader = new URLLoader();
			var request:URLRequest = new URLRequest();
			//var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = "+ gameManager.user.facebookID +")";
			var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE uid=" + myQuery;
			//var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = 100002439414209)";
			request.url = "https://api.facebook.com/method/fql.query?access_token=" + accessNum + "&format=json&query=" + query;
			//Debug.log("REQUESTR URL FACEBOOK: " + request.url);
			loader.addEventListener(Event.COMPLETE, myAppFriendsLoaded);
			loader.load(request);
		
		}
		
		/** Facebook.api('/me/friends', handleFriendsLoaded, {fields:"id,first_name,last_name"}); - Responder; */
		protected final function myAppFriendsLoaded(a_event:Event):void
		{
			var loader:URLLoader = a_event.target as URLLoader;
			loader.removeEventListener(Event.COMPLETE, myAppFriendsLoaded);
			var graphData:String = loader.data;
			//Debug.log(graphData);
			decodedJSON = JSON.decode(graphData);
			//decodedJSON = JSON.parse(graphData);
			
			Debug.log("FACEBOOK | AMIGOS QUE JUEGAN Y SON MIS AMIGOS: " + decodedJSON.length, Debug.BLUE);
			//MonsterDebugger.trace(this, "AMIGOS NORMALES OBTENIDOS");
			
			var l:int = decodedJSON.length;
			gameManager.user.friends = decodedJSON;
			//var userFriends:Vector.<FriendData> = gameManager.user.friends;
			//
			//for (var i:int = 0; i < l; i++)
			//{
				//for each (friend in userFriends)
				//{
					//if (decodedJSON[i].uid == friend.uid)
					//{
						//friend.first_name = decodedJSON[i].first_name;
						//friend.pic_square = decodedJSON[i].pic_square;
						//
						//foundUsers[foundUsers.length] = friend;
						//gameManager.user.allMyFriends[gameManager.user.allMyFriends.length] = friend;
						//break;
					//}
				//}
			//}
			//
			//retriveMyFriends(gameManager.user.allMyFriends);
			
			/* ---- Obtener amigos que usan la aplicación pero no están agregados ----*/
			getFriendListGame();
		}
		
		
		/********************************************MIS AMIGOS**********************************************************/
		
		/**
		 * Obtener amigos que usan la aplicación pero no están agregados
		 */
		public final function getFriendListGame():void
		{
			//MonsterDebugger.trace(this, "GET FRIEND LIST GAME");
			Debug.log("FACEBOOK | PEDIR LISTA DE GENTE que usen la aplicacion: " + gameManager.user.facebookID, Debug.BLUE);
			//Pedir lista de amigos
			var loader:URLLoader = new URLLoader();
			var request:URLRequest = new URLRequest();
			var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = " + gameManager.user.facebookID + ")";
			request.url = "https://api.facebook.com/method/fql.query?access_token=" + accessNum + "&format=json&query=" + query;
			loader.addEventListener(Event.COMPLETE, appFriendsLoaded);
			loader.load(request);
			//Facebook.api('/me/friends', handleFriendsLoaded, {fields:"id,first_name,last_name"});//todos los amigos
		
		}
		
		/** Facebook.api('/me/friends', handleFriendsLoaded, {fields:"id,first_name,last_name"}); - Responder; */
		
		/**
		 * Obtiene los usuarios
		 * @param	a_event
		 */
		protected final function appFriendsLoaded(a_event:Event):void
		{
			if (a_event)
			{
				var loader:URLLoader = a_event.target as URLLoader;
				loader.removeEventListener(Event.COMPLETE, appFriendsLoaded);
				
				//Debug.log("GRAPH XXX "+graphData,Debug.YELLOW);
				decodedJSON = JSON.decode(String(loader.data));
				//decodedJSON = JSON.parse(String(loader.data));
				
				Debug.log("FACEBOOK | AMIGOS QUE JUEGAN PERO NO ESTAN AÑADIDOS: " + decodedJSON.length, Debug.BLUE);
			}
			
			//try
			//{
				//gameManager.user.appFriends = new Vector.<FriendData>();
				//var appFriends:Vector.<FriendData> = gameManager.user.appFriends;
				//var friendsToDelete:Vector.<FriendData> = new Vector.<FriendData>();
				//var friends:Vector.<FriendData> = gameManager.user.friends;
				//var length:int = -1;
				//
				//var friend:FriendData, appFriend:FriendData;
				//
				//
				//for each (var o:Object in decodedJSON)
				//{
					//o.level = 1;
					//appFriends[++length] = new FriendData( { id_user: -1, uid: o.uid, first_name: o.first_name, pic_square: o.pic_square, level: -1, addedAsFriend:false} );
				//}
				//
				//length = -1;
				//
				//friendLoop: 
				//for each(friend in friends)
				//{
					//appFriendLoop:
					//for each(appFriend in appFriends)
					//{
						//if (friend.uid == appFriend.uid)
							//friendsToDelete[++length] = appFriend;
					//}
				//}
				//Debug.log("------------------------------------------ 1", Debug.RED);
				//if (friendsToDelete.length > 0)
				//{
					//for each(friend in friendsToDelete)
					//{
						//Debug.log("Amigo repetido: " + friend.first_name + " " + friend.uid + " ELIMINANDO", 0x71FFFF);
						//Util.removeFromArray(appFriends, friend);
					//}
				//}
				//if(flagMandarSeleccion)
					//retrievePlayerFriends(decodedJSON);
					//
				//flagMandarSeleccion = false;
				//
				// Si ya cargó los amigos, actualizar, si no, cargarlos.
				//if (gameManager.interfaceManager.friendsAlreadyLoaded)
					//gameManager.interfaceManager.updateVisualFriends();
				//else 
					//gameManager.interfaceManager.loadVisualFriends();
			//}
		}
		
		public final function getAllFriends():void
		{
			if (!GameManager.ENABLE_FACEBOOK_API)
				return;
			
			Debug.log("FACEBOOK | LISTA DE AMIGOS de la APLICACION " + gameManager.user.facebookID, Debug.BLUE);
			//Pedir lista de amigos
			var loader:URLLoader = new URLLoader();
			var request:URLRequest = new URLRequest();
			//var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = "+ gameManager.user.facebookID +")";
			var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE uid IN (SELECT uid1 FROM friend WHERE uid2 = " + gameManager.user.facebookID + ") ORDER BY first_name ASC";
			//var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = 100002439414209)";
			request.url = "https://api.facebook.com/method/fql.query?access_token=" + accessNum + "&format=json&query=" + query;
			loader.addEventListener(Event.COMPLETE, appAllFriendsLoaded);
			loader.load(request);
		}
		
		private final function appAllFriendsLoaded(e:Event):void
		{
			var loader:URLLoader = e.target as URLLoader;
			var graphData:String = loader.data;
			//Debug.log(graphData);
			decodedJSON = JSON.decode(graphData);
			//decodedJSON = JSON.parse(graphData);
			
			Debug.log("FACEBOOK | LISTA DE AMIGOS GLOBALES: " + decodedJSON.length, Debug.BLUE);
			
			if (GameManager.ENABLE_FACEBOOK_API)
			{
				try
				{
					//gameManager.user.allFriends = [];
					//
					//for each (var o:*in decodedJSON)
					//{
						//gameManager.user.allFriends[gameManager.user.allFriends.length] = o;
					//}
					//
					//retrieveFriends(gameManager.user.allFriends);
				}
				catch (e:*)
				{
					Debug.error(e);
				}
			}
		}
		
		public final function getWorldListGame(world:*):void
		{
			Debug.log("FACEBOOK | PEDIR LISTA DE MUNDO ", Debug.BLUE);
			//Pedir lista de amigos
			var loader:URLLoader = new URLLoader();
			var request:URLRequest = new URLRequest();
			
			var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE ";
			var i:int;
			
			//gameManager.user.world = {};
			//
			//gameManager.user.world.type = "getWorldScore";
			//gameManager.user.world.global = [];
			//
			//var g:Object;
			//
			query += " uid = " + world[0];
			
			for each (var w:String in world)
			{
				query += " OR uid = " + w;
				i++;
			}
			Debug.log("QUERY" + query);
			//var query:String = "SELECT uid, first_name, last_name, pic_square FROM user WHERE is_app_user = 1 AND uid IN (SELECT uid1 FROM friend WHERE uid2 = 100002439414209)";
			request.url = "https://api.facebook.com/method/fql.query?access_token=" + accessNum + "&format=json&query=" + query;
			Debug.log(request.url);
			loader.addEventListener(Event.COMPLETE, appWorldLoaded);
			loader.load(request);
			//Facebook.api('/me/friends', handleFriendsLoaded, {fields:"id,first_name,last_name"});//todos los amigos
		
		}
		
		private final function appWorldLoaded(e:Event):void
		{
			var loader:URLLoader = e.target as URLLoader;
			var graphData:String = loader.data;
			//Debug.log(graphData);
			decodedJSON = JSON.decode(graphData);
			//decodedJSON = JSON.parse(graphData);
			
			Debug.log("FACEBOOK | SCORES GLOBALES: " + decodedJSON.length, Debug.BLUE);
			
			try
			{
				var g:Object;
				var a:Array = [];
				var c:Object;
				for each (var o:Object in decodedJSON)
				{
					//Debug.object(o);
					for each (g in gameManager.interfaceManager.uidFriends)
					{
						if (o.uid == g)
						{
							c = { };
							c.uid = g;
							c.img = o.pic_square;
							c.name = o.first_name + " " + o.last_name;
							Debug.log("encontrado");
							Debug.object(c);
							a.push(c);
							break;
						}
					}
				}
				gameManager.interfaceManager.loadFriends(a);
			}
			catch (e:*)
			{
				Debug.error(e);
			}
		}
		
		private var args:Object = {link: "http://apps.facebook.com/lavecindaddeelchavo/", name: "La Vecindad de El Chavo"};
		private var idCurrentEvent:String;
		
		
		
		public final function requestPostonWall(title:String, description:String, message:String, picture:String, id:int):void
		{
			Debug.log("-------?REQUEST POST ON WALL");
			//var actions:*;
			//actions = [{"name": "Ayuda", "link": "http://apps.facebook.com/lavecindaddeelchavo/"}];
			args.caption = "";
			args.description = description;
			args.message = "";
			//args.website = "http://apps.facebook.com/lavecindaddeelchavo/";
			CONFIG::debug
			{
				args.picture = picture;
			}
			CONFIG::release
			{
				args.picture = picture;
			}
			
			args.name = title;
			
			if (GameManager.ENABLE_FACEBOOK_API)
			{
				if (id == 10) 
				{
					var fecha:Date = new Date ;
					var unix:Number = Number(fecha) * 0.001;
					//args.actions = "{ 'name': '" + "Ayuda a " + gameManager.user.first_name +" ', 'link': '" + GameManager.URL_WEB_POSTS + "&bqsop=" + gameManager.user.idUser + "&utf=" + gameManager.user.first_name + "&bcv=" + unix + "'}";	
					Facebook.api('/me/feed', handleFeedPosted, args, "POST");	
					
				}
				else
				{
					args.actions = "{ link: 'http://apps.facebook.com/lavecindaddeelchavo/', name: 'La Vecindad de El Chavo'}";
					Facebook.api('/me/feed', handleFeedPosted, args, "POST");
				}
					
				//gameManager.dataManager.setUserPublish(id);
			}
				
			Debug.object(args);
		}
		
		public final function sendToFriends():void
		{
			Debug.log("-Send to Friends");
			Facebook.ui("apprequests", { message: "Selecciona a tus Amigos" }, requestCallback, "iframe" );
		}
		
		private final function requestCallback(result:*):void
		{
			try {
				
			
			Debug.log("-------------------------------------->PRUEBA FACEBOOK requestCallback");
			Debug.array(result.to);
			//var friends:Array = (result["to"] as String).split(",");
			gameManager.interfaceManager.uidFriends = result.to;
			this.getWorldListGame(gameManager.interfaceManager.uidFriends);
			//gameManager.interfaceManager.loadFriends(result.to);
			} catch (error:Error) { Debug.log(error.errorID +  " des: " + error.message); }
		}
		
		
		public final function convert(str:String):String
		{
			var temp:String = "";
			var asci:int;
			
			for (var i:int = 0; i < str.length;i++ )
			{
				asci = str.charCodeAt(i) + 17;
				temp=temp+""+String.fromCharCode(asci);
			}
			return temp;
		}
		public final function convertSimple(str:String):String
		{
			var temp:String = "";
			var asci:int
			
			for (var i:int = 0; i < str.length;i++ )
			{
				asci = str.charCodeAt(i) + 2;
				temp=temp+""+String.fromCharCode(asci);
			}
			return temp;
		}

		/** WRITE
		 * Facebook.api('/me/feed', handleMyFeedLoaded ); - Responder; */
		private function handleFeedPosted(result:Object, fail:Object):void
		{
			if (result)
			{
				//FUE POSTEADO
				Debug.log("----------> FACEBOOK MANAGER | EL POST FUE POSTEADO ", Debug.YELLOW);
				Debug.log("------------> POST ID: " + result.id, Debug.YELLOW);
				
				
					// you can retrieve any record directly by its id
					//Facebook.api( String(result.id), handleMyNewPostLoaded  );
					//_mainView.hideAllPostingStatus();
				
			}
			else if (fail)
			{
				Debug.log("----------> FACEBOOK MANAGER | ERROR AL SER POSTEADO ", Debug.YELLOW);
				Debug.object(fail.error);
			}
		}
		
		public final function pruebaFB():void
		{
			Facebook.api('/me/?fields=currency', regreso, null, "GET");
		}
		
		private function regreso(result:Object, fail:Object):void 
		{
			Debug.log("-------------------------------------->PRUEBA FACEBOOK");
			Debug.object(result);
			Debug.object(fail);
		}
		
		
		///Referencia: http://developers.facebook.com/docs/reference/rest/events.create/
		public final function createEvent(name:String, start_time:String, end_time:String, description:String, location:String, privacy:String):void
		{
			var params:Object = 
				{ name: name, 
				start_time: start_time, 
				end_time: end_time, 
				description: description,
				location: location,
				privacy_type: privacy };
			
			Facebook.api(gameManager.user.facebookID + "/events", callbackEventCreated, params, "POST");
		}
		
		private final function callbackEventCreated(result:Object, fail:Object):void
		{
			Debug.log("-------------------------------------->PRUEBA FACEBOOK CREACION DE EVENTOS");
			Debug.object(result);
			{
				idCurrentEvent = result.id;
				var amigos:String = "";
				amigos  = gameManager.interfaceManager.uidFriends[0];
				for each (var amigo:String in gameManager.interfaceManager.uidFriends)
				{
					amigos += "," + amigo;
				}
				
				invitarAmigos(amigos);
			}
				
			if (fail)
				Debug.object(fail.error);
		}
		
		
		public final function invitarAmigos(usuarios:String):void
		{
			var params:Object = 
				{ users: usuarios };
			
			Facebook.api("/" + idCurrentEvent + "/invited", callbackEventCreated, params, "POST");
		}
		
		public final function postearEvento(post:String):void
		{
			var params:Object = 
				{ message: post };
			
			Facebook.api("/199579463505380/feed", callbackEventCreated, params, "POST");
		}
		
		public final function cargarImagen(link:String):void
		{
			var params:Object = 
				{ source: link };
			
			Facebook.api("/199579463505380/picture", callbackEventCreated, params, "POST");
		}
		
		public final function customEvent(custom:String):void
		{
			Facebook.api("/199579463505380/" + custom, customEventResult, { }, "GET");
		}
		
		public final function customEventResult(result:Object, fail:Object):void
		{
			Debug.log("-------------------------------------->CUSTOM EVENTOS");
			Debug.object(result);
			if (result)
				Debug.array(result as Array);
				
			//MonsterDebugger.trace(this, result);
			if (fail)
				Debug.object(fail.error);
		}
		
		public function editEvent(name:String, start_time:String, end_time:String, descripcion:String, location:String, privacy:String):void 
		{
			var params:Object = 
				{ name: name, 
				start_time: start_time, 
				end_time: end_time, 
				description: descripcion,
				location: location,
				privacy_type: privacy };
			
			Facebook.api("/199579463505380", callbackEventCreated, params, "POST");
		}
		
		//public final function albumPost():void
		//{
			//
			//var album_details:Object = { message: "Album descripcion prueba", name : "Album Prueba" };
			//
			//Facebook.api('/me/albums', handleAlbumPosted, album_details, "POST");
			//
		//}
		//
		//private var fileData:FileReference = new FileReference();
		//private final function handleAlbumPosted(result:Object, fail:Object):void
		//{
			//Debug.log("-------------------------->CREO EL ALBUM");
			//Debug.object(result);
			//
			//Debug.object(fail);
			//
			//
			/// ¿Todos listos? 3, 2, 1... ¡Digan whiskey!
			//var target:CasaSprite = gameManager.chusma.currentRoom.asset;
			//Debug.log("-------------------------->CREO EL ALBUM 1");
			//
			//var bmpData:BitmapData = new BitmapData(720, 600);
			//bmpData.draw(target);
			//var bitmap:Bitmap = new Bitmap(bmpData);
			//
			//
			//Debug.log("-------------------------->CREO EL ALBUM 3");
			//
			//var photo_details:Object = { message : "Mensaje de la foto" };
			//Debug.log("-------------------------->CREO EL ALBUM 4");
			//photo_details.fileName = "prueba";
			//
			//var encoded:String = Base64.encode(bmpData.getPixels(bmpData.rect));  
			//photo_details.image = encoded;
			//photo_details.access_token = this.accessNum;
			//
			//fileData.addEventListener(Event.COMPLETE, completeSave);
			//
			//fileData.save(bitmap);
			//
			//Debug.log("-------------------------->CREO EL ALBUM 5");
			//Debug.object(photo_details);
			//Facebook.api("/" + result.id + "/photos", handlePhotoPosted, photo_details, "POST");
			//Facebook.api("/me/photos", handlePhotoPosted, photo_details, "POST");
			//Facebook.api("photos", handlePhotoPosted, photo_details, "POST");
			//Debug.log("-------------------------->CREO EL ALBUM FIN");
			//
		//}
		//
		//public function pruebaSave():void
		//{
			//var target:CasaSprite = gameManager.chusma.currentRoom.asset;
			//Debug.log("-------------------------->CREO EL ALBUM 1");
			//
			//var bmpData:BitmapData = new BitmapData(720, 600);
			//bmpData.draw(target);
			//var bitmap:Bitmap = new Bitmap(bmpData);
		//}
		//
		//
		//private function completeSave(e:Event):void 
		//{
			//Debug.object(e);
			//fileData.browse();
		//}
		//private final function handlePhotoPosted(result:Object, fail:Object):void
		//{
			//Debug.log("-------------------------->SUBIO FOTO");
			//Debug.object(result);
			//
			//Debug.object(fail.error);
		//}
	
	/** Facebook.api('/some id', handleMyFeedLoaded ); - Responder; */
	
		//private function handleMyNewPostLoaded(result:Object, fail:Object):void {
		//if (result) {
		//_mainView.myFeedUI.addNewPostFeed(result);
//
		//}
		//else if( fail ){
//
		//}
		//}
	
		//private function handleUploadComplete(result:Object, fail:Object):void {
		//if (result) {
		//_mainView.uploadImgUI.uploading.visible = false;
		//}
		//else if( fail ){
		//}
		//}
	
	}

}