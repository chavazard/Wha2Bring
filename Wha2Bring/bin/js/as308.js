//var objetos=0;
var TDJ = "";
var enableErrorR = true;
var idu;
var allGifts;
var temporizador;
var usuariosSeleccionados=[];
var uriServer = "" + $("#baseh").val();
var guid;
var arrDataids=[];
var attributes = {
	id : "FacebookTutorial",
	name : "FacebookTutorial"
};

if(!initGame()) {

	setGame(true);

	//swfobject.embedSWF("https://secure.playfulplaysocial.mx/elchavo/WH.swf", "flashContent", "760", "600", "8.0", null, null, {
	swfobject.embedSWF(uriServer + "WH.swf", "flashContent", "760", "1300", "10.3", null, null, {
		allowFullscreen : "true",
    wmode : 'opaque',
		//base:"https://secure.playfulplaysocial.mx/elchavo/",
		base : uriServer,
		//base:"http://wpc.6dff.edgecastcdn.net/006DFF/elchavo/",
		allowScriptAccess : 'always',
		//allowFullscreen : "true",
		allowFullScreenInteractive: "true"
	}, {
		id : 'flashContent',
		name : 'flashContent',
		styleclass : 'myclass'
	});

}

function addGift(data, $ventanaObjetos) {

	var str = "";
	var l = data.length;

	for(var i = 0; i < l; i++) {
		str += "<div class='objetos'><div class='objetoBg'><img src='gifts/" + data[i].img + ".png' width='80' height='80' /> </div><br>" + data[i].name + "<form><input type='radio' id='regalo" + data[i].id + "' name='regalo" + data[i].id + "' value='" + data[i].name + "'  /></form></div>";
	}
	$ventanaObjetos.append(str);
	addEventCombo();
}

function addEventCombo() {
	$("#regalo1").on("click", function(event) {
		validarCheckBox(this, "silla");
	});
	$("#regalo2").on("click", function(event) {
		validarCheckBox(this, "cactus");
	});
	$("#regalo3").on("click", function(event) {
		validarCheckBox(this, "taza");
	});
	$("#regalo4").on("click", function(event) {
		validarCheckBox(this, "adorno-de-mesa");
	});
	$("#regalo5").on("click", function(event) {
		validarCheckBox(this, "florero");
	});
	$("#regalo6").on("click", function(event) {
		validarCheckBox(this, "silla-1");
	});
	$("#regalo7").on("click", function(event) {
		validarCheckBox(this, "cafetera-1");
	});
	$("#regalo8").on("click", function(event) {
		validarCheckBox(this, "tetera");
	});
	$("#regalo9").on("click", function(event) {
		validarCheckBox(this, "cojin");
	});
	$("#regalo10").on("click", function(event) {
		validarCheckBox(this, "radio");
	});
	$("#regalo11").on("click", function(event) {
		validarCheckBox(this, "mesita");
	});
	$("#regalo12").on("click", function(event) {
		validarCheckBox(this, "batidora");
	});
	$("#regalo13").on("click", function(event) {
		validarCheckBox(this, "mesa");
	});
	$("#regalo14").on("click", function(event) {
		validarCheckBox(this, "osito");
	});
}

var globalId;
function getId(iduser) {
	globalId = iduser;
}
/*
function sendToInboxI(data) {

	centerPopup();
	loadPopup();
	var fbquery = "SELECT name,uid FROM user WHERE uid=";
	var i = data.length;
	while(i--) {
		if(i === 0) {
			fbquery += data[i].id_facebook;
		} else {
			fbquery += data[i].id_facebook + ' OR uid=';
		}
	}

	FB.api({
		method : 'fql.query',
		query : fbquery
	}, function(response) {
		var $datawrapper = $("#data-wrapper");
		agregarTipoSolicitud("Invitaciones");
		if(response !== null) {
			if(response.error === undefined) {
				var i = data.length;
				var str = "";
				while(i--) {
					for(var j = 0; j < response.length; j++) {
						if(data[i] !== undefined && response[j] !== undefined) {
							if(data[i].id_facebook === response[j].uid) {
								var obj = {
									nombreImg : "https://graph.facebook.com/" + data[i].id_facebook + "/picture",
									mensaje : "  " + response[j].name + "  te ha invitado",
									id_facebook : data[i].id_facebook,
									request : data[i].id_request,
									id_user : data[i].id_user
								}
								str += "<div id=mensaje" + solicitudes + "-" + mensajes + " class='message-wrapper'><div class='img-wrapper'><img src=" + obj.nombreImg + " /></div><p class='message-Info'>" + obj.mensaje + "</p><div class='btn-wrapperAceptar'><a href='#' name=mensaje" + solicitudes + "-" + mensajes + " id=botonM" + solicitudes + "-" + mensajes + " onclick='aceptarI(this," + obj.id_facebook + ");'></a></div><div class='btn-wrapperCancelar'><a  name=mensaje" + solicitudes + "-" + mensajes + " onclick='cancelarI(this," + obj.id_user + ");'></a></div></div>";
								mensajes++;

							}
						}
					}
				}
				$(str).appendTo("#data-wrapper");
			}
		}
	});
}

function sendToInboxR(data) {

	centerPopup();
	loadPopup();
	var fbquery = "SELECT name,uid FROM user WHERE uid=";
	var i = data.length;
	while(i--) {
		//console.log("Entrea al FOR");
		if(i !== 0) {
			fbquery += data[i].id_fb_sender + ' OR uid=';
		} else {
			fbquery += data[i].id_fb_sender;
		}
	}

	FB.api({
		method : 'fql.query',
		query : fbquery
	}, function(response) {
		agregarTipoSolicitud("Regalos");
		var i = data.length;
		var str = "";
		while(i--) {
			for(var x in response) {
				if(data[i].id_fb_sender === response[x].uid) {
					var obj = {
						nombreImg : "https://graph.facebook.com/" + data[i].id_fb_sender + "/picture",
						nombreRegalo : data[i].vc_gift_img,
						mensaje : "  " + response[x].name + "  te ha enviado un regalo",
						id_facebook : data[i].id_fb_sender,
						request : data[i].id_gift_request
					};
					var url = uri + "gifts/" + obj.nombreRegalo + ".png";
					str += "<div id=mensaje" + solicitudes + "-" + mensajes + " class='message-wrapper'><div class='img-wrapper'><img src=" + obj.nombreImg + " /><img src='" + url + "' height='51' width='51'></div><p class='message-Info'>" + obj.mensaje + "</p><div class='btn-wrapperAceptar'><a href='#' name=mensaje" + solicitudes + "-" + mensajes + " id=botonR" + solicitudes + "-" + mensajes + " onclick='aceptarR(this," + obj.request + ");'></a></div><div class='btn-wrapperCancelar'><a  name=mensaje" + solicitudes + "-" + mensajes + " onclick='cancelarR(this," + obj.request + ");'></a></div></div>"
					mensajes++;
					break;
				}
			}
		}
		$(str).appendTo("#data-wrapper");
	});
}*/
/*
function inboxEmptyI() {
	centerPopup();
	loadPopup();
	agregarTipoSolicitud("Invitaciones");
	var str = "";
	str = "<div id=mensaje" + solicitudes + "-" + mensajes + " class='message-wrapper'><p class='message-Info'>No tienes invitaciones el dia de hoy</p></div>";
	$(str).appendTo("#data-wrapper");
	mensajes++;
}

function inboxEmptyR() {
	centerPopup();
	loadPopup();
	agregarTipoSolicitud("Regalos");
	var str = "";
	str = "<div id=mensaje" + solicitudes + "-" + mensajes + " class='message-wrapper'><p class='message-Info'>No tienes regalos el dia de hoy</p></div>";
	$(str).appendTo("#data-wrapper");
	mensajes++;
} */

function sendToGameTab() {
	var $flashContent = $("#flashContent");
	$("#barraSuperior ul li a").removeClass("current");
	$(this).addClass("current");
	$(".tab_content:not(#top1)").hide();
	$("#top1").css({
		"height" : "0",
		"visibility" : "hidden"
	});
	$flashContent.css("visibility", "visible");

	var activeTab = "#top1";
	$(activeTab).fadeIn();
	var idName = $(activeTab).closest("li").attr("id");
	if(idName !== "topnav-1") {
		$(activeTab).show();
	} else {
		$(activeTab).removeAttr("style");
		$flashContent.css("visibility", "visible");
	}
}

function compraMovil() {

	var price = 9;
	TDJ = "" + price;
	var title = "Tortas de Jamón";
	var desc = "Compra de " + TDJ + " Tortas de Jamón";

	var img_url = uri + "gifts/regaloSorpresa.png";
	var product_url = uri + "gifts/regaloSorpresa.png";
	var order_info = {
		"title" : title,
		"description" : desc,
		"price" : price,
		"image_url" : img_url,
		"product_url" : product_url
	};

	// calling the API ...
	var obj = {
		method : 'pay',
		order_info : order_info,
		purchase_type : 'item',
		tdj : TDJ,
		dev_purchase_params : {
			'oscif' : false
		}
	};

	FB.ui(obj, callback);

}

/*********** Enviar invitaciones de la aplicación a amigos ***********///
function sendRequestToManyRecipients() {
  usuariosSeleccionados=[];
  //var cont=0;
  //var cont1=0;
 // var cont2=0;
  if(numSeleccionados>20 && $("#enviarInvitacionBtn").length>0)
  {
    openPopUp("Solo puedes enviar un maximo de 20 amigos a la vez!!", 2);      
    return;
  }else if(numSeleccionados>0)
  {
    	var flashMoviex = window.document.flashContent;
  	  var farmPasa=false;
      for(var key in lista)
      {
          if(lista[key].seleccionado==true)
          {
              //console.log("ENTRE  VECES X"+cont);
              //cont++;
              var keyParsed=0;
              keyParsed=parseInt(key.charAt(0));
              //console.log("keyParsed "+keyParsed);
              switch(estActllenado)
              {
                 case llenarState.regalos:
                  if(keyParsed==listaKeys.regalos)
                  {
                    flashMoviex.sendGiftJS(lista[key].uid, miseleccion.substr(6));
                    lista[key].seleccionado=false;
                    numSeleccionados--;
                  }
                 break;
                 case llenarState.amigos:
                  if(keyParsed==listaKeys.amigos)
                  {
                    usuariosSeleccionados.push(lista[key].uid);
                    //callbackInvitation(fbId,"X","farming");
                    flashMoviex.sendInvitation(lista[key].uid, 0);
                  }
                break;
                 case llenarState.usando:
                    if(keyParsed==listaKeys.usando)
                    {                           
                        usuariosSeleccionados.push(lista[key].uid);
                        flashMoviex.sendInvitation(lista[key].uid, 0);                                            
                    }
                break;
                case llenarState.usandoTodos:
                  if(keyParsed==listaKeys.usandoTodos)
                    {
                      if(eventoPasado=="enviarRegaloBtn" || eventoPasado=="enviarInvitacionRegaloBtn")
                      {
                        //console.log("ENTRE AL CASO REGALO"+cont2);
                        
                        //estActllenado=llenarState.regalos;
                        flashMoviex.sendGiftJS(lista[key].uid, miseleccion.substr(6));
                        lista[key].seleccionado=false;
                        numSeleccionados--;
                        
                      } 
                      if(eventoPasado=="enviarInvitacionFarmingBtn")
                      {
                        farmPasa=true;
                        usuariosSeleccionados.push(lista[key].uid);
                        lista[key].seleccionado=false;
                      }                  
                    }
                break;
               case llenarState.farming:
                  farmPasa=true;
                  if(keyParsed==listaKeys.regalos)
                  {
                    usuariosSeleccionados.push(lista[key].uid);
                    //callbackInvitation(fbId,"X","farming");
                  }
                break; 
              }
          }
            
      }
      if(eventoPasado=="enviarRegaloBtn" || estActllenado== llenarState.regalos || eventoPasado=="enviarInvitacionRegaloBtn")
      {
            playTab();
        		closeInvitacion();
            eventoPasado="";
            ventaActivaRegalos=false;
      }
        
       if(farmPasa==true)
       {
          callbackInvitation(fbId,"X","farming");
       }
  }
  else if(numSeleccionados<=0)
  {
      switch(estActllenado)
     	{
        case llenarState.amigos:
        case llenarState.usando:
          openPopUp("Selecciona al menos un amigo para invitar!!", 2);
        break;
        case llenarState.regalos:
          openPopUp("Selecciona al menos un amigo para enviarle un regalo!!", 2);
        break;
        case llenarState.farming:
          openPopUp("Selecciona al menos un amigo para pedirle ayuda!!", 2);
        break;
      }
  }
	
}

function callbackInvitation(fbid, Idu,estado) {
           	if(estado!="farming")
            {
              idu = Idu;
            }
            
            switch(estado)
            {
              case "farming":
                if(eventoPasado!="enviando")
                {
                  FB.ui({
              			method : 'apprequests',
              			message : 'te han pedido ayuda para La Vecindad de El Chavo',
              			data : "whatever",
              			to : usuariosSeleccionados
              		}, requestCallbackFarming);
                }               
              eventoPasado="enviando";
              break;
              case "amigos":
                if(eventoPasado!="enviando")
                {
                    FB.ui({
              			method : 'apprequests',
              			message : 'Has recibido una solicitud en La Vecindad de El Chavo',
              			data : "whatever",
              			to : usuariosSeleccionados
              		}, requestCallback);
                }
                eventoPasado="enviando";
              break;
            }
            
}


function requestFriendError() {

	openPopUp("¡Chanfle! La invitación no fue enviada. Inténtalo de nuevo más tarde.", 3);
}
function requestCallbackFarming(response)
{
  var str="";
	var flashMoviex = window.document.flashContent;
	if(response) {
	 var i = response.to.length;
   while(i--) {
			if(response.to[i] !== undefined && response.to[i] !== null) {
				flashMoviex.saveInvitationJS(response.to[i], response.request);
			}
		}
    $("#checkBoxFriendForm div").remove();
    for(var key in lista )
     {
          if(lista[key].seleccionado==true)
          {
            lista[key].seleccionado=false;
            numSeleccionados--;
          }           
          str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
     }
    $(str).appendTo("#checkBoxFriendForm");
    $("#friendSelected ul li").remove();
		playTab();
    numSeleccionados=0;
    eventoPasado="NADA";
    numSeleccionados=0; 
    closeInvitacion(); 
  }
  else
  {
  //No Hubo respuesta
    playTab();
    numSeleccionados=0;
    eventoPasado="NADA";
    numSeleccionados=0; 
    closeInvitacion();
  }
}
function requestCallback(response) {
  var str="";
	var flashMoviex = window.document.flashContent;
	if(response) {
		var i = response.to.length;
		while(i--) {
			if(response.to[i] !== undefined && response.to[i] !== null) {
				flashMoviex.updateInvitationRequestJS(response.to[i], response.request);
			}
		}
   $("#checkBoxFriendForm div").remove();
   for(var key in lista )
   {
        if(lista[key].seleccionado==true)
        {
          lista[key].seleccionado=false;
          delete lista[key];
          numSeleccionados--;
        }  
        if(typeof lista[key] !="undefined")
        {
          str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
        }         
   }
    $(str).appendTo("#checkBoxFriendForm");
    $("#friendSelected ul li").remove();
		playTab();
    numSeleccionados=0;
    eventoPasado="NADA";
    numSeleccionados=0; 
    closeInvitacion();
	} else {
		var jl = usuariosSeleccionados.length;
   	eventoPasado="NADA";
    while(jl--) {
			if(usuariosSeleccionados[jl] !== null && usuariosSeleccionados[jl] !== undefined) {
				flashMoviex.deleteRequestJS(usuariosSeleccionados[jl]);
			}
		}
		flashMoviex.updateRequestsJS();
	  
  }

}




function placeOrder(prices) {

	switch(prices) {
		case "9":
			TDJ = "9";
			break;
		case "20":
			TDJ = "20";
			break;
		case "50":
			TDJ = "55";
			break;
		case "200":
			TDJ = "240";
			break;
		case "500":
			TDJ = "675";
			break;
		case "1000":
			TDJ = "1500";
			break;
	}

	var title = TDJ + " Tortas de Jamón";
	var desc = "Compra de " + TDJ + " Tortas de Jamón";
	var price = prices;
	var img_url = uri + "gifts/regaloSorpresa.png";
	var product_url = uri + "gifts/regaloSorpresa.png";
	var order_info = {
		"title" : title,
		"description" : desc,
		"price" : price,
		"image_url" : img_url,
		"product_url" : product_url
	};
	
	// calling the API ...
	var obj = {
		method : 'pay',
		order_info : order_info,
		purchase_type : 'item',
		dev_purchase_params : {
			'oscif' : false
		}
	};

	FB.ui(obj, callback);

}

function myTab(num) {

	var myTemp = "";
	switch(num) {
		case "1":
			myTemp = "top1";
			break;
		case "2":
			myTemp = "top2";
			break;
		case "3":
			myTemp = "top3";
			break;
	}

	if(!$.browser.msie) {
		$(".tab_content:not(#top1)").hide();
		$("#top1").css("height", "0");
	} else {
		$(".tab_content:not(#top1)").hide().css("height", "0");
	}

	$("#" + myTemp).removeAttr("style");
	$("#" + myTemp).show();

}

var callback = function(data) {

	var temp = parseInt(TDJ, 10);
	if(data['order_id']) {
		if(data['status'] === 'settled') {
			var flashMovie = document.getElementById("flashContent");
			flashMovie.sendToBuy(temp);
		}
	}
	if(data['error_code']) {
		quitarHovers();
		agregarHovers("top1");
		$('#topnav-1 a').css({
			backgroundPosition : '0px -32px'
		});
		$('#topnav-4 a').css({
			backgroundPosition : '-285px 0px'
		});
		showTab("#top1");
	}

};
//Es el que debo de checar.
(function($) {
	jQuery(document).ready(function() {
		var $ = jQuery.noConflict();

		$('input[name="firstname"]').search('#checkBoxFriend form div', function(on) {
			on.all(function(results) {

				var size = results ? results.size() : 0;
			});

			on.reset(function() {
				$('#checkBoxFriend form div').show();
			});

			on.empty(function() {
				$('#checkBoxFriend form div').show();
			});

			on.results(function(results) {
				$('#checkBoxFriend form div').hide();
				results.show();
			});
		});
    
    $('input[name="nombreT"]').search('#amigosTransTortas form div', function(on) {
			on.all(function(results) {

				var size = results ? results.size() : 0;
			});

			on.reset(function() {
				$('#amigosTransTortas form div').show();
			});

			on.empty(function() {
				$('#amigosTransTortas form div').show();
			});

			on.results(function(results) {
				$('#amigosTransTortas form div').hide();
				results.show();
			});
		}); 
	
  });
})(jQuery);

function yaEnvieR() {

	if(enableErrorR) {
		openPopUp("Recuerda,solo puedes enviar un regalo por dia a cada uno de tus amigos.", 2);
	}
	enableErrorR = false;
	closeRegalos();
}

function RefreshPage() {

	window.location.reload();
}

function invitationStatus(data) {
	filtro=[];
  for(var i = 0; i < data.length; i++) {
		switch(data[i].b_request)
		{
			case "0":
        filtro[""+data[i].id_facebook]=data[i].id_facebook;
			break;
			case "1":
				filtro[""+data[i].id_facebook]=data[i].id_facebook;
				cancelRequest(data[i].id_request, data[i].id_facebook);
			break;
			case "2":
				filtro[""+data[i].id_facebook]=data[i].id_facebook;
				//cancelRequest(data[i].id_request, data[i].id_facebook);
			break;
		}
		
	}
}

function enableMyInterface(temp) {
	enableInterface = temp;
  if($("#hidd").val() == "nothing")
  {
      $("#sendEstampas").hide();
      
  }
  else
  {
    var flashMoviez = window.document.flashContent;
	  flashMoviez.compareWishlistJS($("#hidd").val());
  }
}

function playTab() {
	quitarHovers();
	listo("x");
	agregarHovers("top1");
	iluminarTab(1);
	showTab("#top1");
}

function cancelRequest(requestToRemoveID, facebookId) {
	requestToRemoveID = requestToRemoveID + "_" + fbId;
	//console.log( requestToRemoveID );

	//FB.api(requestToRemoveID, 'DELETE', function(response) {
	//	console.log(response);
	//});
}

function redirect(id, perms, uri) {

	var params = window.location.toString().slice(window.location.toString().indexOf('?'));
	top.location = 'https://graph.facebook.com/oauth/authorize?client_id=' + id + '&scope=' + perms + '&redirect_uri=' + uri + params;
}

function redirectCredits(id, perms, uri) {
	var params = window.location.toString().slice(window.location.toString().indexOf('?'));
	top.location = 'https://secure.playfulplaysocial.mx/elchavo/index.php';
}

function sendFriends() {
	//	quitarInvitados();
	$('#topnav-3 a').css({
		backgroundPosition : '-190px -32px'
	});
	if(!$.browser.msie) {
		//alert("ENTRE");
		$(".tab_content:not(#top1)").hide().css("height", "0");
		$("#top1").css("height", "0");
	} else {
		showTab("#top1");
		myTab("3");
	}
	$("#header-invitacion img").attr("src", uri + "images/invitarAmigos-header.png");
	$("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionBtn");
	$('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");

	showTab("#top3");
}

function retriveFriendsJS(friends) {
	$("#header-invitacion img").attr("src", uri + "images/invitarAmigos-header.png");
	$('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");
	$("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionBtn");
	for(var f = 0; f < friends.length; f++) {
		if(!llenarPantallaAmigos)
    {
      llenarAmigos(friends[f].uid, friends[f].first_name,friends[f].last_name,llenarState.amigos);
      llenarAmigos(friends[f].uid, friends[f].first_name,friends[f].last_name,llenarState.regalos);
           	
    }
  }
  llenarPantallaAmigos=true;

}
var disableRetrivePlayerFriendsJS=false;

function retrivePlayerFriendsJS(friends)
{
    if(disableRetrivePlayerFriendsJS===false)
    {
      for(var f = 0; f < friends.length; f++) {
       if(typeof friends[f]!="undefined")
       {
          //console.log("FFFFF :"+f);          
          llenarAmigos(friends[f].uid, friends[f].first_name,friends[f].last_name,llenarState.usandoTodos);
          llenarAmigos(friends[f].uid, friends[f].first_name,friends[f].last_name,llenarState.usando);
          llenarAmigos(friends[f].uid, friends[f].first_name,friends[f].last_name,llenarState.transTortas); 
          //console.log("FFFFF X:"+f);
       }      
  	  }
    }
    disableRetrivePlayerFriendsJS=true;    
}

function retriveGits(data) {
	allGifts = data;
}

function retrivefbUser(data) {
	fbId = data;
	$("#faceid").val(data);
}

function sendToHelp() {
	$('#topnav-7 a').css({
		backgroundPosition : '-570px -32px'
	});
	if(!$.browser.msie) {
		$(".tab_content:not(#top1)").hide().css("height", "0");
		$("#top1").css("height", "0");
	}
	showTab("#top7");
}

function sendToGifts() {

	$('#topnav-2 a').css({
		backgroundPosition : '-95px -32px'
	});
	if(!$.browser.msie) {
		//alert("ENTRE");
		$(".tab_content:not(#top1)").hide().css("height", "0");
		$("#top1").css("height", "0");
	} else {
		showTab("#top1");
		myTab("2");
	}
	var str = "<div id='ventanaObjetos'></div>";
	$(str).appendTo("#fondoRegalo");
	var l = allGifts.length;
	var $ventanaObjetos = $('#ventanaObjetos');
	var struct = [];

	for(var i = 0; i < l; i++) {
		var obj = {
			name : allGifts[i].vc_gift_name,
			id : allGifts[i].id_gift,
			img : allGifts[i].vc_img
		};
		struct.push(obj);
	}
	addGift(struct, $ventanaObjetos);
	var strx = "<div id='enviarRegaloBtn'></div><div id='cancelarBtn'></div>";
	$(strx).appendTo("#fondoRegalo");
	var enviarRegaloBtn = $('#enviarRegaloBtn');
	enviarRegaloBtn.on('click', function(event) {  		
      if(eventoPasado!=event.target.id)
      {
        ventaActivaRegalos=true;
        estActllenado= llenarState.regalos;
        insertarAmigos(llenarState.regalos);
    		if(miseleccion !== "" && imgsrc !== "") {
    			objetos = 0;
    			var urlimgx = uri + "gifts/giftsGrandes/" + imgsrc + ".png";
    			imgsrc = urlimgx;
    			$('#objetoEnviado img').attr('src', imgsrc);
    			enviarRegaloBtn.off('click');
    			temporizador = setInterval("checar('" + urlimgx + "')", 500);
    		} else {
    			openPopUp("Escoge un regalo por favor!!", 2);
    		}
      }
      eventoPasado=event.target.id
	});
	var $cancelarBtn = $('#cancelarBtn');
	$cancelarBtn.on('click', function(event) {
		playTab();
		$('#ventanaObjetos').remove();
		enviarRegaloBtn.remove().off('click');
		$cancelarBtn.remove().off('click');
		eventoPasado=event.target.id;
    closeRegalos();
	});
	showTab("#top2");

}

function checar(urlimgx) {

	var str = "";
	str = $('#objetoEnviado img').attr('src');
	$('#ventanaObjetos').remove();
	$('#cancelarBtn').remove().off('click');
	$('#enviarRegaloBtn').off('click').remove();
	$('#foo').unbind('click');
	showMe();
	clearInterval(temporizador);

}

function showMe() {
	showTab("#top3");
	cambioRegalos();
}

function sendToBuyTab() {
	$("#top1").css("height", "0");
	if($.browser.msie) {
		showTab("#top1");
	}
	listo("x");
	modalWindow.close();
	quitarHovers();
	agregarHovers("top4");
	iluminarTab(4);
	$("#fondoPuntosFake").hide();

	showTab("#top4");
	$("#fondoTortas").css("top", "-630px;");
}

/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!
/***************************/

//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;

var test = "", buttonName = "";
var solicitudes = 0, mensajes = 0, popupStatus = 0, envio = 0;

//loading popup with jQuery magic!
function loadPopup() {
	//loads popup only if it is disabled
	if(popupStatus === 0) {
		envio = 1;
		$("#content-wrapper").fadeIn("slow");
		popupStatus = 1;
	}
}

//disabling popup with jQuery magic!
function disablePopup() {
	//disables popup only if it is enabled
	if(popupStatus === 1) {
		if(envio === 1) {
			$("#content-wrapper").fadeOut("slow");
			envio = 0;
		}
		popupStatus = 0;
	}
}

//centering popup
function centerPopup() {
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = 0;
	var popupWidth = 0;
	popupHeight = $("#content-wrapper").height();
	popupWidth = $("#content-wrapper").width();

	//centering
	$("#content-wrapper").css({
		"position" : "absolute",
		"top" : "130px",
		"left" : "14px"
	});
}

/*/////////////////FUNCIONES PARA EL POPUP////////////////////*/
function agregarTipoSolicitud(titulo) {
	solicitudes++;
	//mensajes = 0;
	//	alert(solicitudes)
	var str = "<h1 id=solicitud" + solicitudes + ">" + titulo + "</h1>";
	$(str).appendTo("#data-wrapper");

}

function resetInboxW() {

	var flashMoviey = window.document.flashContent;
	//flashMoviey.resetFlagInboxJS();
	$("#data-wrapper div").remove();
	$("#data-wrapper h1").remove();
	solicitudes = 0;
	mensajes = 0;

}



function enviarRegalo(data) {
	/*AQUI PON LO QUE VAYAS A PONER */

	var flashMoviex = window.document.flashContent;
	flashMoviex.enableHUDJS();
	resetInboxW();
	disablePopup();
	sendToGifts();
}

function listo(data) {
	var flashMoviex = window.document.flashContent;
	flashMoviex.enableHUDJS();
	/*AQUI PON LO QUE VAYAS A PONER */
	resetInboxW();
	disablePopup();
}
function getUGID(data)
{
    guid=data;
}

function getTot(data)
{
  tot=data;
  ctot=data;
  $("#transTotalNum").html(""+tot);
  $("#transParaTiNum").html(""+tot);
  activaTransTort();
}
function friendlist(data)
{
  //arrDataids=data;
  var temp=[];
  /*for(var i=0;i<temp.length;i++)
  {
  }*/
  //var cont=0;
  //numToTrans
  for(var i=0;i<arrTransTortas.length;i++)
  {
     for(var j=0;j<data.length;j++) 
     {
        if(arrTransTortas[i].uid==data[j].id_facebook)
        {
          temp[i]= [2];
          temp[i][0]=data[j].id_user;
          temp[i][1]=numToTrans[i];
           /*var obj=
           {
            data[j].id_user,
            numToTrans[i]
           };*/
           
           
        }
     }         
  }
  // id_user=
  // id_facebook=
  var flashMoviex = window.document.flashContent;
	flashMoviex.sendFriendPremiumJS(temp);

}
/*
 function renderMFS() {
 // First get the list of friends for this user with the Graph API
 FB.api('/me/friends', function(response) {
   var container = document.getElementById('mfs');
   var mfsForm = document.createElement('form');
   mfsForm.id = 'mfsForm';

   // Iterate through the array of friends object and create a checkbox for each one.
   for(var i = 0; i < Math.min(response.data.length, 10); i++) {
     var friendItem = document.createElement('div');
     friendItem.id = 'friend_' + response.data[i].id;
     friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
       + response.data[i].id
       + '" />' + response.data[i].name;
       mfsForm.appendChild(friendItem);
     }
     container.appendChild(mfsForm);

     // Create a button to send the Request(s)
     var sendButton = document.createElement('input');
     sendButton.type = 'button';
     sendButton.value = 'Send Request';
     sendButton.onclick = sendRequest;
     mfsForm.appendChild(sendButton);
   });
 }*/
