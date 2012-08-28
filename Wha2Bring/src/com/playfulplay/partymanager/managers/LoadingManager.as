package com.playfulplay.partymanager.managers 
{
	import com.carlcalderon.arthropod.Debug;
	import com.greensock.events.LoaderEvent;
	import com.greensock.loading.data.ImageLoaderVars;
	import com.greensock.loading.display.ContentDisplay;
	import com.greensock.loading.ImageLoader;
	import flash.display.DisplayObjectContainer;
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author Iván Mervich
	 */
	public class LoadingManager
	{
		
		private const DEBUG_COLOR:uint = 0xC0DD6D;
		
		/// LOS INTOCABLES
		private var gameManager:GameManager;
		private var appDomain:ApplicationDomain;
		private var loaderContext:LoaderContext;
		
		
		public var imgLoadersPool:Dictionary;
	
		
		public function LoadingManager(gameManager:GameManager)
		{
			this.gameManager = gameManager;
			
			Debug.log("LoadingManager.as | Constructor called", DEBUG_COLOR);
			
			init();
		}
		
		public function init():void
		{
			/// APPLICATION DOMAIN
			appDomain = new ApplicationDomain(ApplicationDomain.currentDomain);
			loaderContext = new LoaderContext(false, appDomain);
			
			
			//
			imgLoadersPool = new Dictionary(true);
			
		}
		
		///**
		 //* Carga una imagen
		 //* @param	url
		 //* @param	vars
		 //*/
		public function loadImage(url:String, vars:ImageLoaderVars):ContentDisplay
		{
			vars.context(loaderContext);
			Debug.log("Cargar imagen: " + url);
			if (imgLoadersPool[url])
			{
				Debug.log("YA ESTA CARGADO");
				return imgLoadersPool[url];
			}
			else
			{
				new ImageLoader(url, vars).load();
			}
			return null;
		}
		
		/// posible agregar name, onComplete
		/**
		 * Carga una imagen de perfil de facebook de 50x50
		 * @param	url
		 * @param	container
		 * @param	x
		 * @param	y
		 * @return
		 */
		public function loadFBProfilePic(url:String, container:DisplayObjectContainer, width:int = 0, height:int = 0, name:String = null, onComplete:Function = null):ContentDisplay
		{
			var vars:ImageLoaderVars = new ImageLoaderVars();
			
			Debug.log("Cargar imagen de perfil de fb: " + url);
			if (imgLoadersPool[url])
			{
				Debug.log("YA ESTA CARGADO");
				return imgLoadersPool[url];
			}
			else
			{
				vars.autoDispose(true);
				
				if(name)
					vars.name(name);
				
				
				vars.width(width);
				vars.height(height);
				vars.container(container);
				
				vars.context(loaderContext);
				
				if (onComplete !== null)
					vars.onComplete(onComplete);
				
				vars.onError(onErrorLoad);
				vars.onFail(onFailLoad);
				vars.onIOError(onIOErrorLoad);
				vars.onSecurityError(onSecurityErrorLoad);
				
				new ImageLoader(url, vars).load();
			}
			return null;
		}
		
		private function onFailLoad(event:LoaderEvent):void
		{
			Debug.error("Fail loading image: ");
			Debug.log(event.target.name + " " + event);
		}
		
		private function onErrorLoad(event:LoaderEvent):void
		{
			Debug.error("Error loading image: ");
			Debug.log(event.target.name + " " + event);
		}
		
		private function onIOErrorLoad(event:LoaderEvent):void
		{
			Debug.error("IO Error loading image: ");
			Debug.log(event.target.name + " " + event);
		}
		
		private function onSecurityErrorLoad(event:LoaderEvent):void
		{
			Debug.error("Security Error loading image: ");
			Debug.log(event.target.name + " " + event);
		}
		
	}
}