package com.playfulplay.partymanager.managers
{
	import com.greensock.loading.data.ImageLoaderVars;
	import com.playfulplay.partymanager.data.User;
	import com.playfulplay.partymanager.Main;
	import com.playfulplay.partymanager.managers.InterfaceManager;
	
	
	/**
	 * ...
	 * @author Iván Mervich
	 */
	public class GameManager
	{
		static public const URL_CONNECTOR:String = "http://www.imervich.com/partymgr/amfphp/gateway.php"
		static public const ENABLE_FACEBOOK_API:Boolean = true;
		
		public var main:Main;
		public var user:User;
		public var loadingManager:LoadingManager;
		public var eventManager:EventManager;
		public var facebookManager:FacebookManager;
		public var interfaceManager:InterfaceManager;
		
		public function GameManager(main:Main)
		{
			this.main = main;
			construct();
		}
		
		private final function construct():void
		{
			
			
			this.loadingManager = new LoadingManager(this);
			this.interfaceManager = new InterfaceManager(this);
			
			this.eventManager = new EventManager(this);
			
			this.facebookManager = new FacebookManager(this);
			
			//user.loginUser();
			this.user = new User(this);
		}
		
		///**
		//* Cambia de estado:
		//* @param	event GameEvent.CHANGE_STATE
		//*/
		//internal function setState(event:GameEvent):void
		//{
		//if (event.data != 0)
		//{
		//leaveState();
		//if (this.state != event.data)
		//{	
		//
		//this.prevState = this.state;
		//this.state = event.data;
		// editAvatarWasLastState = TRUE solo cuando el estado sea PERSONALIZACION AVATAR
		//editAvatarWasLastState = Boolean(this.state == ESTADO_PERSONALIZACION_AVATAR && event.data == ESTADO_BANCO);
		//
		//if (this.prevState == ESTADO_PERSONALIZACION_AVATAR)
		//if (this.state == ESTADO_BANCO)
		//editAvatarWasLastState = true;
		//
		//editAvatarWasLastState = Boolean(this.prevState == ESTADO_PERSONALIZACION_AVATAR && this.state == ESTADO_BANCO);
		//
		//enterState();
		//}
		//}
		//}
		//
		///**
		//* Entrar a un estado.
		//*/
		//private final function enterState():void
		//{
		//Debug.log("GameManager.as | Entered state: " + state, DEBUG_COLOR);
		//
		//switch(state)
		//{
		//case ESTADO_INIT:
		//init();
		//break;
		//case ESTADO_LOADING:
		//load();
		//break;
		//case ESTADO_BIENVENIDO:
		//loadWelcome();
		//break;
		//case ESTADO_NOTICIAS:
		//loadNews();
		//break;
		//case ESTADO_REGALOS:
		//loadGifts();
		//break;
		//case ESTADO_GAMEPLAY:
		//startGameplay();
		//break;
		//case ESTADO_PERSONALIZACION_AVATAR:
		//customizeAvatar();
		//break;
		//case ESTADO_PANTALLA_MINIJUEGOS:
		//minigamesScreen();
		//break;
		//case ESTADO_PANTALLA_MAPA:
		//enterMapScreen();
		//break;				
		//case ESTADO_AYUDA:
		//loadHelp();
		//break;
		//case ESTADO_IDIOMAS:
		//chooseLanguage();
		//break;
		//case ESTADO_INVITAR_AMIGOS:
		//inviteFriends();
		//break;
		//case ESTADO_TIENDA:
		//loadStore();
		//break;
		//case ESTADO_COMPRA_FB_CREDITS:
		//buyFBCredits();
		//break;
		//case ESTADO_COLECCIONABLES:
		//loadCollectables();
		//break;
		//case ESTADO_BANCO:
		//loadBank();									
		//break;
		//case ESTADO_PERFIL_AVATAR:
		//loadProfile();
		//break;
		//case ESTADO_FARMING:
		//loadFarming();
		//}
		//}
		//
		//
		///**
		//* Inicialización de variables.
		//*/
		//private final function init():void 
		//{
		//Debug.log("GameManager.as | Init", DEBUG_COLOR);
		//
		// Cambia a ESTADO_LOADING
		//this.eventManager.dispatchEvent(new GameEvent(GameEvent.CHANGE_STATE, ESTADO_LOADING));
		//}
		//
		///**
		//* Crea puntero
		//*/
		//internal function createPointer():void 
		//{
		//var pointer:Pointer = new Pointer(main, chusma.getInstance("Puntero"));
		//}
//
		///**
		//* Carga de assets.
		//*/
		//private function load():void 
		//{
		//Debug.log("GameManager.as | Load", DEBUG_COLOR);
		//
		//this.loadingManager.init();
		//}
		//
		//private function loadWelcome():void 
		//{
		//Debug.log("GameManager.as | Bienvenido", DEBUG_COLOR);
		//}
		//
		//private function loadNews():void 
		//{
		//Debug.log("GameManager.as | Noticias", DEBUG_COLOR);
		//}
		//
		//private function loadGifts():void 
		//{
		//Debug.log("GameManager.as | Envía regalos", DEBUG_COLOR);
		//}
		//
		///**
		//* Gameplay
		//*/
		//private function startGameplay():void 
		//{
		//Debug.log("GameManager.as | Gameplay", DEBUG_COLOR);
		//
		//if (ENABLE_FACEBOOK_API)
		//this.dataManager.getFriendlist();
		//
		// INIT GameplayManager
		//eventManager.dispatchEvent(new GameplayEvent(GameplayEvent.CHANGE_STATE, { state: GameplayManager.ESTADO_INIT } ));
		//}
		//
		//private function customizeAvatar():void 
		//{
		//Debug.log("GameManager.as | Personalizar Avatar", DEBUG_COLOR);
		//
		//if (!customAvatarManager)
		//customAvatarManager = new CustomAvatarManager(this);
		//
		//customAvatarManager.init();
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.CUSTOMIZE_AVATAR));//no se usa en misiones
		//
		//eventManager.dispatchEvent(new CustomAvatarEvent(CustomAvatarEvent.LOAD_CUSTOM_INTERFACE, {state: 1}));
		//}
		//
		//private function loadProfile():void
		//{
		//Debug.log("GameManager.as | Perfil Avatar", DEBUG_COLOR);
		//if (!avatarProfile)
		//avatarProfile = new ProfileManager(this);
		//
		//avatarProfile.init();
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.OPEN_PROFILE));
		//missionManager.handleGameStateEvents(new GameStateEvent(GameStateEvent.OPEN_PROFILE));
		//}
		//
		//private function loadFarming():void
		//{
		//Debug.log("GameManager.as | Farming", DEBUG_COLOR);
		//farmingScreen = true;
		//
		//if (!farming)
		//farming = new FarmingManager(this);
		//
		//farming.init();
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.OPEN_PROFILE));
		//missionManager.handleGameStateEvents(new GameStateEvent(GameStateEvent.OPEN_FARMING));			
		//}
		//
		//private function loadHelp():void 
		//{
		//Debug.log("GameManager.as | Ayuda", DEBUG_COLOR);
		//}
		//
		//private function chooseLanguage():void 
		//{
		//Debug.log("GameManager.as | Idiomas", DEBUG_COLOR);
		//}
		//
		//private function inviteFriends():void 
		//{
		//Debug.log("GameManager.as | Invitar amigos", DEBUG_COLOR);
		//}
		//
		//private function loadStore():void 
		//{
		//Debug.log("GameManager.as | Tienda", DEBUG_COLOR);
		//
		//if (!store)
		//store = new StoreManager(this);
		//
		//eventManager.dispatchEvent(new StoreEvent(StoreEvent.LOAD_STORE_INTERFACE, { state: 1 } ));
		//store.setState(1);
		//}
		//
		//private function buyFBCredits():void 
		//{
		//Debug.log("GameManager.as | Compra FB Credits", DEBUG_COLOR);
		//}
		//
		//private function loadCollectables():void 
		//{
		//Debug.log("GameManager.as | Coleccionables", DEBUG_COLOR);
//
		//if (!collections)
		//collections = new CollectionsManager(this);
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.OPEN_BAG));
		//eventManager.dispatchEvent(new CollectionsEvent(CollectionsEvent.LOAD_COLLECTIONS_INTERFACE, {state: 1}));				
		//collections.setState(1);
		//
		//}
		//
		//private function minigamesScreen():void
		//{
		//Debug.log("GameManager.as | Pantalla minijuegos", DEBUG_COLOR);
		//
		//if (!minigamesManager)
		//minigamesManager = new MinigamesManager(this);
		//
		//minigamesManager.init();
		//
		//}		
		//
		//private function enterMapScreen():void 
		//{
		//Debug.log("GameManager.as | Mapa", DEBUG_COLOR);
//
		//if (!mapScreen)
		//mapScreen = new MapScreenManager(this);
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.OPEN_MAP));
		//eventManager.dispatchEvent(new MapScreenEvent(MapScreenEvent.LOAD_MAP_INTERFACE, {state: 1}));
		//mapScreen.setState(1);
		//
		//}		
		//
		//private function loadBank():void 
		//{
		//Debug.log("GameManager.as | Banco", DEBUG_COLOR);
		//
		//if (!bank)
		//bank = new BankManager(this);
		//
		//eventManager.dispatchEvent(new GameStateEvent(GameStateEvent.OPEN_BANK));
		//
		//eventManager.dispatchEvent(new BankEvent(BankEvent.LOAD_BANK_INTERFACE, { state: 1 } ));
		//bank.setState(1);
		//
		//}		
		//
		//public function set blockHUD(value:Boolean):void 
		//{
		//var hud:Sprite = interfaceManager.hud;
		//
		//inboxBtn.mouseEnabled = !value;
		//inboxBtn.mouseChildren = !value;
		//hud["tareas_mc"].mouseEnabled = !value;
		//hud["tareas_mc"].mouseChildren = !value;
		//hud["monedas_mc"].mouseEnabled = !value;
		//hud["monedas_mc"].mouseChildren = !value;
		//hud["tdj_mc"].mouseEnabled = !value;
		//hud["tdj_mc"].mouseChildren = !value;
		//hud["energia_mc"].mouseEnabled = !value;
		//hud["energia_mc"].mouseChildren = !value;
		//hud["imaginacion_mc"].mouseEnabled = !value;
		//hud["imaginacion_mc"].mouseChildren = !value;
		//}
		//
		//public function get blockHUD():Boolean 
		//{ 
		//var hud:Sprite = interfaceManager.hud;
		//{
		//return (
		//isBlocked(inboxBtn) &&
		//isBlocked(hud["tareas_mc"]) &&
		//isBlocked(hud["monedas_mc"]) &&
		//isBlocked(hud["tdj_mc"]) &&
		//isBlocked(hud["energia_mc"]) &&
		//isBlocked(hud["imaginacion_mc"])
		//)				
		//}
//
		//}
		//
		//private function isBlocked(target:DisplayObjectContainer):Boolean
		//{
		//if (target.mouseEnabled) 
		//{
		//if (target.mouseChildren)
		//return false;
		//else
		//return true;
		//}
		//else
		//return true;
		//}
		//
		///**
		//* Bloquear un elemento del HUD
		//* @param	type = "messages", "tasks", "coins", "premium", "energy", "imagination"
		//* @param	value
		//*/
		//public function blockHUDElement(type:String, value:Boolean):void 
		//{
		//var element:MovieClip;
		//switch (type) 
		//{
		//case "messages":
		//element = interfaceManager.inboxBtn;
		//break;
		//case "tasks":
		//element = interfaceManager.hud["tareas_mc"];
		//break;
		//case "coins":
		//element = interfaceManager.hud["monedas_mc"];
		//break;
		//case "premium":
		//element = interfaceManager.hud["tdj_mc"];
		//break;
		//case "energy":
		//element = interfaceManager.hud["energia_mc"];
		//break;
		//case "imagination":
		//element = interfaceManager.hud["imaginacion_mc"];
		//break;
		//}
		//element.mouseChildren = !value;
		//element.mouseEnabled = !value;
		//}
		//
		//public function destroyThis(manager:Object):void 
		//{
		//manager = null;
		//}
		//
		//public function get blockAll():Boolean
		//{ 
		//if (blockHUD 
		//&& blockMenu 
		//&& chusma.blockAvatarMovement 
		//&& chusma.blockExit
		//&& chusma.getBlockedNPC()
		//&& chusma.getBlockedTasksByType()
		//&& messagesManager.blockFriendShipAnimation
		///*&& interfaceManager.areMissionIconsBlocked*/)
		//return true;
		//else
		//return false;
		//}
		//
		//public function set blockAll(value:Boolean):void
		//{
		//blockHUD = value;
		//blockMenu = value;
		//chusma.blockAvatarMovement = value;
		//chusma.blockExit = value;
		//
		//for each(var npcData:NPCData in user.NPCs)
		//chusma.blockNPC(npcData.id, value);
		//
		//chusma.setBlockedTasksByType("all", value);
		//messagesManager.blockFriendShipAnimation = value;
		//interfaceManager.blockMissionIcons(value);
		//
		//var menuPrincipal:Sprite = interfaceManager.menuContainer.getChildByName("menuPrincipal") as Sprite;
		//
		//var botonesSeccion:MovieClip = menuPrincipal.getChildByName("botonesSeccion") as MovieClip;
		//var botonesAccion:MovieClip = menuPrincipal.getChildByName("botonesAccion") as MovieClip;
		//
		//interfaceManager.disableElement(botonesAccion, value);
		//interfaceManager.blockMenuElement(botonesAccion, value);
		//
		//var num:int = botonesSeccion.numChildren;
		//var i:int;
		//for (i = 0; i < num; i++)
		//interfaceManager.blockMenuElement(botonesSeccion.getChildAt(i),value);
		//}
	
	}

}