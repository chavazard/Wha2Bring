package com.playfulplay.partymanager.managers 
{
	import com.carlcalderon.arthropod.Debug;
	import com.greensock.loading.data.ImageLoaderVars;
	import com.playfulplay.partymanager.managers.GameManager;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.text.TextFormat;
	import nid.events.CalendarEvent;
	import nid.ui.controls.DatePicker;
	/**
	 * ...
	 * @author ...
	 */
	public class InterfaceManager 
	{
		public var uidFriends:Array;
		//'Y-m-d H:i:s'
		//'1988-09-12 03:05:50'
		//
		private var gameManager:GameManager;
		private var screenRegistro:registroScreen;
		private var screenFriends:amigosScreen;
		private var startTime:String;
		private var endTime:String;
		private var privacy:String;
		private var screenStatus:statusScreen;
		private var dataPickerStart:DatePicker;
		private var dataPickerEnd:DatePicker;
		
		
		public function InterfaceManager(gameManager:GameManager) 
		{
			this.gameManager = gameManager;
		}
		
		public function init():void
		{
			drawScreenEditEvent();
		}
		
		public function drawScreenEditEvent():void
		{
			if (!this.screenRegistro)
				this.screenRegistro = new registroScreen();
				
			gameManager.main.stage.addChild(this.screenRegistro);
			//this.screenRegistro.width = 760;
			//this.screenRegistro.height = 1000;
			
			var btn:MovieClip = screenRegistro.getChildByName("btnAceptar") as MovieClip;
			screenRegistro.btnAceptar.gotoAndStop(1);
			setListeners(screenRegistro.btnAceptar);
			
			screenRegistro.btnCrear.gotoAndStop(1);
			setListeners(screenRegistro.btnCrear);
			
			screenRegistro.btnStatus.gotoAndStop(1);
			setListeners(screenRegistro.btnStatus);
			
			screenRegistro.btnTabla.gotoAndStop(1);
			setListeners(screenRegistro.btnTabla);
			
			setListeners(screenRegistro.btnSi);
			setListeners(screenRegistro.btnNo);
			setListeners(screenRegistro.btnAmigos);
			
			screenRegistro.btnStatusSi.visible = false;
			screenRegistro.btnStatusNo.visible = false;
			screenRegistro.btnStatusAmigos.visible = false;
			
			dataPickerStart = new DatePicker();
			dataPickerStart.hideOnFocusOut = false;
			dataPickerStart.WeekStart = "monday";
			dataPickerStart.months	= 	["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			
			//dataPicker.selectedDate = new Date(2013,2,3,12,2,2,2);
			dataPickerStart.addEventListener(CalendarEvent.CHANGE, getdateStart);
			dataPickerStart.x = 300;
			dataPickerStart.y = 365;
			dataPickerStart.dateFormat = "Y/M/D";
			dataPickerStart.prompt = "Fecha";
			//dataPickerStart.dateField.alpha = 0;
			this.screenRegistro.addChild(dataPickerStart)
			
			this.screenRegistro.swapChildren(this.screenRegistro.txtDateStart, dataPickerStart);
			
			dataPickerEnd = new DatePicker();
			dataPickerEnd.hideOnFocusOut = false;
			dataPickerEnd.WeekStart = "monday";
			dataPickerEnd.months	= 	["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			
			//dataPicker.selectedDate = new Date(2013,2,3,12,2,2,2);
			dataPickerEnd.addEventListener(CalendarEvent.CHANGE, getdateEnd);
			dataPickerEnd.x = 300;
			dataPickerEnd.y = 405;
			dataPickerEnd.dateFormat = "Y/M/D";
			dataPickerEnd.prompt = "Fecha";
			//var format:TextFormat = new TextFormat();
			//format.color = 0xABABAB;
			//format
			
			dataPickerEnd.setEnabledCellColor = 0;
			//dataPickerEnd.dateField.alpha = 0;
			this.screenRegistro.addChild(dataPickerEnd)
			//this.screenRegistro.addChild(new friend());
		}
		
		private function getdateStart(e:CalendarEvent):void 
		{
			var value:String = dataPickerStart.dateField.text;
			var format:TextFormat = new TextFormat();
			format.color = 0xFFFFFF;
			this.screenRegistro.txtDateStart.setTextFormat(format);
			
			this.screenRegistro.txtDateStart.text = value;
		}
		
		private function getdateEnd(e:CalendarEvent):void {
			trace("Date:" + e.selectedDate);
			Debug.log(dataPickerStart.dateField.text);
			trace(dataPickerStart.getDateString());
			this.screenRegistro.txtDateEnd.text = dataPickerEnd.dateField.text;
		}
		
		public function drawScreenFriends():void
		{
			if (!this.screenFriends)
				this.screenFriends = new amigosScreen();
				
			gameManager.main.stage.addChild(this.screenFriends);
			
			screenFriends.btnAceptar.gotoAndStop(1);
			setListeners(screenFriends.btnAceptar);
			
			screenFriends.btnCrear.gotoAndStop(1);
			setListeners(screenFriends.btnCrear);
			
			screenFriends.btnStatus.gotoAndStop(1);
			setListeners(screenFriends.btnStatus);
			
			screenFriends.btnTabla.gotoAndStop(1);
			setListeners(screenFriends.btnTabla);
		}
		
		public function addFriendList():void
		{
			
		}
		
		public function drawStatusScreen():void
		{
			if (!this.screenStatus)
				this.screenStatus = new statusScreen();
				
			gameManager.main.stage.addChild(this.screenStatus);
			
			screenStatus.btnEditar.gotoAndStop(1);
			setListeners(screenStatus.btnEditar);
			
			screenStatus.btnCrear.gotoAndStop(1);
			setListeners(screenStatus.btnCrear);
			
			screenStatus.btnStatus.gotoAndStop(1);
			setListeners(screenStatus.btnStatus);
			
			screenStatus.btnTabla.gotoAndStop(1);
			setListeners(screenStatus.btnTabla);
		}
		
		private var friends:Vector.<friend>;
		
		public function loadFriends(split:Array):void 
		{
			if (screenFriends.parent)
			{
				friends = new Vector.<friend>();
				var yOffset:int = 0;
				//Debug.array(split);
				for (var i:int = 0; i < split.length; i++ )
				{
					Debug.log("friend " + split[i]);
					var fr:friend = new friend();
					fr.txtName.text = split[i].name;
					fr.txtAmount.text = "0";
					gameManager.loadingManager.loadFBProfilePic("http://graph.facebook.com/" + split[i].uid + "/picture", fr.img, 30, 30);
					screenFriends.addChild(fr);
					fr.x = 200;
					fr.y = 220 + yOffset;
					friends.push(fr);
					yOffset += 50;
				}
			}
		}
		
		private function setListeners(btn:MovieClip):void
		{
			btn.addEventListener(MouseEvent.CLICK, this.onClick);
			btn.addEventListener(MouseEvent.ROLL_OVER, this.onRollOver);
			btn.addEventListener(MouseEvent.ROLL_OUT, this.onRollOut);
		}
		
		private function onRollOut(event:MouseEvent):void 
		{
			event.currentTarget.gotoAndStop(1);
		}
		
		private function onRollOver(event:MouseEvent):void 
		{
			event.currentTarget.gotoAndStop(2);
		}
		
		private function onClick(event:MouseEvent):void 
		{
			if (this.screenRegistro)
			{
				switch (event.currentTarget)
				{
					case this.screenRegistro.btnSi:
						this.screenRegistro.btnStatusSi.visible = !this.screenRegistro.btnStatusSi.visible;
						this.screenRegistro.btnStatusNo.visible = false;
						this.screenRegistro.btnStatusAmigos.visible = false;
						privacy = "OPEN"
						break;
					case this.screenRegistro.btnNo:
						this.screenRegistro.btnStatusNo.visible = !this.screenRegistro.btnStatusNo.visible;
						this.screenRegistro.btnStatusAmigos.visible = false;
						this.screenRegistro.btnStatusSi.visible = false;
						privacy = "CLOSED"
						break;
					case this.screenRegistro.btnAmigos:
						this.screenRegistro.btnStatusAmigos.visible = !this.screenRegistro.btnStatusAmigos.visible;
						this.screenRegistro.btnStatusSi.visible = false;
						this.screenRegistro.btnStatusNo.visible = false;
						privacy = "SECRET";
						break;
					case this.screenRegistro.btnAceptar:
						gameManager.facebookManager.sendToFriends();
						if (this.screenRegistro.parent)
							gameManager.main.stage.removeChild(this.screenRegistro)
						
						this.drawScreenFriends();
						break;
					case this.screenRegistro.btnStatus:
						if (this.screenRegistro.parent)
							gameManager.main.stage.removeChild(this.screenRegistro)
							
						this.drawStatusScreen();
						break;
				}
			}
			if (this.screenFriends)
			{
				switch (event.currentTarget)
				{
					case this.screenFriends.btnAceptar:
						///Mandar crear Evento en Facebook
						gameManager.facebookManager.createEvent(this.screenRegistro.txtName.text, "2012-09-09T19:00:00-0700", "2012-09-09T23:00:00-0700", this.screenRegistro.txtDescription.text,
																this.screenRegistro.txtLocation.text, privacy);

						gameManager.user.createEvent(this.screenRegistro.txtName.text, this.screenRegistro.txtDescription.text, "2012-09-09 19:00:00", "2012-09-09 23:00:00", 
													this.screenRegistro.txtLocation.text, privacy, "GENERICO");
						
						break;
					case this.screenFriends.btnStatus:
						if (this.screenFriends.parent)
							gameManager.main.stage.removeChild(this.screenFriends)
							
						this.drawStatusScreen();
						break;
				}
			}
			if (this.screenStatus)
			{
				switch (event.currentTarget)
				{
					case this.screenStatus.btnEditar:
						if (this.screenStatus.parent)
							gameManager.main.stage.removeChild(this.screenStatus)
							
						this.drawScreenEditEvent();
						break;
					case this.screenStatus.btnCrear:
						if (this.screenStatus.parent)
							gameManager.main.stage.removeChild(this.screenStatus)
							
						this.drawScreenEditEvent();
						break;
				}
			}
		}
	}

}