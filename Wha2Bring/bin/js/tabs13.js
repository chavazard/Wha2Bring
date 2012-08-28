// JavaScript Document

var lista = [], filtro = [],listaInbox=[];
var initswf = false,enableInterface = false,llenarPantallaAmigos=false;
var miseleccion = "", imgsrc = ""; 
var uri = "";
var eventoPasado="";
var contAmigo = 0, contAmigoRegalos = 0,contAmigosAplicacion=0,contAmigosTodos=0,estActllenado=0,numSeleccionados=0,contTransTortas=0;
var keyMsg="";
var fbId;
var bannerId=0;
var pestanaState= {"actual":0,"amigosCh":1,"amigosFb":2 };
var llenarState={"actual":0,"amigos":1,"regalos":2,"usando":3,"farming":4,"usandoTodos":5,"transTortas":6};
var listaKeys={"amigos":0,"regalos":1,"usando":2,"usandoTodos":3,"transTortas":4};
var tabsEstado={"notificaciones":1,"regalos":2,"produccion":3,"retos":4};
var numTipoElementos={"notificaciones":0,"regalos":0,"produccion":0,"retos":0};
var ventaActivaRegalos=false;
var tabAnterior=0;
var arrTransTortas=[];
var tot=0;
var ctot=0;
var numToTrans=[0,0,0,0,0];
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}




$(document).ready(function() {
	bannerId=8;
	
  /***********************Compra movil***************************///////
	
  //$("#graciasCompra").hide("fast");
	if($("#testing").val()==0)
  {
    uri = "https://secure.playfulplaysocial.mx/elchavo/";
  }
  else
  {
    uri = "http://testing.playfulplaysocial.mx:8080/elchavo/Juan/";
  }
  //showWish(null);
  
  if($("#closeAyuda").length > 0) {
		$("#closeAyuda").on("click", function(event) {
			playTabquitarHoverslisto(1);
			agregarHovers("top1");
			showTab("#top1");

		});
	}
	
	var $firstname = $("#firstname");
	if($("#firstname").length>0){
		$("#firstname").on("click", function(event) {
		$("#firstname").val("");
		});	
	}
	
	$(this).keydown(function(event) {
		if(event.keyCode === 9) {
			return false;
		} else {
			return true;
		}
	});

	$("#firstname,#pin").bind('keydown', function(event) {

		var target = event.target.id;

		switch(target) {
			case "firstname":
				switch(event.keyCode) {
					case 13:
						return false;

					case 8:
						if($("#firstname").val() === " " || $("#firstname").val() === "") {
							$('#checkBoxFriend form').hide();
						}
						break;
					default:
						$('#checkBoxFriend form').show();

				}
				break;
			case "pin":
				switch(event.keyCode) {
					case 32:
						return false;

					case 13:
						event.preventDefault();
						event.stopPropagation();
						if($("#pin").is(":visible"))
							submitForm();
						return false;

					default:
						return true;
				}
				break;
		}
	});




	if($("#bs1,#bs2,#bs3").length > 0)
	{
    $("#envEstampas,#canEstampas").on("click",
      function(event)
      {
        var flashMoviex = window.document.flashContent;
        var list= [];
        var target = event.target.id;
        switch(target)
        {
          case "envEstampas":
            if ($("#wish1").is(':checked')) {
                //console.log("1 checked"+$("#wish1").val());
                list.push(parseInt($("#wish1").val()));
            }
            if ($("#wish2").is(':checked')) {
                //console.log("2 checked"+$("#wish2").val());
                list.push(parseInt($("#wish2").val()));
            }
            if ($("#wish3").is(':checked')) {
                //console.log("3 checked"+$("#wish3").val());
                list.push(parseInt($("#wish3").val()));
            }
            if ($("#wish4").is(':checked')) {
                //console.log("4 checked"+$("#wish4").val());
                list.push(parseInt($("#wish4").val()));
            }
            if ($("#wish5").is(':checked')) {
                //console.log("5 checked"+$("#wish5").val());
                list.push(parseInt($("#wish5").val()));
            }  
          
          var d=new Date(0);
          d.setUTCSeconds(parseInt($("#hiddxo").val()));
          //console.log("FECHA AAAAAAAAAAAAAAAAAAAAAA"+d);
          d.addHours(24);
          var today= new Date();
          today=today.getTime()/1000;
          //d=parseInt(d);
          var x=d.getTime()/1000;
          if(list.length>=1)
          {
            if(guid!=$("#hidd").val())
            {
              if(compareDates(today,x)===true )
              {            
                flashMoviex.sendCollectibleJS($("#hidd").val(),list);          
                $(this).parent().hide();
              }
              else 
              {
                openPopUp("Este post ya caduco!!", 2);
              }
            }
            else
            {
                 openPopUp("No puedes enviarte estampas a ti mismo!!", 2);
            }
          }
          else
          {
                   openPopUp("No has seleccionado ninguna opcion!!", 2);
          }
          
          
          
          
          break;
          case "canEstampas":
             $(this).parent().hide();
          break;
        }
             
      }
    );
    
		$("#bs1,#bs2,#bs3").on("click", function(event) {
		if(enableInterface)
		{
			var target = event.target.id;
			var flashMoviex = window.document.flashContent;
	
			switch(target) {
				case "bs1":
          window.open("http://youtu.be/E8PjCRbvDDc","_blank");
					break;
				case "bs2":
          window.open("http://youtu.be/K8J8sszUtyQ","_blank");					
					break;
					case "bs3":
          window.open("http://youtu.be/LF4NepoG308","_blank");
					break;
			}
		}
		});
	
	  var numeroEstampas=0;
    /*$("#banner12").on("click",function(event){
      //$("#transTortas").show();
      //insertarAmigos(llenarState.transTortas);
      $("#sinoTxt").html(""+tot);
      $("#sinoTortas").show();
		  $("#pinFondo").show().animate({
			"opacity" : "0.40"
		  }, "slow"); 
    });*/
 
	$("#tarjeta-box").on("click", function(event) {
		$("#pinBg").show();
		$("#pinFondo").show().animate({
			"opacity" : "0.40"
		}, "slow");
	});

	$("#btnSiguiente").on("click", function(event) {
		$("#pinBg").hide();
		$("#tarjetaEspera").show();
		quitarTeclas();
		verifyCard();
	});

	$('#btnPaqueteCanjear').on("click", function(event) {
		redeemCard();
		$("#paqueteCanje").hide();
		$("#tarjetaEspera").show();
		quitarTeclas();
		$("#pin").val("");

	});

	$("#canjearOtraBtn").on("click", function(event) {
		$('#graciasCompra').hide();
		$('#pinBg').show();
	});

	$("#btnErrorCerrar").on("click", function(event) {
		$("#pin").val("");
		$('#errorTarjeta').hide();
		$('#pinBg').show();
	});
	$("#btnPinCerrar").on("click", function(event) {
		$("#pin").val("");
		$("#pinFondo").hide();
		$('#pinBg').hide();
	});

	$("#btnPaqueteCerrar,#btnPaqueteCancelar").on("click", function(event) {
		$("#pin").val("");
		$("#pinFondo").hide();
		$('#paqueteCanje').hide();
	});

	$("#graciasJuego").on("click", function(event) {
		$("#pinFondo").hide();
		$("#graciasCompra").hide();
		quitarHovers();
		agregarHovers("top1");
		showTab("#top1");
	});
	
  
  
   
   $("#sinoAceptarBtn,#sinoCancelarBtn,#sinoCerrar").on("click",
    function(event)
    {
      var target = event.target.id;
      switch(target)
      {
        case "sinoAceptarBtn":
          arrTransTortas=[];
          arrDataids=[];
          numToTrans=[0,0,0,0,0];
          $("#transTotalNum").html(""+tot);
          $("#transParaTiNum").html(""+tot);
          $("#transAmg ul li").remove();
          $("#seleccionTransTortas ul li").remove();
          $("#transTortas3Container ul li").remove();
          $("#transTortas2").show(); 
          $("#sinoTortas").hide();
        break;
        case "sinoCancelarBtn":
          $("#sinoTortas,#pinFondo").hide();
          estActllenado=0;
        break;
        case "sinoCerrar":
          $(this).parent().hide();
          $("#pinFondo").hide();
        break;
      }
    });
   
   
   
   $("#transAna,#transTCont,#transCerrar,#transReg").on("click",
   function(event)
   {
       var target = event.target.id;
       switch(target)
       {
          case "transAna":
            var str="";
            $("#transTortas").show();
              estActllenado=llenarState.transTortas;
              insertarAmigos(llenarState.transTortas);
              $(this).parent().hide();
              if(arrTransTortas.length>0)
              {
                $("#seleccionTransTortas ul li").remove();
                for(var i=0;i<arrTransTortas.length;i++)
                {
                    str += "<li  id=xx"+i+" class=xx" + i + "><a id=" + arrTransTortas[i].id + " href='#' onclick=restablecerAmigos('"+arrTransTortas[i].id+","+i+"');>" + arrTransTortas[i].name+" "+arrTransTortas[i].apellido+ "</a></li>";           
                }
                $(str).appendTo("#seleccionTransTortas ul");
              }
            
          break;
          case "transTCont":
            $("#transTortas3Container div").remove();
            var sum=0;
            var allInZero=false;
            if(arrTransTortas.length>0)
            { 
              var str="";           
                 for(var i=0;i<arrTransTortas.length;i++)
                {
                  if(numToTrans[i]>0)
                  {
                    sum+=numToTrans[i];
                    str += "<li id="+i+" class=" + i + "><div class='containerTrans2'><a id=" + i + " href='#'>" + arrTransTortas[i].name+" "+arrTransTortas[i].apellido+ "</a><div class='transTorta2'></div>"+
                    "<div class='transNum2'><div class='numTrans'>"+numToTrans[i]+"</div></div></div></li>";
                    allInZero=true;
                  }                 
                }
              $("#traTor3Txt").html(""+sum)
                            
              if(allInZero==true)
              {
                $(str).appendTo("#transTortas3Container ul");
                $("#transTortas3").show();
                $(this).parent().hide();
              }
              else
              {
                openPopUp("Regala tortas a uno de tus amigos por favor!!",2);
              }
              
            }
            else
            {
              openPopUp("Tienes que a\u00f1adir por lo menos a un amigo!!",2);
            }
                        
          break;
          case "transCerrar":
          case "transReg": 
           $(this).parent().hide();
           $("#pinFondo").hide();          
          break; 
       }
   }
   );
   $("#transAbrir,#transCancelar,#transCerrar1").on({
    click:function(event)
    {
      var target = event.target.id;
      switch(target)
      {
        case "transAbrir":
         
               $("#transAmg div,#seleccionTransTortas ul li,#formTransTortas div,#transAmg li").remove();
               estActllenado=llenarState.transTortas;
              insertarAmigos(llenarState.transTortas);
               var str="";
               $(this).parent().hide();
              
               for(var i=0;i<arrTransTortas.length;i++)
               {
                  str += "<li id="+i+" class=" + i + "><div class='containerTrans'><a id=" + i + " href='#' onclick=removeFromArrTot2(this);>" + arrTransTortas[i].name+" "+arrTransTortas[i].apellido+ "</a><div class='transTorta'></div>"+
                  "<div class='transNum'><div id='numTrans"+i+"' class='numTrans'>"+numToTrans[i]+"</div></div><div class='flechas'><div class='flechaArriba' onclick=aumentaTrans('"+i+"');></div><div class='flechaAbajo' onclick=disminuyeTrans('"+i+"');></div></div></div></li>";
               }
               $(str).appendTo("#transAmg ul");
              $("#pinFondo,#transTortas2").show();  

            
            break;
        case "transCancelar":
          delete arrTransTortas;
          arrTransTortas=[];
          $("#seleccionTransTortas ul li").remove();
          estActllenado=llenarState.transTortas;
          insertarAmigos(llenarState.transTortas);
        break;
        case "transCerrar1":
          $("#transTortas2").show();
          $("#transTortas").hide();
        break;
      }
    }
  });
   $("#traTor3Cerrar,#traTor3Regresar,#traTor3Confirmar").on("click",function(event)
   {
      
       var target = event.target.id;
       switch(target)
       {
          case "traTor3Cerrar":
           $(this).parent().hide();
           $("#pinFondo").hide();
          break;
          case "traTor3Regresar":
            $(this).parent().hide();
            $("#transTortas2").show();
          break;
          case "traTor3Confirmar":
           $(this).parent().hide();
           $("#pinFondo").hide();
           var temp=[];
           /* console.log("arrDataids length"+arrDataids.length);
            console.log("arrTransTortas length"+arrTransTortas.length);
           */       
           for(var i=0;i<arrTransTortas.length;i++)
           {
             temp.push(arrTransTortas[i].uid); 
             //console.log("arrDataids "+arrDataids[i].id_facebook); 
             //for(var j=0;j<arrTransTortas.length;j++)
             //{
             
                  /*console.log("arrTransTortas "+arrTransTortas[j].uid);
                  
                  if(arrTransTortas[j].uid==arrDataids[i].id_facebook)
                  {
                    console.log("ASSSSSSSSSSSSSSSSSSSSSSSDDDDDDDDDDDDDDDDDDDDDFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
                    var tempObj=
                    {
                      "user_id":arrDataids[i].id_friend,
                      "amount":numToTrans[j]
                    };
                    temp.push(tempObj);
                  }*/
             } 
           //}
           
           
           var flashMoviex = window.document.flashContent;
	         flashMoviex.getidUserJS(temp);
           //arrDataids
           //arrTransTortas
           //numToTrans 
          break; 
       }
   }); 
  
  $("#tabNotificaciones,#tabRegalos,#tabProduccion,#tabRetos,#textNotificaciones,#textRegalos,#textProduccion,#textRetos").on( 
  {
      mouseenter:function(event){
        var target = event.target.id;
        estateMachineInbox(target,$(this),"enter");
      },
      mouseleave:function(event){
        var target = event.target.id;
        estateMachineInbox(target,$(this),"leave");   
      },
      click:function(event){
        var target = event.target.id;
        tabAnterior=estateMachineInbox(target,$(this),"click");  
      }
    } 
    );
    
  
    
  
  var $cerrar = $("#cerrar");

	$cerrar.on({
		mouseenter : function() {
			$cerrar.css({
				'backgroundPosition' : '0px -19px',
				'top' : '-68px'
			});
		},
		mouseleave : function() {
			$cerrar.css({
				'backgroundPosition' : '0px 0px',
				'top' : '-70px'
			});
		},
		click : function(event) {
			playTab();
			$('#topnav-4 a').css({
				backgroundPosition : '-285px 0px'
			});
			showTab("#top1");
		}
	});
	
	
			$("#topnav-1,#topnav-2,#topnav-3,#topnav-4,#topnav-6,#topnav-7,#topnav-8,#conFoot").on("click", function(event) {
		var target = event.target.id;
		$("#popUpContainer,#popUpBg,#pinBg,#errorTarjeta,#graciasCompra,#paqueteCanje,#tarjetaEspera").hide();
		playTabquitarHoverslisto(2);
		modalWindow.close();
		if(enableInterface) {
			switch(target) {
				case "topnav-1x":
					agregarHovers("top1");
					iluminarTab(1);
					showTab("#top1");
					break;
				case "topnav-2x":
					disable = false;
					//insertarAmigosRegalos();
					agregarHovers("top2");
					iluminarTab(2);
					showTab("#top2");
					break;
				case "topnav-3x":
          eventoPasado="topnav-3x";
          estActllenado=llenarState.amigos;
					insertarAmigos(llenarState.amigos);
					if($.browser.msie) {
						showTab("#top1");
					}
					$('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");
					agregarHovers("top3");
					iluminarTab(3);
					showTab("#top3");
					break;
				case "topnav-4x":
					if($.browser.msie) {
						showTab("#top1");
					}
					agregarHovers("top4");
					iluminarTab(4);
					showTab("#top4");
					break;

				case "topnav-6x":
					if($.browser.msie) {
						showTab("#top1");
					}
					showTab("#top6");
					agregarHovers("top6");
					iluminarTab(6);
					$("#fondoPuntosFake").hide();
					$('#topnav-1 a').css({
						backgroundPosition : '0px 0px'
					});
					break;
				case "topnav-7x":
					if($.browser.msie) {
						showTab("#top1");
					}
					agregarHovers("top7");
					iluminarTab(7);
					window.open(uri + "AyudaTuto.html");
					break;
				case "topnav-8x":
					if($.browser.msie) {
						showTab("#top1");
					}
					agregarHovers("top8");
					iluminarTab(8);
					showTab("#top8");
					break;
				case "conFoot":
					if($.browser.msie) {
						$(".tab_content:not(#top1)").hide().css("height", "0");
						showTab("#top1");
					} else {
						$("#barraSuperior ul li a").removeClass("current");
						$(".tab_content:not(#top1)").hide().css("height", "0");
						$("#top1").css("height", "0");

					}
					agregarHovers("top6");
					iluminarTab(6);
					showTab("#top6");
					break;
			}
		}
	});

	$("#topnav-5").on("click", function(event) {
		$("#popUpContainer,#popUpBg,#pinBg,#errorTarjeta,#graciasCompra,#paqueteCanje,#tarjetaEspera").hide();
		if(enableInterface) {
			if($.browser.msie) {
				showTab("#top1");
			}
			playTabquitarHoverslisto(2);
			agregarHovers("top5");
			iluminarTab(5);
			$("#top5").removeAttr("style");

		}
	});
		
	}
	
	if(!$.browser.msie) {
		$(".tab_content:not(#top1)").hide();
		$("#top1").css("height", "0").css("visibility", "hidden");
		$("#flashContent").css("visibility", "hidden");
		$("#barraSuperior ul li:first a").addClass("current");
		$("#barraSuperior ul li:first a.current").show();
		$(".tab_content:first").removeAttr("style");
		$("#flashContent").css("visibility", "visible");
	} else {
		$(".tab_content").hide();
		$("#barraSuperior ul li:first a").addClass("current");
		$("#barraSuperior ul li:first a.current").show();
		$("#top1").show();
	}
	if($.browser.safari) {
		document.cookie = "ClickyCookie=yes;";
		if(document.cookie.indexOf("ClickyCookie=") === -1) {
			document.write("<html><head></head>");
			document.write("<body><img src='https://secure.playfulplaysocial.mx/elchavo/images/javascriptError.png' /></body>");
			document.write("</html>");
		}
	}
	$(".tab_content:not(#top1)").hide();
	$("#top1").css({
		"height" : "0",
		"visibility" : "hidden"
	});
	$("#barraSuperior ul li:first a").addClass("current");
	$("#barraSuperior ul li:first a.current").show();
	$(".tab_content:first").removeAttr("style");
	


	$("#enviarInvitacionBtn,#enviarInvitacionRegaloBtn,#enviarInvitacionFarmingBtn").on("click", function(event) {
      if(eventoPasado!=event.target.id)
      {
        $("#amigosFb").css('backgroundPosition', '0px 0px');
        $("#amigosCh").css('backgroundPosition', '-152px 0px');
        pestanaState.actual=0;
  			var $firstname = $("#firstname");
  			$firstname.val("Escribe el nombre de un amigo.");
  			switch(event.currentTarget.id) {
  				case "enviarInvitacionBtn":
          case "enviarInvitacionRegaloBtn":
          case "enviarInvitacionFarmingBtn":          
            usuariosSeleccionados=[];
  					$firstname.val("Escribe el nombre de un amigo.");
  					eventoPasado=event.target.id; 
            sendRequestToManyRecipients();
  				break;
  			}
      }    
          
	});

	$("#comprarTortasBtn20,#comprarTortasBtn50,#comprarTortasBtn200,#comprarTortasBtn500,#comprarTortasBtn1000").on("click", function(event) {//placeOrder("20");
		var target = event.target.id;
		var substr=target.substring(16,target.length);
    placeOrder(substr);
	});
  
	$("#celular-box").on("click", function(event){
		$("#pinFondo").show().animate({
			"opacity" : "0.40"
		}, "slow");
		$("#div-compraMovil,#botonCompraMovilRegresar,#botonCompraMovilContinuar").show();	
	});
	$("#botonCompraMovilRegresar").on({
		click : function(event){
			$("#pinFondo,#div-compraMovil").hide();	
		},
		mouseleave : function(event) {
			$(this).css('backgroundPosition', '0px 0px');
		},
		mouseenter : function(event) {
			$(this).css('backgroundPosition', '0px -40px');
		}
	});
	$("#botonCompraMovilContinuar").on({
		
		click : function(event){
		compraMovil();	
		},
		mouseleave : function(event) {
			$(this).css('backgroundPosition', '0px 0px');
		},
		mouseenter : function(event) {
			$(this).css('backgroundPosition', '0px -40px');
		}
	});
	
	$("#amigosFb").on({
		
		click : function(event){
    $("#friendSelected ul li").remove();
     if(ventaActivaRegalos==true)
     {
        llenarState.actual=llenarState.regalos;
           insertarAmigos(llenarState.regalos);
     }
     else
     {
        llenarState.actual=llenarState.amigos;
        insertarAmigos(llenarState.amigos);
     }
     pestanaState.actual=pestanaState.amigosFb;
    $(this).css('backgroundPosition', '0px -29px');
    $("#amigosCh").css('backgroundPosition', '-152px 0px');
    var temp = $("#ventanaForma div#friendSelected").find("a");
  	if(temp.length > 0) {
  			var i = temp.length;
  			while(i--) {
  				restablecerAmigos(temp[i]);
  			}
  	}
   	},
		mouseleave : function(event) {
      if(pestanaState.actual===0)
			$(this).css('backgroundPosition', '0px 0px');
		},
		mouseenter : function(event) {
      if(pestanaState.actual===0)
			$(this).css('backgroundPosition', '0px -29px');
		}
	});
	
	$("#amigosCh").on({
    click : function(event){
      $("#friendSelected ul li").remove();
      eventoPasado="amigosCh";
      llenarState.actual=llenarState.usando;
    	pestanaState.actual=pestanaState.amigosCh;
      $("#amigosFb").css('backgroundPosition', '0px 0px');
      $(this).css('backgroundPosition', '-152px -29px');
      var temp = $("#ventanaForma div#friendSelected").find("a");
  		if(temp.length > 0) {
  			var i = temp.length;
  			while(i--) {
  				restablecerAmigos(temp[i]);
  			}
  		}
     // $("#friendSelected").empty();
      if($("#enviarInvitacionBtn").length>0)
      {
        insertarAmigos(llenarState.usando);
      }
      if($("#enviarInvitacionFarmingBtn").length>0)
      {
        insertarAmigos(llenarState.usandoTodos);
      }
      if($("#enviarInvitacionRegaloBtn").length>0)
      {
        insertarAmigos(llenarState.usandoTodos);
      }
      
		},
		mouseleave : function(event) {
      if(pestanaState.actual===0)
			$(this).css('backgroundPosition', '-152px 0px');
		},
		mouseenter : function(event) {
      if(pestanaState.actual===0)
			$(this).css('backgroundPosition', '-152px -29px');
		}
	});
	
	
	$("#cancelarInvitacionBtn").on("click", function(event) {
		pestanaState.actual=0;
    numSeleccionados=0;
    $("#amigosFb").css('backgroundPosition', '0px 0px');
    $("#amigosCh").css('backgroundPosition', '-152px 0px');
    $("#firstname").val("Escribe el nombre de un amigo.");
		for(var key in lista )
    {
          if(lista[key].seleccionado==true)
          {
            lista[key].seleccionado=false;
            if(numSeleccionados>0)
            numSeleccionados--;
          }           
    }
    
    //console.log(""+numSeleccionados);
    playTab();
		closeInvitacion();
    eventoPasado=event.target.id
	});

	$("#barraSuperior ul li a").on("click", function(event) {
		var $flashContent = $("#flashContent");
		if(enableInterface) {
			if(!$.browser.msie) {
				$("#barraSuperior ul li a").removeClass("current");
				$(this).addClass("current");
				$(".tab_content:not(#top1)").hide().css("height", "0");
				$("#top1").css("height", "0");
			} else {
				$(".tab_content:not(#top1)").hide().css("height", "0");
				$(this).addClass("current");
			}

			var activeTab = $(this).attr("href");
			$(activeTab).fadeIn();
			var idName = $(this).closest("li").attr("id");

			if(idName === "topnav-2") {
				$('#ventanaObjetos').remove();
				$('#enviarRegaloBtn').unbind('click').remove();
				$('#cancelarBtn').unbind('click').remove();
				sendToGifts();
			}

			if(!$.browser.msie) {
				if(idName !== "topnav-1") {

					if(idName === "topnav-3") {
						$("#header-invitacion img").attr("src", uri + "images/invitarAmigos-header.png");
						//$("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionBtn");
						//$("#ventanaInvitacion div#cancelarInvitacionRegaloBtn").attr("id", "cancelarInvitacionBtn");
					}
					$(activeTab).show();
				} else {
					$(activeTab).removeAttr("style");
					$flashContent.css("visibility", "visible");
				}
			} else {
				if(idName === "topnav-3") {
					$("#header-invitacion img").attr("src", uri + "images/invitarAmigos-header.png");
					//$("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionBtn");
					//$("#ventanaInvitacion div#cancelarInvitacionRegaloBtn").attr("id", "cancelarInvitacionBtn");
				}
				$(activeTab).show();
			}
			$(activeTab).removeAttr("style");
			$flashContent.css("visibility", "visible");
		}
	});
	
});
function showTab(tab) {

	var activeTab = $(tab);
	var currentTab = tab;

	var idName = $(this).closest("li").attr("id");
  if(idName === "topnav-3" || currentTab === "#top3"  || currentTab === "topnav-2" || currentTab === "#top2") 
	{
    $("#friendSelected ul li").remove();
  }
	if(idName === "topnav-3" || currentTab === "#top3") {
		$("#header-invitacion img").attr("src", uri + "images/invitarAmigos-header.png");
		//$("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionBtn");
		//$("#ventanaInvitacion div#cancelarInvitacionRegaloBtn").attr("id", "cancelarInvitacionBtn");
	}
	if(idName !== "topnav-2" && currentTab !== "#top2") {
		$('#ventanaObjetos').remove();
		$('#enviarRegaloBtn').remove().unbind('click');
		$('#cancelarBtn').remove().unbind('click');

	}

	if(!$.browser.msie) {
		$("#barraSuperior ul li a").removeClass("current");
		$(this).addClass("current");
		$(".tab_content:not(#top1)").hide();
		$(activeTab).removeAttr("style");
		if(idName === "topnav-1" || currentTab === "#top1") {
			$("#flashContent").css("visibility", "visible");
		}
	} else {
		$("#barraSuperior ul li a").removeClass("current");
		$(".tab_content:not(#top1)").hide();
		$(activeTab).removeAttr("style").fadeIn().show();
	}
	$(activeTab).fadeIn();
}

function validarCheckBox(objeto, img) {
	imgsrc = img;
	miseleccion = objeto.id;
	var $objetos = $(".objetos form input");
	$objetos.click(function() {
		$objetos.removeClass("cbSeleccionado");
		$(this).addClass("cbSeleccionado");
		$("form").find(':input:not(.cbSeleccionado)').each(function() {
			this.checked = false;
		});
	});
}

/*Aqui se elimina el objeto checkbox seleccioando y se agrega en la pantalla de abajo de amigos seleccionados*/
function agregarAmigos(object) {
  $("#defaultText").hide();
  var str="";
  numSeleccionados++;
  
  //estActllenado=6;   
  switch(estActllenado)
  {
    case llenarState.amigos:
      $("." + object.id).remove();
      var key=""+listaKeys.amigos+""+object.id;
      lista[key].seleccionado=true;
      str = "<li class=" + object.id + "><a id=" + object.id + " href='#' onclick=restablecerAmigos('"+object.id+"');>" + lista[key].name+" "+lista[key].apellido+ "</a></li>";
      $(str).appendTo("#friendSelected ul");  
    break;
    case llenarState.regalos:
      $("." + object.id).remove();
      var key=""+listaKeys.regalos+""+object.id;
      lista[key].seleccionado=true;
      str = "<li class=" + object.id + "><a id=" + object.id + " href='#' onclick=restablecerAmigos('"+object.id+"');>" + lista[key].name+" "+lista[key].apellido+ "</a></li>";
      $(str).appendTo("#friendSelected ul");  
    break;
    case llenarState.usando:
      $("." + object.id).remove();
      var key="";
      key=""+listaKeys.usando+""+object.id;
      //console.log("KEY :"+key+" CONT :"+cont);
      lista[key].seleccionado=true;
      str = "<li class=" + object.id + "><a id=" + object.id + " href='#' onclick=restablecerAmigos('"+object.id+"');>" + lista[key].name+" "+lista[key].apellido+ "</a></li>";
      $(str).appendTo("#friendSelected ul");  
    break;
    case llenarState.usandoTodos:
      $("." + object.id).remove();
      var key="";
      key=""+listaKeys.usandoTodos+""+object.id;
      //console.log("KEY :"+key+" CONT :"+cont);
      lista[key].seleccionado=true;
      str = "<li class=" + object.id + "><a id=" + object.id + " href='#' onclick=restablecerAmigos('"+object.id+"');>" + lista[key].name+" "+lista[key].apellido+ "</a></li>";
       $(str).appendTo("#friendSelected ul");  
    break;
    case llenarState.farming:
       $("." + object.id).remove(); 
       var key=""+listaKeys.regalos+""+object.id;
       lista[key].seleccionado=true;
       
       str = "<li class=" + object.id + "><a id=" + object.id + " href='#' onclick=restablecerAmigos('"+object.id+"');>" + lista[key].name+" "+lista[key].apellido+ "</a></li>";
        $(str).appendTo("#friendSelected ul");  
    break;
    case llenarState.transTortas:
      // var temp=$("#seleccionTransTortas ul").find("li");
       if(arrTransTortas.length<=4)
       {
         $("." + object.id).remove(); 
         $("#defaultTextX").hide();
         var key=""+listaKeys.transTortas+""+object.id;
         lista[key].seleccionado=true;       
         arrTransTortas.push(lista[key]);
         $("#seleccionTransTortas ul li").remove();
         for(var i=0;i<arrTransTortas.length;i++)
         {
            str += "<li  id=xx"+i+" class=xx" + i + "><a id=" + arrTransTortas[i].id + " href='#' onclick=restablecerAmigos('"+arrTransTortas[i].id+","+i+"');>" + arrTransTortas[i].name+" "+arrTransTortas[i].apellido+ "</a></li>";           
         }        
          $(str).appendTo("#seleccionTransTortas ul");
       }
       else
       {
          $("." + object.id).children().prop("checked", false);  
          openPopUp("No puedes enviarle tortas a mas de 5 amigos!!", 2);
         
       }
              
    break;
  }
   
}



/*Aqui se quita el amigo de la ultima pantalla y se agrega de nuevo a la de enmedio con checkboxes*/
function restablecerAmigos(id) {
   numSeleccionados--;
   var str="";
  // $("#friendSelected ul li."+id).remove();
   //estActllenado=6;  
   switch(estActllenado)
   {
      case llenarState.amigos:
         $("#checkBoxFriendForm div").remove();
         //if(lista[key].seleccionado==true)
         var k=""+listaKeys.amigos+""+id;
         lista[k].seleccionado=false;   
         for(var key in lista )
         {            
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.amigos))
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              } 
         }
       $(str).appendTo("#checkBoxFriendForm");
      $("#friendSelected ul li." +id).remove();   
      break;
      case llenarState.regalos:
        $("#checkBoxFriendForm div").remove(); 
        var k=""+listaKeys.regalos+""+id;
         lista[k].seleccionado=false;  
        for(var key in lista )
        {
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.regalos))
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>"; 
              }         
       }
      $(str).appendTo("#checkBoxFriendForm");
      $("#friendSelected ul li." +id).remove();  
      break;
      case llenarState.usando:
         $("#checkBoxFriendForm div").remove();
        var k=""+listaKeys.usando+""+id;
         lista[k].seleccionado=false;  
        for(var key in lista )
        {
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.usando))
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }  
        }
       $(str).appendTo("#checkBoxFriendForm");
   $("#friendSelected ul li." +id).remove();  
      break;
      case llenarState.usandoTodos:
        $("#checkBoxFriendForm div").remove();
        var k=""+listaKeys.usandoTodos+""+id;
        lista[k].seleccionado=false;  
        for(var key in lista )
        {
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.usandoTodos))
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }  
        }
       $(str).appendTo("#checkBoxFriendForm");
       $("#friendSelected ul li." +id).remove();  
      break;
      case llenarState.farming:
         $("#checkBoxFriendForm div").remove();
         var k=""+listaKeys.regalos+""+id;
         lista[k].seleccionado=false;  
         for(var key in lista )
         {
                if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.regalos))
                {
                    str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>"; 
                }         
         }
        $(str).appendTo("#checkBoxFriendForm");
        $("#friendSelected ul li." +id).remove();   
      break;
      case llenarState.usandoTodos:
        $("#checkBoxFriendForm div").remove();
        var k=""+listaKeys.usandoTodos+""+id;
        lista[k].seleccionado=false;  
        for(var key in lista )
        {
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.usandoTodos))
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }  
        }
        $(str).appendTo("#checkBoxFriendForm");
       $("#friendSelected ul li." +id).remove();     
      break;
      case llenarState.transTortas:
        $("#formTransTortas div").remove();
        var st=""+id;
        var result = st.split(",");
        var k=""+listaKeys.transTortas+""+result[0];        
        lista[k].seleccionado=false;  
        removeFromArrTot(lista[k]);
        for(var key in lista )
        {
              if(lista[key].seleccionado==false && (parseInt(key.charAt(0))==listaKeys.transTortas) )
              {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }  
        }
     
      $(str).appendTo("#formTransTortas");
      $("#seleccionTransTortas ul li.xx" +result[1]).remove();         
      break;
   }
   
  
}




/*Aqui se llena el arreglo principal con los amigos del usuario*/
function llenarAmigos(id,nombre,apellido,estado) {
	//llenarState.actual=estado; 
  estActllenado=estado;
  var object = {
        		id : 0,
        		name : nombre,
        		apellido:apellido,
            uid : 0,
            seleccionado:false,
            key:"",
            visible:true
        	}
  switch(estActllenado)
  {
        case llenarState.amigos:
          $("#amigosFb").css('backgroundPosition', '0px -29px');
          var strKey=""+id;
          if((strKey in filtro)== false)
          {
            contAmigo++;
          	object.id=contAmigo;
          	object.uid=id;
            object.key=""+listaKeys.amigos+""+contAmigo;
            lista[""+listaKeys.amigos+""+contAmigo]=object;
          }  
        break;
        case llenarState.regalos:
          var strKey=""+id;
          contAmigoRegalos++;
        	object.id=contAmigoRegalos;
        	object.uid=id;
          object.key=""+listaKeys.regalos+""+contAmigoRegalos;
          lista[""+listaKeys.regalos+""+contAmigoRegalos]=object;
        break;
        case llenarState.usando:
          var strKey=""+id;
          if((strKey in filtro)== false)
          {
            contAmigosAplicacion++;
            object.id=contAmigosAplicacion;
            object.uid=id;
            object.key=""+listaKeys.usando+""+contAmigosAplicacion;
            //console.log("KEYES DE USANDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDo "+object.key);
            lista[""+listaKeys.usando+""+contAmigosAplicacion]=object;
          }
        break;
        case llenarState.usandoTodos:
          var strKey=""+id;
          contAmigosTodos++;
          object.id=contAmigosTodos;
          object.uid=id;
          object.key=""+listaKeys.usandoTodos+""+contAmigosTodos;
          lista[""+listaKeys.usandoTodos+""+contAmigosTodos]=object;          
        break;
        case llenarState.transTortas:
          var strKey=""+id;
          contTransTortas++;
          object.id=contTransTortas;
          object.uid=id;
          object.key=""+listaKeys.usandoTodos+""+contTransTortas;
          lista[""+listaKeys.transTortas+""+contTransTortas]=object;
          
          
        break;
         
  }
 }

/*Se utliza para llenar el form con la lista de amigos no invitados*/

function insertarAmigos(estado) {
  
  //llenarState.actual=estado;
  
  if(eventoPasado=="enviarRegaloBtn" || eventoPasado=="topnav-2x")
   {                                                         
       estActllenado=llenarState.regalos;
       estado= llenarState.regalos;
       ventaActivaRegalos=true;
   }else if(eventoPasado=="topnav-3x")
   {
      estActllenado=llenarState.amigos;
      estado= llenarState.amigos;
   } 
  
  var str = "";
  $("#amigosFb,#amigosCh").show();
  $("#checkBoxFriendForm div").remove();    
  switch(estado)
  {
      case  llenarState.amigos:
        $("#amigosFb").css('backgroundPosition', '0px -29px');
        $("#amigosCh").css('backgroundPosition', '-152px 0px');
        str="";
        $('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");  
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.amigos)
          		{
                	if((lista[key].uid  in filtro)== false)
                  {
                              str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
                  }
              }
        }
        if($("#enviarInvitacionFarmingBtn").length>0)
        {
            $("#ventanaInvitacion div#enviarInvitacionFarmingBtn").attr("id","enviarInvitacionBtn");
          $("#ventanaInvitacion div#cancelarInvitacionFarmingBtn").attr("id", "cancelarInvitacionBtn");
        }
        if($("#enviarInvitacionRegaloBtn").length>0)
        {
          $("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id","enviarInvitacionBtn");
          $("#ventanaInvitacion div#cancelarInvitacionRegaloBtn").attr("id", "cancelarInvitacionBtn");
                
        }
      $(str).appendTo("#checkBoxFriendForm");  
      break;
      case  llenarState.regalos:
        $("#amigosFb").css('backgroundPosition', '0px -29px');
        $("#amigosCh").css('backgroundPosition', '-152px 0px');

        str="";
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.regalos)
          		str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
        }
        if($("#enviarInvitacionFarmingBtn").length>0)
        {
          $("#ventanaInvitacion div#enviarInvitacionFarmingBtn").attr("id","enviarInvitacionRegaloBtn");
          $("#ventanaInvitacion div#cancelarInvitacionFarmingBtn").attr("id", "cancelarInvitacionRegaloBtn");
          
        }
        if($("#enviarInvitacionBtn").length>0)
        {
            $("#ventanaInvitacion div#enviarInvitacionBtn").attr("id","enviarInvitacionRegaloBtn");
          $("#ventanaInvitacion div#cancelarInvitacionBtn").attr("id", "cancelarInvitacionRegaloBtn");    
        }
      $(str).appendTo("#checkBoxFriendForm");  
      break;
      case  llenarState.usando:
      //$('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");
      str="";
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.usando)
              {
                if((lista[key].uid  in filtro)== false)
                {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
                }
              }
        }      
      $(str).appendTo("#checkBoxFriendForm");
      break;
      case llenarState.usandoTodos:
        str="";
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.usandoTodos)
              {
                str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }
        }
      $(str).appendTo("#checkBoxFriendForm");     
      break;
      case llenarState.farming:
        //$("#fondoInvitarAmigos").css('top', '-50px');
        $('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");  
        str="";
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.regalos)
          		{
                str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
              }
        }
      showTab("#top3");      
      /*if ($('#fondoInvitarAmigos').css('top') == '-50px')
      {
          console.log("llegue aqui");
         
         $("#fondoInvitarAmigos").css('top', '-610px');
      }
      else
      {
        console.log("llegue aca");
        $("#fondoInvitarAmigos").css('top', '-50px');
      }*/
      if($("#enviarInvitacionRegaloBtn").length>0)
      {
        $("#ventanaInvitacion div#enviarInvitacionRegaloBtn").attr("id", "enviarInvitacionFarmingBtn");
        $("#ventanaInvitacion div#cancelarInvitacionRegaloBtn").attr("id", "cancelarInvitacionFarmingBtn");
      }
      if($("#enviarInvitacionBtn").length>0)
      {
        $("#ventanaInvitacion div#enviarInvitacionBtn").attr("id", "enviarInvitacionFarmingBtn");
        $("#ventanaInvitacion div#cancelarInvitacionBtn").attr("id", "cancelarInvitacionFarmingBtn");      
      }
      if($.browser.mozilla) {
				$("#enviarInvitacionFarmingBtn").css('top','70px');
			}
      $("#top1").css({"height" : "0","visibility" : "hidden"});
      $("#fondoInvitarAmigos").css('top', '-610px');
      $("#amigosFb").css('backgroundPosition', '0px -29px');
      $("#amigosCh").css('backgroundPosition', '-152px 0px');  
      $('#objetoEnviado img').attr('src', uri + "images/objetoEnviado.png");  
      $("#fondoInvitarAmigos").css('top', '-50px');
      $(str).appendTo("#checkBoxFriendForm");     
      break;
      case llenarState.transTortas:
         str="";
         $("#formTransTortas div").remove();
         var pass=false;
        for(var key in lista)
        {
              if(parseInt(key.charAt(0))==listaKeys.transTortas)
          		{
                for(var i=0;i<arrTransTortas.length;i++)
                {
                    if(lista[key].id==arrTransTortas[i].id)
                    {
                      pass=true;
                    }
                }
                if(pass==false)
                {
                  str += "<div id=class" + lista[key].id + " class=" + lista[key].id + "><input id=" + lista[key].id + " type='checkbox' name=" + lista[key].name + " value=" + lista[key].uid + " onclick='agregarAmigos(this);'/>" + lista[key].name+" "+ lista[key].apellido+"<br /></div>";
                }
              }
              pass=false;
        }
      $(str).appendTo("#formTransTortas");  
      break;
  }
  
  estActllenado=estado;
}

function disableThis() {
	return false;
}

function initGame() {
	return initswf;
}

function setGame(estate) {
	initswf = estate;
}

function cambioRegalos() {
	$("#header-invitacion img").attr("src", uri + "images/enviarRegalo-header.png");
	//$("#ventanaInvitacion div#enviarInvitacionBtn").attr("id", "enviarInvitacionRegaloBtn");
	//$("#ventanaInvitacion div#cancelarInvitacionBtn").attr("id", "cancelarInvitacionRegaloBtn");
}



function closeRegalos() {
	var $top1 = $("#top1");
	var $flashContent = $("#flashContent");
	$('#ventanaObjetos').remove();
	objetos = 0;
	miseleccion = "";
	$("#barraSuperior ul li a").removeClass("current");
	$(this).addClass("current");
	$(".tab_content:not(#top1)").hide();
	$top1.css({
		"height" : "0",
		"visibility" : "hidden"
	});
	$flashContent.css("visibility", "visible");

	var activeTab = "#top1";
	$(activeTab).fadeIn();
	var idName = $("#top1").closest("li").attr("id");
	if(idName !== "topnav-1") {
		$top1.show();
	} else {
		$(activeTab).removeAttr("style");
		$flashContent.css("visibility", "visible");
	}
	miseleccion = "";
}

function closeInvitacion() {
	var $top1 = $("#top1");
	var $flashContent = $("#flashContent");
	$("#barraSuperior ul li a").removeClass("current");
	$(this).addClass("current");
	$(".tab_content:not(#top1)").hide();
	$top1.css({
		"height" : "0",
		"visibility" : "hidden"
	});
	$flashContent.css("visibility", "visible");
	var activeTab = "#top1";
	$(activeTab).fadeIn();
	var idName = $top1.closest("li").attr("id");
	if(idName !== "topnav-1") {
		$top1.show();
	} else {
		$(activeTab).removeAttr("style");
		$flashContent.css("visibility", "visible");
	}
	miseleccion = "";
}

function agregarHovers(seleccionado) {
	
  var $topnav1 = $('#topnav-1 a');
	if(seleccionado !== "top2") {
		$topnav1.on({
			mouseleave : function() {
				$topnav1.css('backgroundPosition', '0 0');
			},
			mouseenter : function() {
				$topnav1.css('backgroundPosition', '0 -32px');
			}
		});
	}

	var $topnav2 = $("#topnav-2 a");
	if(seleccionado !== "top2") {
		$topnav2.on({
			mouseleave : function() {
				$topnav2.css('backgroundPosition', '-95px 0');
			},
			mouseenter : function() {
				$topnav2.css('backgroundPosition', '-95px -32px');
			}
		});
	}

	var $topnav3 = $("#topnav-3 a");
	if(seleccionado !== "top3") {
		$topnav3.on({
			mouseleave : function() {
				$topnav3.css('backgroundPosition', '-190px 0');
			},
			mouseenter : function() {
				$topnav3.css('backgroundPosition', '-190px -32px');
			}
		});
	}

	var $topnav4 = $("#topnav-4 a");
	if(seleccionado !== "top4") {
		$topnav4.on({
			mouseleave : function() {
				$topnav4.css('backgroundPosition', '-285px 0');
			},
			mouseenter : function() {
				$topnav4.css('backgroundPosition', '-285px -32px');
			}
		});
	}

	var $topnav5 = $("#topnav-5 a");
	if(seleccionado !== "top5") {
		$topnav5.on({
			mouseleave : function() {
				$topnav5.css('backgroundPosition', '-380px 0');
			},
			mouseenter : function() {
				$topnav5.css('backgroundPosition', '-380px -32px');
			}
		});
	}

	var $topnav6 = $("#topnav-6 a");
	if(seleccionado !== "top6") {
		$topnav6.on({
			mouseleave : function() {
				$topnav6.css('backgroundPosition', '-475px 0');
			},
			mouseenter : function() {
				$topnav6.css('backgroundPosition', '-475px -32px');
			}
		});
	}

	var $topnav7 = $("#topnav-7 a");
	if(seleccionado !== "top7") {
		$topnav7.on({
			mouseleave : function() {
				$topnav7.css('backgroundPosition', '-570px 0');
			},
			mouseenter : function() {
				$topnav7.css('backgroundPosition', '-570px -32px');
			}
		});
	}

	var $topnav8 = $("#topnav-8 a");
	if(seleccionado !== "top8") {
		$topnav8.on({
			mouseleave : function() {
				$topnav8.css('backgroundPosition', '-665px 0');
			},
			mouseenter : function() {
				$topnav8.css('backgroundPosition', '-665px -32px');
			}
		});
	}

}

function quitarHovers() {
	$("#topnav li a").off('mouseenter').off('mouseleave');
  /*var i = 8;
	while(i--) {
		if(i !== 0) {
			$("#topnav-" + i + " a").off('mouseenter');
			$("#topnav-" + i + " a").off('mouseleave');
		}
	}*/
}

function openPopUp(texto, num) {

	//se agrega el fondo
	$("#popUpBg").css("top", "0px").css("opacity", "0px").show().animate({
		"opacity" : "0.40"
	}, "slow");


	var screenContent = "";
	switch(num) {
		case 1:
			screenContent = "<div id='errorTarjeta'>";
			screenContent = screenContent + "<div id='btnErrorCerrar'></div>";
			screenContent = screenContent + "<div id='errorTexto'>" + texto + "</div>";
			screenContent = screenContent + "</div>";
			break;
		case 2:
			screenContent = "<div id='alertaEnviarRegalo'>";
			screenContent = screenContent + "<p>" + texto + "</p>";
			screenContent = screenContent + "<div id='alertaAceptar'></div>";
			screenContent = screenContent + "</div>";
			break;
		case 3:
			screenContent = "<div id='errorTarjetaInvitacion'>";
			screenContent = screenContent + "<div id='btnErrorCerrarInvitacion'></div>";
			screenContent = screenContent + "<div id='errorTextoInvitacion'>" + texto + "</div>";
			screenContent = screenContent + "</div>";
			break;
	}

	
	$(screenContent).appendTo("#popUpContainer");
	//.load(function(){
	centerContent();

	switch(num) {
		case 1:
			$("#btnErrorCerrar").on("click", function(event) {
				eventoPasado=event.target.id;
        closePopUp();
			});
			break;
		case 2:
			$("#alertaAceptar").on("click", function(event) {
				enableErrorR = true;
				$("#bs3").on(bannerFunc);
				eventoPasado=event.target.id;
        closePopUp();
			});
			break;
		case 3:
			$("#btnErrorCerrarInvitacion").on("click", function(event) {
				var flashMoviex = window.document.flashContent;
				flashMoviex.disableMoreErrorsJS();
        eventoPasado=event.target.id;
				 playTab();
        closeInvitacion();
        closePopUp();
			});
			break;
	}

	//});
	
}

function centerContent() {
	var top = ($(window).height() - $("#popUpContainer").height()) >> 1;
	var left = ($(window).width() - $("#popUpContainer").width()) >> 1;

	$("#popUpContainer").css("top", top + $(document).scrollTop()).css("left", left).fadeIn();
}

function closePopUp() {
	$("#popUpBg , #popUpContainer").fadeOut("slow", function() {
		$("#popUpContainer").empty();
	});
}

function showError(from, errorMsg) {
	$("#tarjetaEspera").hide();
	$('#ErrorMsg p').html(errorMsg);
	from.hide();
	ponerTeclas();
	$('#errorTarjeta').show();
}

// Sends data to verify card before redeem
function verifyCard() {
	// get some values from elements on the page:
	var $form = $('#cardverifyForm');
	srcref = Math.floor(new Date().getTime() / 1000);
	pin = $form.find('input[name="pin"]').val();
	url = $form.attr('action');
	var $pinBg = $('#pinBg');
	var $cardredeemForm = $('#cardredeemForm');
	if(pin !== "" && pin !== null && pin !== undefined && !isNaN(pin)) {

		$.ajax({
			type : "post",
			url : url,
			data : {
				'srcref' : srcref,
				'pin' : pin
			},
			dataType : "json",
			beforeSend : function() {
			},
			timeout : 30000,
			error : function(request, error) {
				showError($pinBg, "Estamos teniendo problemas, vuelve a intentarlo m\u00e1s tarde");
			},
			success : function(data) {
				if(data !== null && data !== undefined) {
					if("error" in data) {
						// if 'error' is in response
						showError($pinBg, data['error']);
					} else {
						// setup next dialog box form elements, then show it
						$('#paqueteCanje span.facevalue').text(data['facevalue']);
						$('#paqueteCanje span.tdj').text(data['amount']);
						$cardredeemForm.find('input[name="pin"]').val(data['pin']);
						$cardredeemForm.find('input[name="srcref"]').val(data['srcref']);
						$cardredeemForm.find('input[name="facevalue"]').val(data['facevalue']);
						$cardredeemForm.find('input[name="fbid"]').val(data['userid']);
						$pinBg.hide();
						$("#tarjetaEspera").hide();
						ponerTeclas();
						$('#paqueteCanje').show();
					}
				} else {
					showError($pinBg, "Estamos teniendo problemas, vuelve a intentarlo m\u00e1s tarde");
				}

			}
		});
	} else {
		showError($pinBg, "Debes ingresar el c\u00f3digo para realizar tu transacci\u00f3n.");
	}
}

// Sends data to redeem card
function redeemCard() {
	var $pinBg = $('#pinBg');
	var $form = $('#cardredeemForm');
	srcref = Math.floor(new Date().getTime() / 1000);
	pin = $form.find('input[name="pin"]').val();
	url = $form.attr('action');
	val = $("#facevalue").val();
	$.ajax({
		type : "post",
		url : url,
		data : {
			'srcref' : srcref,
			'pin' : pin,
			'facevalue' : val,
			"userid" : fbId
		},
		dataType : "json",
		beforeSend : function() {
		},
		timeout : 30000,
		error : function(request, error) {
			showError($pinBg, "Estamos teniendo problemas, vuelve a intentarlo m\u00e1s tarde");
		},
		success : function(data) {
			// show the values stored
			if(data !== null && data !== undefined) {
				if('error' in data) {
					// if 'error' is in response
					showError($('#paqueteCanje'), data['error']);
				} else if('result' in data) {
					// show next dialog box
					var flashMoviex = window.document.flashContent;
					flashMoviex.updatepremiumJS(0);
					$("#top4").show();
					$("#fondoTortas").show();
					$("#fondoTortas").css({"top":"-30px"});
					$("#tarjetaEspera").hide();
					$('#graciasCompra').show();
				}
			} else {
				showError($pinBg, "Estamos teniendo problemas, vuelve a intentarlo m\u00e1s tarde");
			}
		}
	});
}

function quitarTeclas() {
	$(this).bind('keypress', function(event) {
		if(event.keyCode === 13) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		} else {
			return true;
		}
	});
}

function ponerTeclas() {
	$(this).unbind('keypress').unbind('keydown');
}

function submitForm() {
	$("#pinBg").hide();
	$("#tarjetaEspera").show();
	verifyCard();
}

function bannerFunc(event) {
	var flashMoviex = window.document.flashContent;
	$('#bs3').off('click');
	
	switch(bannerId){
		case 1:
			flashMoviex.bannersJS("pelucheNono");
		break;	
		case 2:
			flashMoviex.bannersJS("monedas");
		break;
		case 3:
			flashMoviex.bannersJS("caramelos");
		break;
		case 4:
			flashMoviex.bannersJS("tortas");
		break;
		case 5:
			flashMoviex.bannersJS("monedas2");
		break;
		case 6:
			flashMoviex.bannersJS("trofeo");
		break;
		case 7:
				flashMoviex.bannersJS("masmonedas");
		case 8:
		break;
	}
	
}

function iluminarTab(tab) {
	var x = -570;
	var y = 0;
	var i = 8;
	while(i--) {
		if(i !== 0) {
			if(i === tab) {
				y = -32;
			} else {
				y = 0;
			}
			$("#topnav-" + i + " a").css({
				backgroundPosition : x + "px " + y + "px"
			});
			x += 95;

		}
	}
}



function playTabquitarHoverslisto(option) {
	switch(option) {
		case 1:
			playTab();
			quitarHovers();
			listo("x");
			break;
		case 2:
			quitarHovers();
			listo("x");
			break;
	}
}
function extractUrl(input)
{
 // remove quotes and wrapping url()
 return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
}
function deleteRequest(requestId) {
				FB.api(requestId, 'delete', function(response) {
					//alert(response.message);
				});
}
function callInbox()
{
  centerPopup();
	loadPopup();
  tabAnterior=estateMachineInbox("tabNotificaciones",$(this),"click");
  if(numTipoElementos.notificaciones==0)
  {
    //$('#contNotificaciones').css({ 'display': 'none'});
    $("#contNotificaciones").hide();
    //$("#contNotificaciones").css("display","none");
  }
  else
  {
    //$("#contNotificaciones").show();  
    $("#textNumNoti").html(""+numTipoElementos.notificaciones);
  }
  if(numTipoElementos.regalos==0)
  {
    $("#contRegalos").hide();
  }
  else
  {
    $("#contRegalos").show(); 
    $("#textNumReg").html(""+numTipoElementos.regalos);
  }
  if(numTipoElementos.produccion==0)
  {
    $("#contProduccion").hide();
  }
  else
  {
    $("#contProduccion").show();
    $("#textNumPro").html(""+numTipoElementos.produccion);
  }
  $("#tabRetos").hide();
  $("#contRetos").hide();
  /*if(numTipoElementos.retos===0)
  {
    $("#contRetos").hide();
  }
  else
  {
    $("#contRetos").show();
    $("#textNumRet").html(""+numTipoElementos.retos);
  }*/
  
  
  
  $("#tabRegalos,#tabProduccion,#tabRetos").css("background-image","url(images/tabApagada.png)");
  $("#tabRegalos,#tabProduccion,#tabRetos").children().css("color","#692b00");
  $("#tabNotificaciones").css("background-image","url(images/tabActiva.png)");
  $("#tabNotificaciones").children().css("color","#ffffff");      
}
function estateMachineInbox(event,objeto,accion)
{
   var currentState=0;
   var str="#tabNotificaciones,#tabRegalos,#tabProduccion,#tabRetos";
   var a="";
   switch(accion)
   {
      case "click":
          switch(event)
           {
              case "tabNotificaciones": 
              case "textNotificaciones":
                  currentState= tabsEstado.notificaciones;
                  llenarInbox(tabsEstado.notificaciones);
                  a=str.replace("#tabNotificaciones","");
                  $("#tabNotificaciones").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                  $(a).css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
              break;
              case "tabRegalos":
              case  "textRegalos":
                currentState= tabsEstado.regalos;
                llenarInbox(tabsEstado.regalos);
                a=str.replace(",#tabRegalos","");
                $("#tabRegalos").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                $(a).css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
              break;
              case "tabProduccion": 
              case "textProduccion":
                currentState= tabsEstado.produccion;
                llenarInbox(tabsEstado.produccion);
                a=str.replace(",#tabProduccion","");
                $("#tabProduccion").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                $(a).css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
              break;
              case "tabRetos":
              case "textRetos":
                currentState= tabsEstado.retos;
                llenarInbox(tabsEstado.retos);
                a=str.replace(",#tabRetos","");
                $("#tabRetos").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                $(a).css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
              break;
           }
      break;
      case "enter":
          switch(event)
           {
              case "tabNotificaciones": 
              case "textNotificaciones":
                if(tabAnterior!=tabsEstado.notificaciones)
                {
                  $("#tabNotificaciones").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                }                                  
              break;
              case "tabRegalos":
              case  "textRegalos":
                if(tabAnterior!=tabsEstado.regalos)
                {
                  $("#tabRegalos").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                }                              
              break;
              case "tabProduccion": 
              case "textProduccion":
                if(tabAnterior!=tabsEstado.produccion)
                {
                  $("#tabProduccion").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                }               
              break;
              case "tabRetos":
              case "textRetos":
                if(tabAnterior!=tabsEstado.retos)
                {
                  $("#tabRetos").css("background-image","url(images/tabActiva.png)").children().css("color","#ffffff");
                }                
              break;
           }
      break;
      case "leave":
      switch(event)
           {
              case "tabNotificaciones": 
              case "textNotificaciones":
                 if(tabAnterior!=tabsEstado.notificaciones)
                 {
                    $("#tabNotificaciones").css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
                 }                              
              break;
              case "tabRegalos":
              case  "textRegalos":
                if(tabAnterior!=tabsEstado.regalos)
                {
                  $("#tabRegalos").css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
                }                
              break;
              case "tabProduccion": 
              case "textProduccion":
                if(tabAnterior!=tabsEstado.produccion)
                {
                  $("#tabProduccion").css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
                }                
              break;
              case "tabRetos":
              case "textRetos":
                if(tabAnterior!=tabsEstado.retos)
                {
                  $("#tabRetos").css("background-image","url(images/tabApagada.png)").children().css("color","#692b00");
                }                
              break;
           }
      break;
   }
   if(currentState==0)
   {
      currentState=tabAnterior;  
   }
   
    return currentState;
   
   
}

function createMessage(estado,objeto)
{
  var url = uri + "gifts/osito.png";
  var msg="";
  
  switch(estado)
  {
    case tabsEstado.notificaciones:
      if(objeto.id_facebook!= null && objeto.vc_name!= null && objeto.key!=null )
      {
        var img="https://graph.facebook.com/" +objeto.id_facebook+ "/picture";      
        msg=objeto.vc_name+" te ha enviado una notificacion";
        var str="<div class='messageInboxBack'><div class='imagenInboxA' ><img class='imagenImgInboxA' src='"+img+"'/></div>"+
        "<div class='inboxTexto'>"+msg+" </div>"+
        "<div id='"+objeto.key+"' class='inboxAceptar2' onclick='aceptarMessageInbox(this,"+estado+","+objeto.id_facebook+")'></div><div class='inboxCancelar2' onclick='cancelarMessageInbox(this,"+estado+","+objeto.id_facebook+")'></div></div>"; 
      }
        
    break;
    case tabsEstado.regalos:
      
      var img="https://graph.facebook.com/" +objeto.id_facebook+ "/picture";
      var imgG="";
      var str="";
      if(objeto.is_gift!=null && objeto.vc_name!=null && objeto.vc_img!=null && objeto.id_gift_request!=null)
      {
        if(objeto.is_gift===true)
        {
          imgG=uri+"gifts/"+objeto.vc_img+".png"; 
          msg=objeto.vc_name+" te ha enviado un regalo";
          str="<div class='messageInboxBack'><div class='imagenInboxA' ><img class='imagenImgInboxA' src='"+img+"'/></div>"+
          "<div class='imagenInboxB'><img class='imagenImgInboxB' src='"+imgG+"'/></div><div class='inboxTexto2'>"+msg+" </div>"+
          "<div id='"+objeto.key+"' class='inboxAceptar' onclick='aceptarMessageInbox(this,"+estado+","+objeto.id_gift_request+")'></div><div class='inboxCancelar' onclick='cancelarMessageInbox(this,"+estado+","+objeto.id_gift_request+")'></div></div>"; 
        }
      }
      
      else
      {
        if(objeto.vc_name!=null && objeto.vc_img!=null && objeto.id_send_collectible!=null && objeto.key!=null)
        {
          imgG=uri+"assets/coleccionables/"+objeto.vc_img; 
          msg=objeto.vc_name+" te ha enviado una estampa";
          str="<div class='messageInboxBack'><div class='imagenInboxA' ><img class='imagenImgInboxA' src='"+img+"'/></div>"+
          "<div class='imagenInboxB'><img class='imagenImgInboxB' src='"+imgG+"'/></div><div class='inboxTexto2'>"+msg+" </div>"+
          "<div id='"+objeto.key+"' class='inboxAceptar' onclick='aceptarMessageInbox(this,"+5+","+objeto.id_send_collectible+")'></div></div>"; 
          msg=objeto.vc_name+" Texto dummy para collections";
        }
        
      }
      break;
    case tabsEstado.retos:
      /*var img="https://graph.facebook.com/" +objeto.id_facebook+ "/picture";
      msg=objeto.vc_name+" Texto dummy para retos";
      var str="<div class='messageInboxBack'><div class='imagenInboxA' ><img class='imagenImgInboxA' src='"+img+"'/></div>"+
      "<div class='inboxTexto'>"+msg+" </div>"+
      "<div class='inboxAceptar2' onclick='aceptarMessageInbox(this,"+estado+")'></div><div class='inboxCancelar2' onclick='cancelarMessageInbox(this,"+estado+")'></div></div>";*/ 
    break;
    case tabsEstado.produccion:
      if(objeto.id_facebook!=null && objeto.id_farming!=null)
      {
        var img="https://graph.facebook.com/" +objeto.id_facebook+ "/picture";      
        msg=objeto.vc_name+" te ha enviado una invitacion para producir un agua fresca";
        var obj=""+objeto.id_facebook+"."+objeto.id_farming; 
        //var x=parseFloat(ob);
        var str="<div class='messageInboxBack'><div class='imagenInboxA' ><img class='imagenImgInboxA' src='"+img+"'/></div>"+
        "<div class='inboxTexto'>"+msg+" </div>"+
        "<div id='"+objeto.key+"' class='inboxAceptar2' onclick='aceptarMessageInbox(this,"+estado+","+obj+")'></div><div class='inboxCancelar2' onclick='cancelarMessageInbox(this,"+estado+","+obj+")'></div></div>";  
      }
     break;
  }
  
  return str;
}
function llenarInbox(estado)
{
      var str="";
      var numeroDeElementos=0;
      $("#data-wrapper div").remove();
      $("#data-wrapper br").remove();
      
      switch(estado)
      {
        case tabsEstado.notificaciones:
          if(numTipoElementos.notificaciones==0)
          {
            str="<div class='nadaInbox'>No tienes invitaciones el dia de hoy</div>";
            //$("#contNotificaciones").hide();
          }
          else
          {
            str="<div class='nadaInbox'>Notificaciones</div>";
            for(var key in listaInbox )
            {
              var n=key.search("noti");
              if(n!=-1)
              {
                 if(listaInbox[key]!=null)
                 {
                   str+=createMessage(estado,listaInbox[key]);
                 }                 
              }
            }       
          }
          
        
        break;
        case tabsEstado.regalos:
          if(numTipoElementos.regalos==0)
          {
            str="<div class='nadaInbox'>No tienes regalos el dia de hoy</div>";
            $("#contRegalos").hide();
          }
          else
          {
            str="<div class='nadaInbox'>Regalos</div>";
            for(var key in listaInbox )
            {
              var n=key.search("reg");
              if(n!=-1)
              {
                  if(listaInbox[key]!=null)
                  {
                    str+=createMessage(estado,listaInbox[key]);
                  }
                  
              }
            }

            
          }
        break;
        case tabsEstado.produccion:
          if(numTipoElementos.produccion==0)
          {
            str="<div class='nadaInbox'>No tienes nada en produccion el dia de hoy</div>";
            $("#contProduccion").hide();
          }
          else
          {
            str="<div class='nadaInbox'>Produccion</div>";
            for(var key in listaInbox )
            {
              var n=key.search("pro");
              if(n!=-1)
              {
                  if(listaInbox[key]!=null)
                  {
                    str+=createMessage(estado,listaInbox[key]);
                  }
                  
              }
            }

            
          }                   
        break;
        case tabsEstado.retos:
          /*if(numTipoElementos.retos===0)
          {
            str="<div class='nadaInbox'>No tienes nada de retis el dia de hoy</div>";
            $("#contRetos").hide();
          }
          else
          {
               str="<div class='nadaInbox'>Retos</div>";
               for(var key in listaInbox )
                {
                  var n=key.search("ret");
                  if(n!=-1)
                  {
                      str+=createMessage(estado,listaInbox[key]);
                  }
                } 

                
          }*/
        break;
      }
      
      $(str).appendTo("#data-wrapper");             
}

function aceptarMessageInbox(objeto,estado,obj)
{
  var flashMoviex = window.document.flashContent;
  switch(estado)
  {
    case tabsEstado.notificaciones:
      var key=objeto.id;
      flashMoviex.aceptMyFriendJS(obj);
      delete listaInbox[key];
      //delete listaInbox[key];
    break;
    case tabsEstado.regalos:
      var key=objeto.id;
      flashMoviex.acceptMyGiftJS(obj);
      delete listaInbox[key];
    break;
    //case tabsEstado.retos:
    //break;
    case tabsEstado.produccion:
      var key=objeto.id;
      var str=""+obj;
      //var str1 = str.substring(0,str.length-1);
      //var str2 = str.charAt(str.length-1);                    
      var arr=str.split("."); 
      flashMoviex.acceptProductionInvitationJS(parseInt(arr[0]),parseInt(arr[1]));
      delete listaInbox[key];
    break;
    case 5:
      var key=objeto.id;
      flashMoviex.acceptCollectibleJS(obj);
      delete listaInbox[key];
    break;
  }
   decrementarNumText(estado);
  $(objeto).parent().remove();
}
function cancelarMessageInbox(objeto,estado,obj)
{
  var flashMoviex = window.document.flashContent;
  switch(estado)
  {
    case tabsEstado.notificaciones:
      var key=objeto.id;
      flashMoviex.cancelMyFriendJS(obj);
      delete lista[key];
    break;
    case tabsEstado.regalos:
      var key=objeto.id;
      flashMoviex.cancelAgiftJS(obj);
      delete lista[key];
    break;
    //case tabsEstado.retos:
    //break;
    case tabsEstado.produccion:
      var key=objeto.id;
      var str=""+obj;
      var mySplitResult = str.split(".");
      flashMoviex.denyProductionInvitationJS(mySplitResult[0],mySplitResult[1]);
      delete lista[key];
    break;
  }
  decrementarNumText(estado);
  $(objeto).parent().remove();
}
function getDatosinbox(data)
{
   //console.log(data);
  if(data===null)
  {
    numTipoElementos.notificaciones=0;
    numTipoElementos.regalos=0;
    numTipoElementos.produccion=0;
    numTipoElementos.retos=0;
  }
  else
  {
    listaInbox=[];
    numTipoElementos.notificaciones=0;
    numTipoElementos.regalos=0;
    numTipoElementos.produccion=0;
    numTipoElementos.retos=0;
    if("collectible" in data)
    {
      if(data.collectible!==null)
      {
        var i=0;  
         for(i;i<data.collectible.length;i++)
         {
            var objeto={
            "id_facebook":data.collectible[i].id_facebook, 
            "id_request":data.collectible[i].id_request, 
            "id_send_collectible":data.collectible[i].id_send_collectible, 
            "id_user_receiver":data.collectible[i].id_user_receiver,
            "vc_name":data.collectible[i].vc_name, 
            "vc_img":data.collectible[i].vc_img,
            "is_gift":false,
            "key":"reg"+numTipoElementos.regalos
            };
            listaInbox["reg"+numTipoElementos.regalos]=objeto;
            numTipoElementos.regalos++;        
         }
      }      
    } 
    if("gift" in data) 
    {
      if(data.gift!==null)
      {
        var i=0;
        for(i;i<data.gift.length;i++)
        {
          var objeto={
            "id_facebook":data.gift[i].id_fb_sender, 
            "id_gift_request":data.gift[i].id_gift_request, 
            "id_user":data.gift[i].id_user,
            "vc_name":data.gift[i].vc_name,
            "vc_img":data.gift[i].vc_img,
             "is_gift":true,
             "key":"reg"+numTipoElementos.regalos
          };
          listaInbox["reg"+numTipoElementos.regalos]=objeto;
          numTipoElementos.regalos++; 
        }
      }      
    }
    if("invitation" in data)
    {
      if(data.invitation!==null)
      {
          var i=0;
          for(i;i<data.invitation.length;i++)
          {
            var objeto={
              "id_facebook":data.invitation[i].id_facebook, 
              "id_invitation":data.invitation[i].id_invitation, 
              "id_request":data.invitation[i].id_request, 
              "id_user":data.invitation[i].id_user,
              "vc_name":data.invitation[i].vc_name,
              "key":"noti"+numTipoElementos.notificaciones
            };
            listaInbox["noti"+numTipoElementos.notificaciones]=objeto; 
            numTipoElementos.notificaciones++;
          }
      }
      
    }
    if("production" in data)
    {
      if(data.production!==null)
      {
        var i=0;
        for(i;i<data.production.length;i++)
        {
          var objeto={
            "id_facebook":data.production[i].id_facebook, 
            "id_invitation_production":data.production[i].id_invitation_production, 
            "id_request":data.production[i].id_request, 
            "id_user":data.production[i].id_user,
            "vc_name":data.production[i].vc_name,
            "key":"pro"+numTipoElementos.produccion,
            "id_farming":data.production[i].id_farming
          };
          listaInbox["pro"+numTipoElementos.produccion]=objeto;
          numTipoElementos.produccion++;
        }
      }
      
    }
  }
  callInbox();      
}

function decrementarNumText(estado)
{
  var str="";
  switch(estado)
  {
    case tabsEstado.notificaciones:
        if(numTipoElementos.notificaciones>0)
        {
          numTipoElementos.notificaciones--;
          $("#textNumNoti").html(""+numTipoElementos.notificaciones);
          if(numTipoElementos.notificaciones==0)
          {
            $("#contNotificaciones").hide();
            $("#data-wrapper div").remove();
            str="<div class='nadaInbox'>No tienes regalos el dia de hoy</div>";
            $(str).appendTo("#data-wrapper");
          }
        }
                
    break;
    case tabsEstado.regalos:
      if(numTipoElementos.regalos>0)
      {
        numTipoElementos.regalos--;
        $("#textNumReg").html(""+numTipoElementos.regalos);
        if(numTipoElementos.regalos==0)
        {
          $("#contRegalos").hide();
          $("#data-wrapper div").remove();
          str="<div class='nadaInbox'>No tienes regalos el dia de hoy</div>";
          $(str).appendTo("#data-wrapper");
        }
      }            
    break;
    case tabsEstado.produccion:
      if(numTipoElementos.produccion>0)
      {
        numTipoElementos.produccion--;
        $("#textNumPro").html(""+numTipoElementos.produccion);
        if(numTipoElementos.produccion==0)
        {          
          $("#contProduccion").hide();
          $("#data-wrapper div").remove();
          str="<div class='nadaInbox'>No tienes regalos el dia de hoy</div>";
          $(str).appendTo("#data-wrapper");
        }
      }
    break;
    case tabsEstado.retos:
      /*if(numTipoElementos.retos>0)
      {
        numTipoElementos.retos--;
        $("#textNumRet").html(""+numTipoElementos.retos);
        if(numTipoElementos.retos===0)      
        {
          $("#contRetos").hide();
          $("#data-wrapper div").remove();
          str="<div class='nadaInbox'>No tienes regalos el dia de hoy</div>";
          $(str).appendTo("#data-wrapper");
        }
      } */     
    break;
  }
}
var numeroEstampas=0;
function showWish(data)
{
  numeroEstampas=1;
  
  /*data ={
  "i_amount":20,
  "id_collectible":20, 
  "vc_img":"sbarriga05",
  "name":"Estampa sr. barriga"
  };*/
  if(("in" in data)==false)
  {
    data["in"]=data;    
  }
  if("notin" in data)
  {
    if(data.notin!=null)
    {
      if(data.in!=null)
      {
        data.in=data.in.concat(data.notin);
      }      
    }
    if(data.in==null)
    {
      data.in=data.notin;
    }
        
  }
  if(data===null)
  {
    $("#sendEstampas").hide();
  }
  else
  {
    /*if(numeroEstampas>5)
      {
        numeroEstampas=0;
      }*/
      //numeroEstampas++;
      $("#allEstampas div").remove();
      $("#aEstampas p,#nEstampas p,#textEstampas p").remove();
      //$("").remove();
      //$("").remove();
      var str="";
      //$("img").attr(); 
      
      $("#sendEstampas").show();
      
      
      for(var i=0;i<data.in.length;i++)
      {
        if(typeof data.in[i].i_amount=="undefined")
        {
          data.in[i].i_amount=0;
          
        }
        if(data.in[i].id_collectible==null && data.in[i].t_content==null && data.in[i].vc_img==null)
        {
          data.splice(i,1);
        }
      }
        
        
        switch(data.in.length)
        {
            case 1:
              
                str="<div style='top:200px; left:306px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[0].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[0].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[0].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'><input type='checkbox' id='"+data.in[0].id_collectible+"' value='1'/></div></div>";
                  if(data.in[0].i_amount==0)
                  {
                    $("#envEstampas").hide();
                  } 
              
              
            break;
            case 2:
              str="<div style='top:200px; left:234px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[0].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[0].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[0].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish1' value='"+data.in[0].id_collectible+"'/></div></div>"+
                  "<div style='top:200px; left:377px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[1].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[1].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[1].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish2' value='"+data.in[1].id_collectible+"'/></div></div>";
                  if(data.in[0].i_amount==0 && data.in[1].i_amount==0)
                  {
                    $("#envEstampas").hide();
                  } 
            break;
            case 3:
              str="<div style='top:200px;left:163px;position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[0].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[0].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[0].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish1' value='"+data.in[0].id_collectible+"'/></div></div>"+
                  "<div style='top:200px;left:306px;position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[1].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[1].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in.compare[1].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish2' value='"+data.in[1].id_collectible+"'/></div></div>"+
                  "<div style='top:200px;left:449px;position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[2].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[2].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in.compare[2].i_amount+"</p></div>"+    2
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish3' value='"+data.in[2].id_collectible+"'/></div></div>";
                  if(data.in[0].i_amount==0 && data.in[1].i_amount==0 && data.in[2].i_amount==0)
                  {
                    $("#envEstampas").hide();
                  } 
            break;
            case 4:
              str="<div style='top:200px; left:91px;  position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[0].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[0].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[0].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish1' value='"+data.in[0].id_collectible+"'/></div></div>"+
                  "<div style='top:200px; left:234px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[1].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[1].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[1].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish2' value='"+data.in[1].id_collectible+"'/></div></div>"+
                  "<div style='top:200px; left:377px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[2].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[2].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[2].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish3' value='"+data.in[2].id_collectible+"'/></div></div>"+
                  "<div style='top:200px; left:520px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                  "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[3].vc_img+")'></div>"+
                  "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[3].t_content+"<p></div>"+
                  "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[3].i_amount+"</p></div>"+
                  "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                  "<input type='checkbox' id='wish4' value='"+data.in[3].id_collectible+"'/></div></div>";
                  if(data.in[0].i_amount==0 && data.in[1].i_amount==0 && data.in[2].i_amount==0 && data.in[3].i_amount==0)
                  {
                    $("#envEstampas").hide();
                  }  
            break;
            case 5:
               str="<div style='top:200px; left:15px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                   "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[0].vc_img+")'></div>"+
                   "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[0].t_content+"<p></div>"+
                   "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[0].i_amount+"</p></div>"+
                   "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                   "<input type='checkbox' id='wish1' value='"+data.in[0].id_collectible+"'/></div></div>"+
                   "<div style='top:200px; left:156px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                   "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[1].vc_img+")'></div>"+
                   "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[1].t_content+"<p></div>"+
                   "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[1].i_amount+"</p></div>"+
                   "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                   "<input type='checkbox' id='wish2' value='"+data.in[1].id_collectible+"'/></div></div>"+
                   "<div style='top:200px; left:297px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                   "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[2].vc_img+")'></div>"+
                   "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[2].t_content+"<p></div>"+
                   "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[2].i_amount+"</p></div>"+
                   "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                   "<input type='checkbox' id='wish3' value='"+data.in[2].id_collectible+"'/></div></div>"+
                   "<div style='top:200px; left:438px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                   "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[3].vc_img+")'></div>"+
                   "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[3].t_content+"<p></div>"+
                   "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[3].i_amount+"</p></div>"+
                   "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                   "<input type='checkbox' id='wish4' value='"+data.in[3].id_collectible+"'/></div></div>"+                  
                   "<div style='top:200px; left:580px; position:absolute; width:143px; height:213px; background-image:url(images/moduloEstampa.png)'>"+
                    "<div style='position:relative;top:40px; left:45px; width:50px; height:50px; background-image:url(assets/coleccionables/"+data.in[4].vc_img+")'></div>"+
                   "<div style='top:70px; lmargin-left:auto; margin-right:auto;left:15px; position:relative;'><p class='estampaText'>"+data.in[4].t_content+"<p></div>"+
                   "<div style='top:85px; left:14px;position:relative'><p class='testampaText'>Tu tienes:</p><p class='nestampaText' style='top:-18px; left:75px;position:relative'>"+data.in[4].i_amount+"</p></div>"+
                   "<div style='width:25px; height:25px; margin-left:auto; top:70px; margin-right:auto; position:relative'>"+
                   "<input type='checkbox' id='wish5' value='"+data.in[4].id_collectible+"'/></div></div>";
                   if(data.in[0].i_amount==0 && data.in[1].i_amount==0 && data.in[2].i_amount==0 && data.in[3].i_amount==0 && data.in[4].i_amount==0)
                  {
                    $("#envEstampas").hide();
                  }
            break;
        }
    var checkStr="";
    
    if(typeof data.in[0]!="undefined")
    {
      if(parseInt(data.in[0].i_amount)<=0 && data.in.length>=0)
      {
        checkStr+="#wish1";
      }
    }
    
    
    if(typeof data.in[1]!="undefined")
    {
      if(data.in[1].i_amount<=0 && data.in.length>=1)
      {
        if(checkStr=="")
        {
          checkStr+="#wish2";
        }
        else
        {
          checkStr+=",#wish2";
        }
      }
    }
    
    if(typeof data.in[2]!="undefined")
    {
      if(parseInt(data.in[2].i_amount)<=0 && data.in.length>=2)
      {
        if(checkStr=="")
        {
          checkStr+="#wish3";
        }
        else
        {
          checkStr+=",#wish3";
        }
      }
    }
    
    if(typeof data.in[3]!="undefined")
    {
      if(parseInt(data.in[3].i_amount)<=0 && data.in.length>=3)
      {
        if(checkStr=="")
        {
          checkStr+="#wish4";
        }
        else
        {
          checkStr+=",#wish4";
        }
      }
    }
    
    if(typeof data.in[4]!="undefined")
    {
      if(parseInt(data.in[4].i_amount)<=0 && data.in.length>=4)
      {
        if(checkStr=="")
        {
          checkStr+="#wish5";
        }
        else
        {
          checkStr+=",#wish5";
        }
      }
    }
    
    //str+="<input type='hidden' name='orderNumber' id='fechaSendEstampas' value='"+$("#hiddxo").val()+"' />"    
    $("<p align='center'>a "+$("#hiddName").val()+"<p>").appendTo("#aEstampas");
    $("<p align='center'>"+$("#hiddName").val()+"</p>").appendTo("#nEstampas");
    $("<p align='center'>Necesita las siguientes estampas para sus colecciones. Selecciona las que tengas en tu inventario y enviale una para ayudarle.Puedes seleccionar mas de una y presionar enviar cunado este listo todo.</p>").appendTo("#textEstampas");
    $(str).appendTo("#allEstampas");
    $(checkStr).hide(); 
  }
  
}


compareDates= function(fechaIni,fechaFin)
{
    if(fechaIni<fechaFin)
    {
      return true;
    }
    else
    {
      return false;
    }
}


function aumentaTrans(id)
{
  var str="numTrans"+id;
  switch(str)
  {
    case "numTrans0":
      if(ctot>0)
      {
        ctot--;
        numToTrans[0]++;
        $("#"+str).html(""+numToTrans[0]);
      }
      
    break;
    case "numTrans1":
       if(ctot>0)
       {
        ctot--;
        numToTrans[1]++;
        $("#"+str).html(""+numToTrans[1]);
       }
       
    break;
    case "numTrans2":
       if(ctot>0)
       {
        ctot--;
        numToTrans[2]++;
        $("#"+str).html(""+numToTrans[2]);
       }
       
    break;
    case "numTrans3":
      if(ctot>0)
      {
        ctot--;
        numToTrans[3]++;
        $("#"+str).html(""+numToTrans[3]);
      }
      
    break;
    case "numTrans4":
      if(ctot>0)
      {
        ctot--;
        numToTrans[4]++;
        $("#"+str).html(""+numToTrans[4]);
      }
      
    break;
  }
  $("#transParaTiNum").html(""+ctot);
 //console.log("aumentando");
}
function disminuyeTrans(id)
{
  var str="numTrans"+id;
  switch(str)
  {
    case "numTrans0":
      if(numToTrans[0]>0)
      {
        ctot++;
        numToTrans[0]--;
        $("#"+str).html(""+numToTrans[0]);
      }      
    break;
    case "numTrans1":
      if(numToTrans[1]>0)
      {
        ctot++;
        numToTrans[1]--;
        $("#"+str).html(""+numToTrans[1]);
      }      
    break;
    case "numTrans2":
      if(numToTrans[2]>0)
      {
        ctot++;
        numToTrans[2]--;
        $("#"+str).html(""+numToTrans[2]);
      }
    break;
    case "numTrans3":
      if(numToTrans[3]>0)
      {
        ctot++;
        numToTrans[3]--;
        $("#"+str).html(""+numToTrans[3]);
      }      
    break;
    case "numTrans4":
      if(numToTrans[4]>0)
      {
        ctot++;
        numToTrans[4]--;
        $("#"+str).html(""+numToTrans[4]);
      }
    break;
  }
  $("#transParaTiNum").html(""+ctot); 
}

function removeFromArrTot(object)
{
  for(var i=0;i<arrTransTortas.length;i++)
  {
    if(object.id==arrTransTortas[i].id)
    {
      arrTransTortas.splice(i, 1);
      var y=parseInt($("#transParaTiNum").html());
      y+=numToTrans[i];
      ctot+=numToTrans[i];
      recorrerArray(i);
      $("#transParaTiNum").html(y);
    }
  }
  //console.log(""+arrTransTortas);
  $(object).parentsUntil("ul").remove();
}

function removeFromArrTot2(object)
{
  //var x=parseInt(object.id);
  //x++;
  var x=$(object).html();
  //var xsplit=x.split(" ");
  for(var i=0;i<arrTransTortas.length;i++)
  {
    var temp=""+arrTransTortas[i].name+" "+arrTransTortas[i].apellido;
    if(x==temp)
    {
      arrTransTortas.splice(i, 1);
      var y=parseInt($("#transParaTiNum").html());
      y+=numToTrans[i];
      ctot+=numToTrans[i];
      recorrerArray(i);
      $("#transParaTiNum").html(y);
    }
  }
//  console.log(""+arrTransTortas);
  $(object).parentsUntil("ul").remove();
}

function removeFromArrTot3(object)
{
  //var x=parseInt(object.id);
  //x++;
  var x=$(object).html();
  //var xsplit=x.split(" ");
  for(var i=0;i<arrTransTortas.length;i++)
  {
    var temp=""+arrTransTortas[i].name+" "+arrTransTortas[i].apellido;
    if(x==temp)
    {
      arrTransTortas.splice(i, 1);
      var y=parseInt($("#transParaTiNum").html());
      y+=numToTrans[i];
      ctot+=numToTrans[i];
      recorrerArray(i);
      $("#transParaTiNum").html(y);
    }
  }
//  console.log(""+arrTransTortas);
  $("#transAmg ul li."+object.id).remove();
  $(object).parentsUntil("ul").remove();
}

function activaTransTort()
{
      $("#sinoTxt").html(""+tot);
      $("#sinoTortas").show();
		  $("#pinFondo").show().animate({
			"opacity" : "0.40"
		  }, "slow"); 
}    

function recorrerArray(index)
{
  if(index!=4)
  {
    for(var i=index;i<numToTrans.length;i++)
    {
        if(i<4)
        {
          numToTrans[i]=numToTrans[i+1];
        }
        else
        {
          numToTrans[i]=0;
        }        
    }
  }
  
}