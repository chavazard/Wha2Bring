package com.amf
{
	
	import com.adobe.serialization.json.JSON;
	import com.carlcalderon.arthropod.Debug;
	import com.playfulplay.partymanager.managers.GameManager;
	import flash.events.NetStatusEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.NetConnection;
	import flash.net.ObjectEncoding;
	import flash.net.Responder;
	
	//import flash.system.ApplicationDomain;
	//import flash.system.SecurityDomain;
	
	public final class AMFConnector
	{
		private var gateway:NetConnection;
		private var responder:Responder;
		private var gameManager:GameManager;
		public var result:*;
		
		public final function AMFConnector(gameManager:GameManager, gatewayAddress:String)
		{
			this.gameManager = gameManager;
			//if (!this.gameManager)
				//Debug.log("GAME MANAGER ES NULO", Debug.PINK);
			
			init(gatewayAddress);
		}
		
		private final function init(gatewayAddress:String):void
		{
			//Security.loadPolicyFile("https://secure.playfulplaysocial.mx/crossdomain.xml");
			//Security.loadPolicyFile("http://www.playfulplay.com/crossdomain.xml");
			
			//Security.loadPolicyFile("http://www.playfulplaysocial.mx/crossdomain.xml")
			//
			//Security.allowDomain("https://secure.playfulplaysocial.mx");
			//Security.allowDomain("http://www.playfulplay.com");
			//Security.allowInsecureDomain("https://secure.playfulplaysocial.mx");
			//Security.allowInsecureDomain("http://www.playfulplay.com");
			
			//Security.allowInsecureDomain("http://www.imervich.com");
			
			//Security.loadPolicyFile("http://instance01.playfulplaysocial.mx/crossdomain.xml");
			//flash.system.Security.loadPolicyFile("http://instance01.playfulplaysocial.mx/crossdomain.xml");
			//Security.allowInsecureDomain("*");
			//
			//Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/crossdomain.xml");
			//flash.system.Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/crossdomain.xml");
			//Security.allowInsecureDomain("*");

			
			//Security.allowInsecureDomain("*");
			//Security.allowDomain("*");
			
			//Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/Salvador/crossdomain.xml")
			//flash.system.Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/crossdomain.xml");
			//Security.allowInsecureDomain("*");
			
			gateway = new NetConnection();
			//gateway.proxyType = "best";
			
			
			//Handle errors
			gateway.addEventListener(NetStatusEvent.NET_STATUS, onErrorConect);
			gateway.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onSecurityError);
			
			//Set the AMF type
			gateway.objectEncoding = ObjectEncoding.AMF3;
			
			//Add Responder
			responder = new Responder(onResult, onFault);
			
			//Connect to gateway
			gateway.connect(gatewayAddress);
			
			//Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/crossdomain.xml");
			//flash.system.Security.loadPolicyFile("http://testing.playfulplaysocial.mx:8080/elchavo/crossdomain.xml");
			//
			//Security.loadPolicyFile("https://secure.playfulplaysocial.mx/crossdomain.xml");
			//flash.system.Security.loadPolicyFile("https://secure.playfulplaysocial.mx/crossdomain.xml");
			
		}
		
		//Errors
		public final function onSecurityError(nse:SecurityErrorEvent):void
		{
			Debug.log("SECURITY ERROR");
			Debug.error("currentTarget " + nse.currentTarget);
			Debug.object(nse.currentTarget.client);
			Debug.log("----------------*********////*********-----------------------");
		}
		
		public final function onErrorConect(nse:NetStatusEvent):void
		{
			trace("NetStatusEvent: " + JSON.encode(nse.info));
			Debug.error("NetStatusEvent: " + JSON.encode(nse.info));
			//trace("NetStatusEvent: " + JSON.stringify(nse.info));
			//Debug.error("NetStatusEvent: " + JSON.stringify(nse.info));
			//if (gameManager)
				//if (gameManager.userInactivity)
					//gameManager.userInactivity.stopKeepAliveTimer();
		}
		
		public final function onFault(obj:*):void
		{
			trace("onFault: " + JSON.encode(obj));
			Debug.error("onFault: " + JSON.encode(obj));
			//trace("onFault: " + JSON.stringify(obj));
			//Debug.error("onFault: " + JSON.stringify(obj));
			//if (gameManager)
				//if (gameManager.userInactivity)
					//gameManager.userInactivity.stopKeepAliveTimer();
		}
		
		//Result
		public final function onResult(obj:*):void
		{
			//result = JSON.encode(obj);
			Debug.log("result: " + obj);
			this.gameManager.eventManager.resultHandler(obj);
			//this.gameManager.eventManager.dispatchEvent(new DataEvent(DataEvent.DB_RESULT, obj)); //result));
		}
		
		public final function callNoParam(phpClass:String, phpMethod:String):void
		{
			gateway.call(phpClass + "." + phpMethod, responder);
		}
		
		public final function call(phpClass:String, phpMethod:String, phpParam:Object):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam);
		}
			
		public final function callTwo(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2);
		}
		
		public final function callThree(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3);
		}
		
		public final function callFour(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*, phpParam4:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3, phpParam4);
		}
		
		public final function callFive(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*, phpParam4:*, phpParam5:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3, phpParam4, phpParam5);
		}
		
		public final function callSix(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*, phpParam4:*, phpParam5:*, phpParam6:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3, phpParam4, phpParam5, phpParam6);
		}
		
		public final function callSeven(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*, phpParam4:*, phpParam5:*, phpParam6:*, phpParam7:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3, phpParam4, phpParam5, phpParam6, phpParam7);
		}
		
		public final function callEight(phpClass:String, phpMethod:String, phpParam1:*, phpParam2:*, phpParam3:*, phpParam4:*, phpParam5:*, phpParam6:*, phpParam7:*, phpParam8:*):void
		{
			gateway.call(phpClass + "." + phpMethod, responder, phpParam1, phpParam2, phpParam3, phpParam4, phpParam5, phpParam6, phpParam7, phpParam8);
		}
	
	}
}