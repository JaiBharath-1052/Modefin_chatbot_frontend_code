//main.js html/chatbot/commandcenter/assets/chatwidget/js/chatbot/main.js
var baseURL = window.frameElement.getAttribute("data-url"); 
var bot_id = window.frameElement.getAttribute("bot-id");
var app_id = window.frameElement.getAttribute("app-id");
// let getUrl = 'https://call2transact.com/v2' +
// '/api/chat-widget-popup-settings?bot_id=' + bot_id +'&app_id='+app_id;
//let getUrl = 'http://127.0.0.1/api/chat-widget-popup-settings?bot_id=' + bot_id +'&app_id='+app_id;
//let UserWSUrl = 'ws://127.0.0.1/ws/user/'
// UserWSUrl = 'wss://call2transact.com/ws/'
// let getUrl = 'http://7.134.29.6/api/chat-widget-popup-settings?bot_id=' + bot_id +'&app_id='+app_id;
// let UserWSUrl = 'ws://7.134.29.6/ws/user/'
//let getUrl = 'http://192.168.1.184/api/chat-widget-popup-settings?bot_id=' + bot_id +'&app_id='+app_id;
//let UserWSUrl = 'ws://192.168.1.184/ws/user/'

let getUrl = 'http://192.168.145.75/api/chat-widget-popup-settings?bot_id=' + bot_id +'&app_id='+app_id;
let UserWSUrl = 'ws://192.168.145.75/ws/user/'


// console.log(getUrl);
var debug = true;
//let userImage = baseURL + '/static/api/bot.png', myImage = baseURL + '/static/api/me.jpg', agentImage = baseURL + '/static/api/user1.jpg';
let userImage = baseURL + '/assets/post-login/images/bot.png', myImage = baseURL + '/assets/post-login/images/profile.svg', agentImage = baseURL + '/assets/post-login/images/profile.svg';

let online = true;
let toggleStatus = {
		online: '#7AFC19',
		offline: '#cccccc'
}

var visitorID;


	$(document).ready(function() {
		setTimeout(()=>{
			var fpPromise = FingerprintJS.load();
			// Get the visitor identifier when you need it.
			fpPromise
			.then(fp => fp.get())
			.then(result => {
				console.log(result.visitorId)
				visitorID = result.visitorId;
				document.cookie= 'visitorID=' + visitorID + '; path=/';
				})
			},100);
		// var chatSocket = new WebSocket('wss://call2transact.com/ws/');
		setTimeout(()=>{
			var chatSocket = new WebSocket(UserWSUrl);
		
		
		let date, hour, min, meridiem, months, monthName, today, localTimeStamp, message, quertyBtns, ctype;
		
		let chatbotContainer = $('.chatbot-container');
		let chatbotContainer_first = $('.chatbot-container');
		let chatbotForm = $('#chatbot-form');
		let msgText;
		let msgBox = $('#msg');
		
		let botName;
		let btnsArray = [];
		
		let history=[];
		let chatHistory = false;
		let chatTime="";
		let chatDay=""
		let chatHour=""
		let chatMinute="";
		let newDate = false;
		let btnOpt = '';
		let initial = true;
		
		let splitString = '';
		let chats;		
		
		let msgHeader = $('.msg-header');
		let msgBottom = $('.msg-bottom');
		let chatIcon = $('.chat-icon');
		let closeChat = $('.close-chat')
		let sendIcon = $('.input-group .fa');
		let retryOption = $(".retryOption");
		let sentText;
		let receivedText;
		let primaryColor = '#00a79d', layoutBG, layoutColors, layoutBorderColor;
		let sound = "Sound1";
		let bot_msg_delay = 0;
		var audio = document.createElement("AUDIO")
	    document.body.appendChild(audio);
		var menuOption = false, seddion_refresh = true;
		counter = 0;
		let time_interval = 5000;
		$(".retryOption").hide();
		$(".msg-connection").hide();
		$(".close-content").hide();
		let chat_close = false;
	// myInterval = setInterval(function() {isOpen(chatSocket);},
	// time_interval);
		// isOpen(chatSocket);
		var modal = document.getElementById("myModal");
		$(".msg-connection").show();
		modal.style.display = "block";
		function isOpen(ws) {
			setTimeout(()=>{
			$(".retryOption").hide();	
			if(ws.readyState === ws.OPEN){
						
				// clearInterval(myInterval);
			}
			else {
			counter++;
			if(counter>2){
				 $("#msg-connect").html("Trying to reconnect the bot..");
			}
			modal.style.display = "block";
			$(".msg-connection").show();
			$(".close-content").hide();
			if(counter == 2){
				time_interval = 15000;
			}else if(counter==3) {
				time_interval = 30000;
			}else if(counter==4) {
				time_interval = 60000;
			}else if(counter==5) {
				time_interval = 180000;
			}else if(counter>5){
				counter =0;
				time_interval = 5000;
				$(".retryOption").show();
				$(".msg-connection").hide();
				return;
				
			}
			if(chat_close){
				connect();
				chat_close = false;
			}
			
		}
			
			},100);
			
		

	}
		
		$('.mgs-header-img img').attr('src', userImage);
		
		$('#online').css({
			'color': toggleStatus.online,
		})
	/*
	 * $.getScript('http://localhost:8080/Chatbot-UI/Testing/chui4.01/static/api/@fingerprintjs/fingerprintjs/dist/fp.min.js',
	 * function() { alert('Load was performed.'); });
	 */


	  // Get the visitor identifier when you need it.
	  /*
		 * fpPromise .then(fp => fp.get()) .then(result => { // This is the
		 * visitor identifier: const visitorId = result.visitorId
		 * //console.log("visitorId",visitorId) })
		 */
		function ajaxGet() {
			
			botName = $('.active h4')
			$.ajax({
				url: getUrl,
				type: 'get',
				async : true,
				success: function(result) {
							// console.log((result));
							if((result && result.chatWidget) || !result.hasOwnProperty("Error")){
						layoutBG = result.chatWidget.color;
						layoutColors = {
								defaultColor: layoutBG
						}
						
						layoutBorderColor = {
								borderStyle: '1px solid '+layoutColors.defaultColor
						}
						
						// Apply Color
						
						chatIcon.css({
							'background-color': layoutColors.defaultColor,
						});
						closeChat.css({
							'background-color': layoutColors.defaultColor,
						});
						msgHeader.css({
							'background-color': layoutColors.defaultColor,
						});
						
						msgBottom.css({
							'background-color': layoutColors.defaultColor,
						});
							
						chatbotContainer.css({
							'border': layoutBorderColor.borderStyle,
						});
						
						sendIcon.css({
							'color': layoutColors.defaultColor,
						});
						retryOption.css({
							'background-color': layoutColors.defaultColor,
						});
						sound = result.chatWidget.notification_tone;

					    //audio.src =  baseURL+"/static/api/assets/audio/"+sound+".mp3"; 
						if(sound != "Mute"){
							audio.src =  baseURL+"/assets/audio/"+sound+".mp3";
						}else {
							audio.src ="";
						}
						
						// Scrollbar color
						if(result.chatWidget.popup && !result.chatWidget.disable_chat_widget) {
							setTimeout(function(){ $('.chat-icon').css('display','none'); }, 200);
							 $('.chat-icon').trigger("click");
							
						}
						
						if(result.chatWidget.position.toLowerCase() == "right") {
							window.frameElement.setAttribute('style','float:right;right:5%');
							
						}else{
							window.frameElement.setAttribute('style','float:left;left:5%');
						}
						if(result.chatWidget.launcher_icon_option == "Upload") {
							$('#default-icon').hide();
							chatIcon.css("background-color", ""); 
							$("#selected-icon").attr("src", result.chatWidget.icon_image);
						}else {
							$('#default-upload').hide();
							if(result.chatWidget.icon_image){
								var icon = result.chatWidget.icon_image;
								/*switch (icon) {
								  case "1":
										 $(".launch-icon").attr("src",baseURL+"/static/api/assets/post-login/images/launcher-icon1.svg" )
								    break;
								  case "2":
										 $(".launch-icon").attr("src",baseURL+"/static/api/assets/post-login/images/launcher-icon2.svg" )
								    break;
								  case "3":
										 $(".launch-icon").attr("src",baseURL+"/static/api/assets/post-login/images/launcher-icon3.svg" )
								    break;
								  case "4":
										 $(".launch-icon").attr("src",baseURL+"/static/api/assets/post-login/images/launcher-icon4.svg" )
								    break;

								}*/
								switch (icon) {
								  case "1":
										 $(".launch-icon").attr("src",baseURL+"/assets/post-login/images/launcher-icon1.svg" )
									break;
								  case "2":
										 $(".launch-icon").attr("src",baseURL+"/assets/post-login/images/launcher-icon2.svg" )
									break;
								  case "3":
										 $(".launch-icon").attr("src",baseURL+"/assets/post-login/images/launcher-icon3.svg" )
									break;
								  case "4":
										 $(".launch-icon").attr("src",baseURL+"/assets/post-login/images/launcher-icon4.svg" )
									break;

							}
							}else {
								 //$(".launch-icon").attr("src",baseURL+"/static/api/assets/post-login/images/launcher-icon1.svg" )
								 $(".launch-icon").attr("src",baseURL+"/assets/post-login/images/launcher-icon1.svg" )

							}
							
						}
						if(result.chatWidget.disable_chat_widget) {
							 $('.chat-icon').hide();
						}else {
							$('.chat-icon').show();
						}
						 $("#bot-name").html(result.bot_name);
						 if(!(result.bot_image.includes("default_image.jpg"))) {
							 userImage = result.bot_image;
							 $('.mgs-header-img img').attr('src', userImage);
						 }
						 if(result.chatWidget.bot_msg_delay_interval > 0) {
							 bot_msg_delay = result.chatWidget.bot_msg_delay_interval*1000;
						}
						 if(!result.chatWidget.chat_session_history.remove_history_after_page_refresh){
							 chatHistory= true;
							 chatDay = result.chatWidget.chat_session_history.history_removal_days;
							 chatHour = result.chatWidget.chat_session_history.history_removal_hours;
							 chatMinute = result.chatWidget.chat_session_history.history_removal_minutes;
							 if(localStorage.getItem("chatBot") && JSON.parse(localStorage.getItem("chatBot")).length>0){
								retriveChat();
							 }
							 
							 
						 } else {
							 chatHistory= false;
							 localStorage.removeItem("chatBot");
						 }
				} 
						 
				}
			
			});
		}
		
		ajaxGet();
		console.log(new Date());
		var SendMsg = function(msgText){
			/*return JSON.stringify({
			    'type': 'chat_message',
			    'text': msgText,
			})*/
			return JSON.stringify({
				type :'visitorMessage',
				 data : {
		                visitorId : visitorID,
		                message : msgText,
		                messageTime :chatTime          
		            }
			})
			

		};
		function connect(){
			modal.style.display = "block";
			$(".retryOption").hide();
			$(".close-content").hide();
			$(".msg-connection").show();
			chatSocket = new WebSocket(UserWSUrl);
			chatSocket.onopen = function(e) {
				if(chatSocket.readyState === chatSocket.OPEN){
					$(".msg-connection").hide();
					modal.style.display = "none";
				}
					/*chatSocket.send(JSON.stringify({
		                'type': 'register_bot',
		                'bot_id': "1"// bot_id
		            }));*/
				chatSocket.send(JSON.stringify({
				    type: 'visitorActivity',
				    subType: 'Connection',
				    data : {
				                 BotID : bot_id,
				                 AppID: app_id
				              }
						}
					));
			};
			chatSocket.onerror = function(err) {
			    console.error('Socket encountered error: ', err.message, 'Closing socket');
			    chatSocket.close();
			  };
			  chatSocket.onclose = function(e) {
				    // console.log('Socket is closed. Reconnect will be
					// attempted in 1
					// second.', e.reason);
				    setTimeout(function() {
				    	counter++;
				    	if(counter>2){
				    		 $("#msg-connect").html("Trying to reconnect the bot..");
				    	}
				    	modal.style.display = "block";
				    	$(".msg-connection").show();
				    	if(counter == 2){
				    		time_interval = 15000;
				    	}else if(counter==3) {
				    		time_interval = 30000;
				    	}else if(counter==4) {
				    		time_interval = 60000;
				    	}else if(counter==5) {
				    		time_interval = 180000;
				    	}else if(counter>5){
				    		counter =0;
				    		time_interval = 5000;
				    		$(".retryOption").show();
				    		$(".msg-connection").hide();
				    		return;
				    		
				    	}
				    	connect();
				    }, time_interval);
				  };
				  chatSocket.onmessage = function(e) {
						displaymessages(e);
					}
			
		}
		chatSocket.onclose = function(e) {
		    // console.log('Socket is closed. Reconnect will be attempted in 1
			// second.', e.reason);
			console.log(e)

			    setTimeout(function() {
			    	counter++;
			    	connect();
			    }, time_interval);
		  };
		  chatSocket.onerror = function(err) {
			    console.error('Socket encountered error: ', err.message, 'Closing socket');
			    
			    chatSocket.close();
			  };
		
		chatSocket.onopen = function(e) {
			setTimeout(function() {
				isOpen(chatSocket);
		    
			
				/*chatSocket.send(JSON.stringify({
	                'type': 'register_bot',
	                'bot_id': "1"// bot_id
	            }));*/
				chatSocket.send(JSON.stringify({
				    type: 'visitorActivity',
				    subType: 'Connection',
				    data : {
				                 BotID : bot_id,
				                 AppID: app_id
				              }
						}
					));
			}, 0);
		};
		chatSocket.onmessage = function(e) {
			displaymessages(e);
		};
		function displaymessages(e){
			// console.log(e)
			counter =0;
    		time_interval = 5000;
    		
			setTimeout(
					  function() 
					  {
					    // do something special
						  audio.play();
			//$('.loader').css('display', 'none');
			$('.loader').remove();
			var jsonOBJ = JSON.parse(e.data);
			
			$(".msg-connection").hide();
			modal.style.display = "none";
			// //console.log('onmessage', jsonOBJ);
			var agResponse = '';
			var type = jsonOBJ.fe_type || jsonOBJ.type;
            if(history.length == 0) {
				history.push({'visitorId' : visitorID});
			}
			    
			
			var isAgent = false;
			if(history.length>0){
				var lastentry = history[history.length-1];
				if(type == "serverActivity" && jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "agentAssigned"){
					if(lastentry.type == "serverActivity" && lastentry.subType == "agentAssigned") {
						if(lastentry.data.agentId == jsonOBJ.data.agentId){
							isAgent = true;
							history.pop();
						}
						
					}
				}
			}
			if(jsonOBJ.data.messageTime){
			chatTime = jsonOBJ.data.messageTime*1000;
			dateFormat();
			}
			if(chatHistory){
				if(type == "serverActivity" && jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "botRegistered"){

				}else{
					var msg = jsonOBJ;
					msg.time = jsonOBJ.data.messageTime*1000;
					
					history.push(msg);
					localStorage.setItem("chatBot",JSON.stringify(history));
				}
				
			}
			if((type == 'df_chat_message')) {
				// console.log(jsonOBJ)
				appendResponse(jsonOBJ);
				
			}
			if(type == 'agent_searching') {
				
				// todo
				// 1. put messaage behind
				// 2. show loader
				var text = jsonOBJ.content.text;
				agResponse = jsonOBJ.content.text;
				var responseHTML = `
					<div class="received-chats">
							<div class="received-chats-img"> 
								<img class="particons" src="${userImage}" />
							</div>
						 </div> 
					<div class="received-msg">
						<div class="received-msg-inbox">
							<div>${text}</div>
						</div>
						
					</div>
				`
				appendAgentResponse(responseHTML);			
			}
			
			if(type == 'agent_assigned') {
				var agentname = jsonOBJ.content.agent_name;
				var notification = jsonOBJ.content.notification;
				let disconnect = 'Start new conversation';
				var responseHTML = `
				
					 	<div class="agent-asigned">
							<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification} 
								<!-- <div class="leave">${disconnect}</div> -->
							</div>
						</div>
					`
				
				appendAgentResponse(responseHTML);
				updateAgent(agentname);
				
			}
			
			if(type == 'ag_chat_message') {
				agResponse = jsonOBJ.content.text;
				dateFormat();
				if(newDate){
					timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
				} else {
					timeString = hour+":"+min+" "+meridiem;
				}
				var responseHTML = `
						<div class="received-chats">
							<div class="received-chats-img"> 
								<img class="particons" src="${userImage}" />
							</div>
						 </div> 
						<div class="received-msg">
							<div class="received-msg-inbox">
								<div>${agResponse}</div>
							</div>
							<span class="time received-msg-time">
								${timeString}<i class="fa fa-check" aria-hidden="true"></i>
							</span>
						</div>
					`
				appendAgentResponse(responseHTML);
				
			}
			if(type == "cookies"){
				if(jsonOBJ.hasOwnProperty('key')){
					console.log(jsonOBJ.key);
					console.log(jsonOBJ.value);
				}
			}
			if(type == "serverActivity"){
				if(jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "agentAssigned"&& jsonOBJ.data.message&&!isAgent){
					var agentname = jsonOBJ.data.agentName;
					if(jsonOBJ.data.agentPhoto){
						userImage = jsonOBJ.data.agentPhoto;
						$('.mgs-header-img img').attr('src', userImage);
					}
					var notification = jsonOBJ.data.message;
                                        let disconnect = 'Start new conversation';
					var responseHTML = `
					
						 	<div class="agent-asigned">
								<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification}</div>
								<!-- <div class="leave">${disconnect}</div> -->							</div>
									
						`
					
					appendAgentResponse(responseHTML);
					updateAgent(agentname);	
				}else if(jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "botRegistered"){
					var bot_name = jsonOBJ.data.botName;
					if(jsonOBJ.data.botPhoto){
						userImage = jsonOBJ.data.botPhoto;
						$('.mgs-header-img img').attr('src', userImage);
					}
					updateAgent(bot_name);	
				}
				else{
					if(jsonOBJ.data.message && !isAgent){
					var notification = jsonOBJ.data.message;
					var responseHTML = `
					
						 	<div class="agent-asigned">
								<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification}</div>
							</div>
						`
					
					appendAgentResponse(responseHTML);
					}
				}
				if(jsonOBJ.data.isOnline != undefined){
					if(jsonOBJ.data.isOnline){
					$("#bot-online").text("Online");
					$("#online").css("color","rgb(122, 252, 25)");
				}else {
					$("#bot-online").text("Offline");
					$("#online").css("color","#c40a32");
				}
				}
				 if(jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "botRegistered"){
					 $("#bot-online").text("Online");
					$("#online").css("color","rgb(122, 252, 25)");
				 }
				
				
				
				
			}
			if(type == 'agentMessage'&& jsonOBJ.data.message) {
				agResponse = jsonOBJ.data.message;
				dateFormat();
				if(newDate){
					timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
				} else {
					timeString = hour+":"+min+" "+meridiem;
				}
				var responseHTML = `
						<div class="received-chats">
							<div class="received-chats-img"> 
								<img class="particons" src="${userImage}" />
							</div>
						 </div> 
						<div class="received-msg">
							<div class="received-msg-inbox">
								<div>${agResponse}</div>
							</div>
							<span class="time received-msg-time">
								${timeString}<i class="fa fa-check" aria-hidden="true"></i>
							</span>
						</div>
					`
				appendAgentResponse(responseHTML);
				
			}
			if(type == "botMessage" && jsonOBJ.data.message){
				agResponse = jsonOBJ.data.message;
				if(jsonOBJ.data.botPhoto){
					userImage = jsonOBJ.data.botPhoto;
					$('.mgs-header-img img').attr('src', userImage);
				}
				if(!jsonOBJ.data.metadata){
				dateFormat();
				if(newDate){
					timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
				} else {
					timeString = hour+":"+min+" "+meridiem;
				}
				var responseHTML = `
						<div class="received-chats">
							<div class="received-chats-img"> 
								<img class="particons" src="${userImage}" />
							</div>
						 </div> 
						<div class="received-msg">
							<div class="received-msg-inbox">
								<div>${agResponse}</div>
							</div>
							<span class="time received-msg-time">
								${timeString}<i class="fa fa-check" aria-hidden="true"></i>
							</span>
						</div>
					`
				appendAgentResponse(responseHTML);
				}else{
					appendResponseMetaData(jsonOBJ);
				}
			
				
			}
					  }, bot_msg_delay);
		};


		applySettings(primaryColor);
	function 	retriveChat() {
		let chat_history = JSON.parse(localStorage.getItem("chatBot"));
		let chat_history_length = chat_history.length;
		let lastChatime = chat_history[chat_history_length-1].time;
			 var date1 = new Date(lastChatime);
			 var date2 = new Date();
			   
			 // To calculate the time difference of two dates
			 var Difference_In_Time = date2.getTime() - date1.getTime();
			 
			 // console.log(Difference_In_Time)
			   
			 // To calculate the no. of days between two dates
			 var Difference_In_Days = parseInt((date1 - date2) / (1000 * 60 * 60 * 24));
			 var Difference_In_Hour = parseInt(Math.abs(date1 - date2) / (1000 * 60 * 60) % 24);
			 var Difference_In_Minute = parseInt(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60) % 60);
             /*
			 var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
			 var Difference_In_Hour =  Math.abs(date2.getHours() - date1.getHours());
			 var Difference_In_Minute =  Math.abs(date2.getMinutes() - date1.getMinutes());*/
			 // console.log(Difference_In_Hour)
			 // console.log(Difference_In_Minute)
			 
			 if((chatDay!="" || chatDay!=undefined || chatDay!=null)&& chatDay<=Math.round(Difference_In_Days)){
				 if( Math.round(Difference_In_Days) > chatDay){
					 return;
				 }
				 if((chatHour!="" || chatHour!=undefined || chatHour!=null)&& chatHour<=Difference_In_Hour){
					 if((chatMinute!="" || chatMinute!=undefined || chatMinute!=null) && chatMinute<=Difference_In_Minute){
						 return;
					 } 
				 }
			 } else if((chatHour!="" || chatHour!=undefined || chatHour!=null) && chatHour<=Difference_In_Hour) {
				 if((chatMinute!="" || chatMinute!=undefined || chatMinute!=null) && chatMinute<=Difference_In_Minute){
					 return;
				 }
			 } else if((chatMinute!="" || chatMinute!=undefined || chatMinute!=null) && chatMinute<=Difference_In_Minute){
				 return;
			 }
			 
		$.each(chat_history, function(k, value) {
			if(value.hasOwnProperty("visitorId")){
				if(visitorID != value.visitorId){
					return;
				}
			}
			history.push(value);
			 chatTime = value.time;
			 // console.log(Difference_In_Days)
			 
			
				var jsonOBJ = value;
				var agResponse = '';
				var type = jsonOBJ.fe_type || jsonOBJ.type;
				if(type == 'df_chat_message') {
					// console.log(jsonOBJ)
					appendResponse(jsonOBJ);
				}
				if(type == 'agent_searching') {
					
					// todo
					// 1. put messaage behind
					// 2. show loader
					var text = jsonOBJ.content.text;
					agResponse = jsonOBJ.content.text;
					var responseHTML = `
						<div class="received-chats">
								<div class="received-chats-img"> 
									<img class="particons" src="${userImage}" />
								</div>
							 </div> 
						<div class="received-msg">
							<div class="received-msg-inbox">
								<div>${text}</div>
							</div>
							
						</div>
					`
					appendAgentResponse(responseHTML);			
				}
				
				if(type == 'agent_assigned') {
					var agentname = jsonOBJ.content.agent_name;
					var notification = jsonOBJ.content.notification;
					let disconnect = 'Start new conversation'
					var responseHTML = `
					
						 	<div class="agent-asigned">
								<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification}
						   		<!-- <div class="leave">${disconnect}</div> -->								</div>
							</div>
						`
					
					appendAgentResponse(responseHTML);
					updateAgent(agentname);
					
				}
				
				if(type == 'ag_chat_message') {
					agResponse = jsonOBJ.content.text;
					dateFormat();
					let timeString="";
					if(newDate){
						timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
					} else {
						timeString = hour+":"+min+" "+meridiem;
					}
					var responseHTML = `
							<div class="received-chats">
								<div class="received-chats-img"> 
									<img class="particons" src="${userImage}" />
								</div>
							 </div> 
							<div class="received-msg">
								<div class="received-msg-inbox">
									<div>${agResponse}</div>
								</div>
								<span class="time received-msg-time">
									 ${timeString} <i class="fa fa-check" aria-hidden="true"></i>
								</span>
							</div>
						`
					appendAgentResponse(responseHTML);
					
				}
				if(type == "serverActivity"){
					if(jsonOBJ.hasOwnProperty('subType') && jsonOBJ.subType == "agentAssigned"&& jsonOBJ.data.message){
						var agentname = jsonOBJ.data.agentName;
						if(jsonOBJ.data.agentPhoto){
							userImage = jsonOBJ.data.agentPhoto;
							$('.mgs-header-img img').attr('src', userImage);
						}
						var notification = jsonOBJ.data.message;
						let disconnect = 'Start new conversation';
						var responseHTML = `
						
								 <div class="agent-asigned">
									<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification}</div>
								        <!-- <div class="leave">${disconnect}</div> -->
								 </div>
							`
						
						appendAgentResponse(responseHTML);
						updateAgent(agentname);	
					}else{
						if(jsonOBJ.data.message){
						var notification = jsonOBJ.data.message;
						var responseHTML = `
						
								 <div class="agent-asigned">
									<div class="response"><i class="fa fa-lock" aria-hidden="true"></i> ${notification}</div>
								</div>
							`
						
						appendAgentResponse(responseHTML);
						}
					}
				}
				if(type == 'agentMessage') {
					agResponse = jsonOBJ.data.message;
					dateFormat();
					if(newDate){
						timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
					} else {
						timeString = hour+":"+min+" "+meridiem;
					}
					var responseHTML = `
							<div class="received-chats">
								<div class="received-chats-img"> 
									<img class="particons" src="${userImage}" />
								</div>
							 </div> 
							<div class="received-msg">
								<div class="received-msg-inbox">
									<div>${agResponse}</div>
								</div>
								<span class="time received-msg-time">
									${timeString}<i class="fa fa-check" aria-hidden="true"></i>
								</span>
							</div>
						`
					appendAgentResponse(responseHTML);
					
				}
				if(type == "botMessage"){
					agResponse = jsonOBJ.data.message;
					if(jsonOBJ.data.botPhoto){
						userImage = jsonOBJ.data.botPhoto;
						$('.mgs-header-img img').attr('src', userImage);
					}
					dateFormat();
					if(newDate){
						timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
					} else {
						timeString = hour+":"+min+" "+meridiem;
					}
					var responseHTML = `
							<div class="received-chats">
								<div class="received-chats-img"> 
									<img class="particons" src="${userImage}" />
								</div>
							 </div> 
							<div class="received-msg">
								<div class="received-msg-inbox">
									<div>${agResponse}</div>
								</div>
								<span class="time received-msg-time">
									${timeString}<i class="fa fa-check" aria-hidden="true"></i>
								</span>
							</div>
						`
					appendAgentResponse(responseHTML);
					
				}
				if(type == "visitorMessage"){
					appendSentMsgs(jsonOBJ.data.message);
				}
			
		});
		localStorage.setItem("chatBot",JSON.stringify(history));
		// console.log(chat_history)
	}
		function appendAgentResponse(html) {
			
			$('.msg-page').append(html);
			smooothScroll()
		}
		
		function updateAgent(name) {
			$('.mgs-header-img img').attr('src',userImage)
			$('.active h4').html(name);
		}
		''
		function applySettings(color) {
			// let appSettings = JSON.parse(settings.data);
			// primaryColor = appSettings.response.chatWidget.primaryColor;
			chatIcon.css({
				'background-color': color,
			});
			
			msgHeader.css({
				'background-color': color,
			});
			
			msgBottom.css({
				'background-color': color,
			});
				
			chatbotContainer.css({
				'border': '1px solid '+color,
			});
			
			sendIcon.css({
				'color': color,
			});
		}
		
		var max_chat_icon= function() {
			chatbotContainer.fadeIn(300);
			
			$('.chat-icon').css('display','none');
		        audio.play()
		        setTimeout(func=>{
		        	isOpen(chatSocket);
		        },100)
		        
			// $(this).removeClass('chat-icon').addClass('second-chat-icon').css('display',
			// 'none');

		}
		
		var minimise_chat_widget = function() {
			chatbotContainer.css('display', 'none');
			$('.chat-icon').css('display','inline-block');
		}
		var close_Chat = function() {
			chatSocket.close();
			chatSocket.onclose = () => {
			    console.log("closed");
				chat_close = true;
			};
			chatbotContainer.css('display', 'none');
			$('.chat-icon').css('display','inline-block');
		}
                
                // for refreshing chat without closing widget
		var refresh_chat = function() {
			console.log("refresh fun")			
			/*$('.chat-icon').css('display','inline-block');
			setTimeout(() => {
				$("#msg-connect").html("Trying to reconnect the bot..");
				 modal.style.display = "block";
				$(".msg-connection").show();
				connect();
			},100); */
		}

		
		// When the user clicks the button, open the modal
		var closePopup = function() { 
			$(".retryOption").hide();
			$(".msg-connection").hide();
			$(".close-content").show();
		  modal.style.display = "block";
		}
		$('body').on('click', '.chat-icon', max_chat_icon)
		$('body').on('click', 'svg', max_chat_icon)
		
                // for refreshing chat by closing chatwidget
		$('body').on('click','.chatbot-refresh',function() {
			localStorage.removeItem("chatBot");
			close_Chat(); 
			//refresh_chat(); 

		})
		$('body').on('click','.chatbot-minimize', minimise_chat_widget)
		$('body').on('click','.chatbot-close', closePopup)
		$('body').on('click','.close-chat', close_Chat)
		$('body').on('click','.retryOption',function(){
			connect();
		})

		/*
                $('body').on('click','.leave', function() {
			localStorage.removeItem("chatBot");
			close_Chat(); //ajaxGet();
		}) */

		
		// $('body').on('click','.second-chat-icon', max_sec_chat_icon)
		
	    // Get the modal
	var modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("cancel")[0];



	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}


		
		function smooothScroll() {
			chats = $('.chats')
			chats.scrollTop(chats[0].scrollHeight);
		}
		
		
		// Date Format
		function dateFormat() {
			newDate= false;
			localTimeStamp = 12;
			date = new Date(chatTime);
			hour = date.getHours();
			min = date.getMinutes();
			months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			monthName = months[date.getMonth()];
			today = date.getDate()
			
			hour = hour < 10 ? '0'+hour : hour;
			
			min = min < 10 ? '0'+min : min;
			
			meridiem = hour <= 12 ? 'AM' : 'PM'
			hour = hour > localTimeStamp ? hour - localTimeStamp : hour
		}

		
		function appendSentMsgs(msg) {
			dateFormat()
			if(newDate){
				timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
			} else {
				timeString = hour+":"+min+" "+meridiem;
			}
			$('.msg-page').append(`
					 <div class="outgoing-chats">
							<div class="outgoing-msg">
								<div class="outgoing-msg-inbox">
									<p style="background: ${layoutBG}">${msg}</p>
								</div>
								<span class="time sent-msg-time">
								  	${timeString} <i class="fa fa-check" aria-hidden="true"></i>
								  </span>
							</div>
					  </div>
					  `);
			smooothScroll()
		}
		
		
		// function buildMyUi(msg, ctype, btnsArray, text) {
		function buildMyUi(msg, ctype, ttype, btnsArray, text) {
			var menuOpt = '';
			splitString = text.split('\n')
			let steps = '';
				splitString.forEach(function(splitStr) {
					steps += '<div>'+splitStr+'</div>'
				})
			var a;
			if(msg == ''){
				a = '<div>'+steps+'</div>';
			}
			else if(text == ''){
				a = '<div>'+msg+'</div>';
			}
			else {
				a = '<div>'+steps+'</div>';
				a += '<div>'+msg+'</div>';
			}
			 
			dateFormat()
			btnOpt = '';
			if(ctype==="300" && ttype === "6") {
				btnsArray.forEach(function(ele) {
					btnOpt += '<button class="btn btn-primary query-btn" title="'+ele.message+'">'+ele.title+'</button>'
				})
			}else if(ctype==="300" && ttype === "3") {
				btnsArray.forEach(function(ele) {
					var target = "_blank";
					if(ele.openLinkInNewTab){
						target = "_parent";
					}
					btnOpt += '<a class="btn btn-primary link-btn " title="'+ele.name+'" href="'+ele.url+'" target="'+target+'" >'+ele.name+'</a>'
				})
			} else {
				btnOpt = '';
				btnsArray = [];
			}
			
			/*if(menuOption) {
				menuOpt = '<button class="btn btn-primary" id="menuOpt">Menu Option</button>'
			} */
			
			// $('.loader').css('display','none');
			if(newDate){
				timeString = date.toLocaleDateString()+" "+hour+":"+min+" "+meridiem;
			} else {
				timeString = hour+":"+min+" "+meridiem;
			}
			$('.msg-page').append(`
				 <div class="received-chats">
					<div class="received-chats-img"> 
						<img class="particons" src="${userImage}" />
					</div>
				 </div> 
				<div class="received-msg">
					<div class="received-msg-inbox">
						${a}
						${btnOpt}
						${menuOpt}
					</div>
					<span class="time received-msg-time">
						${timeString}  <i class="fa fa-check" aria-hidden="true"></i>
					</span>
				</div>
			`);
			btnsArray.length = 0;
			smooothScroll()
		}

		function appendResponse(result) {
				if(typeof result == 'object') {
					var fulfillmentMessages = result.content.queryResult.fulfillmentMessages;
					
					var uiElementArray = fulfillmentMessages.map((item,index) => {
						var uiElement = {};
						if(item.hasOwnProperty('text')){
							uiElement.text = item.text.text[0];
						}
						// check variable
						else if(item.hasOwnProperty('payload')){
							uiElement.message = item.payload.message;
							uiElement.contentType = item.payload.metadata.contentType;
							uiElement.payload = item.payload.metadata.payload;
						}
						return uiElement;
					})
					var uiElementForBuild = {};
					uiElementArray.forEach(function(element){
						if(element.hasOwnProperty('message')){uiElementForBuild.message = element.message;}
						if(element.hasOwnProperty('contentType')){uiElementForBuild.contentType = element.contentType;}
						if(element.hasOwnProperty('payload')){uiElementForBuild.payload = element.payload;}
						if(element.hasOwnProperty('text')){uiElementForBuild.text = element.text;}
					});
					buildMyUi(uiElementForBuild.message = typeof uiElementForBuild.message == 'undefined'? '' : uiElementForBuild.message,
							uiElementForBuild.contentType = typeof uiElementForBuild.contentType == 'undefined' ? '' : uiElementForBuild.contentType,
									uiElementForBuild.payload = typeof uiElementForBuild.payload == 'undefined' ? '' : uiElementForBuild.payload,
									uiElementForBuild.text = typeof uiElementForBuild.text == 'undefined' ? '' : uiElementForBuild.text);
				} else {
					buildMyUi(msg)
				}
				// console.log(result);
				
			}
			function appendResponseMetaData(result) {
				var uiElementForBuild = {};
				uiElementForBuild.message = result.data.message;
				uiElementForBuild.contentType = result.data.metadata.contentType;
				uiElementForBuild.templateType = result.data.metadata.templateId;
				uiElementForBuild.payload = result.data.metadata.payload;
				buildMyUi(uiElementForBuild.message = typeof uiElementForBuild.message == 'undefined'? '' : uiElementForBuild.message,
						uiElementForBuild.contentType = typeof uiElementForBuild.contentType == 'undefined' ? '' : uiElementForBuild.contentType,
						uiElementForBuild.templateType = typeof uiElementForBuild.templateType == 'undefined' ? '' : uiElementForBuild.templateType,
								uiElementForBuild.payload = typeof uiElementForBuild.payload == 'undefined' ? '' : uiElementForBuild.payload,
								uiElementForBuild.text = typeof uiElementForBuild.text == 'undefined' ? '' : uiElementForBuild.text);
			
			// console.log(result);
			
		}
		
		$('.msg-page').on('click', '.query-btn', function() {
			
			menuOption = true;
			$this = $(this);
			let title = $this.attr('title');
			let query = $this.attr('payload');
			chatTime=new Date().getTime();
			$('.loader').remove();
			appendSentMsgs(title);
			$('.msg-page').append(`
					  
					<div class="received-msg">
					
						<div class="loader"></div>
					</div>
				`);
				setTimeout(()=>{
					$('.loader').remove();

				},10000)
			isOpen(chatSocket);
			chatSocket.send(text_data=SendMsg(title));
			if(chatHistory){
				var msg = JSON.parse(SendMsg(title));
				msg.time=chatTime;
				history.push(msg);
	// history.push(JSON.parse(SendMsg(title)));
				localStorage.setItem("chatBot",JSON.stringify(history));
			}
		})
		
		$('.msg-page').on('click', '#menuOpt', function() {
			chats.animate({ scrollTop: 0 }, "slow");
			return false;		
		})
		
		chatbotForm.submit(function(e) {
			menuOption = true;
			msgText = msgBox.val();
			e.preventDefault();
			chatTime=new Date().getTime();
			$('.loader').remove();
			appendSentMsgs(msgText);
			$('.msg-page').append(`
					  
					<div class="received-msg">
					
						<div class="loader"></div>
					</div>
				`);
				setTimeout(()=>{
					$('.loader').remove();

				},10000)
			isOpen(chatSocket);
			chatSocket.send(SendMsg(msgText));
			if(chatHistory){
				var msg = JSON.parse(SendMsg(msgText));
				msg.time=chatTime;
				history.push(msg);
				localStorage.setItem("chatBot",JSON.stringify(history));
			}
			
			msgBox.val('');
		})
		},1000);
	});

