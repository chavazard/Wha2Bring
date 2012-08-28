package com.playfulplay.partymanager
{
	import com.amf.AMFConnector;
	import com.carlcalderon.arthropod.Debug;
	import com.demonsters.debugger.MonsterDebugger;
	import com.playfulplay.partymanager.managers.GameManager;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.ContextMenuEvent;
	import flash.events.Event;

	/**
	 * ...
	 * @author Iván Mervich
	 */
	[SWF(width = '760', height = '1300', backgroundColor = '#000', frameRate = '24')]
	//[Frame(factoryClass = "com.game.load.Preloader")]
	
	public class Main extends Sprite
	{
		private const DEBUG_COLOR:uint = 0xB1DBC0;
		private var gameManager:GameManager;
		private var amf:AMFConnector;
		
		public function Main() 
		{
			//stage.scaleMode = StageScaleMode.NO_SCALE
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			//this.name = "main";
			CONFIG::debug
			{
				MonsterDebugger.initialize(this);
			}
			
			Debug.clear();
			gameManager = new GameManager(this);
			amf = new AMFConnector(gameManager, GameManager.URL_CONNECTOR);

			
			if (stage) 
			{
				stage.align = StageAlign.TOP;
				stage.scaleMode = StageScaleMode.NO_SCALE;
			}
		}
	}
	
}