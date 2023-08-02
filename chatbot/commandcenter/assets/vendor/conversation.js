var client_div = [];
var customersObjectArray = [], currentTab, currentClient = '', changeDetected = false;
var msg, inputMsg_html;
let date, hour, min, meridiem, months, monthName, today, localTimeStamp;
//let AgentWSurl = 'ws://127.0.0.1/ws/agent/';
// let AgentWSurl = 'ws://7.134.29.6/ws/agent/';
//let AgentWSurl = 'ws://192.168.1.184/ws/agent/';
let AgentWSurl = 'ws://192.168.145.75/ws/agent/';

$(document).ready(function () {

	// Conversation tabs
	/*$('.conv-tab').click(function() {
		$('.conv-tab').removeClass('active');
		$(this).addClass('active');
	})
	*/

	// Search agent

	/*	$('#serach-agent').keyup(function() {
			var name = $(this).val().toLowerCase();
			
		})*/


	//token = "Bearer " +token
	//console.log(token);
	//$(document).cookie = 'X-Authorization=' + token + '; path=/';
	//var chatSocket = new WebSocket('wss://call2transact.com/ws/agent/Suresh/');
	var wsId = localStorage.getItem("wsId");
	//var chatSocket = new WebSocket('wss://call2transact.com/ws/agent/'+wsId+'/')
	//{
	// 	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaGF2YW5hNDMzOUBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNDQyOTMsIm5iZiI6MTY2MDE0NDI5MywianRpIjoiZmFlZGYxMWEtYzc5ZS00NGU0LWJhYzUtNDc5ZjA2YjhhMjA1IiwiZXhwIjoxNjYwMTQ1MjUzLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlLCJuYW1lIjoiYmhhdmFuYSBiayIsInJvbGUiOiJTdXBlckFkbWluIiwid3MiOiI4Y2E5ZmU4NDFhNTc0M2YwOGM1Nzk4NTUwZjM4NGJmYiJ9.NBvgKHkWAT29c4J6rnxahnCXR-D1NeG9srwkkVyZbAE",
	// 	"refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaGF2YW5hNDMzOUBnbWFpbC5jb20iLCJpYXQiOjE2NjAxNDQyOTMsIm5iZiI6MTY2MDE0NDI5MywianRpIjoiZTIxMzVkY2MtODk0ZC00ZGY2LWJiN2UtMjE5NmI4NTNmOTIzIiwiZXhwIjoyNjIwMTQ0MjkzLCJ0eXBlIjoicmVmcmVzaCJ9.uCH9oMc1iVGA1FlsQIXeDshwohlhZtDxut21f9D95XM"
	// }

	console.log(document.cookie)
	var chatSocket = new WebSocket(AgentWSurl);

	if (localStorage.getItem("customersObjectArray")) {
		customersObjectArray = JSON.parse(localStorage.getItem("customersObjectArray"));
		refreshCustormersSidepanel();
	}
	$(".conversations").hide();
	chatSocket.onclose = () => {
		console.log("closed");
		connectAgain();
	};
	chatSocket.onmessage = function (e) {
		receivedMessage(e)
	}
	chatSocket.onerror = function (err) {
		console.error('Socket encountered error: ', err.message, 'Closing socket');
		chatSocket.close();
	};
	function connectAgain() {
		chatSocket = new WebSocket(AgentWSurl);
		chatSocket.onmessage = function (e) {
			receivedMessage(e)
		}
		chatSocket.onclose = () => {
			console.log("closed");
			connectAgain();
		};
		chatSocket.onerror = function (err) {
			console.error('Socket encountered error: ', err.message, 'Closing socket');
			chatSocket.close();
		};
	}
	function receivedMessage(e) {

		var data;
		data = JSON.parse(e.data);
		var type = data.type;
		var subType = data.subType;
		data = data.data || data.content || data;
		//var type = data.fe_type; 
		var isPresent = false;
		if (customersObjectArray.length > 0) {
			customersObjectArray.forEach((element, index) => {
				if (element.clientName == data.visitorId) {
					isPresent = true;
				}
			})
		}
		var clientMsg, client_name, time;
		if (type == 'serverActivity') {
			if (subType && subType == "visitorAssigned") {
				if (!isPresent) {
					var customerObject = {};
					customerObject.clientName = data.visitorId;
					customerObject.messages = [];
					customerObject.counter = 0;
					customersObjectArray.push(customerObject);
					clientMsg = data.message;
					client_name = data.visitorId;
					time = data.messageTime;
				} else {
					clientMsg = data.message;
					client_name = data.visitorId;
					time = data.messageTime;
				}

			}
		}


		if (type == 'visitorMessage') {
			if (!isPresent) {
				var customerObject = {};
				customerObject.clientName = data.visitorId;
				customerObject.messages = [];
				customerObject.counter = 0;
				customersObjectArray.push(customerObject);
				clientMsg = data.message;
				client_name = data.visitorId;
				time = data.messageTime;
			} else {
				clientMsg = data.message;
				client_name = data.visitorId;
				time = data.messageTime;
			}
		}

		if (type == 'visitorActivity') {
			clientMsg = data.message;
			client_name = data.visitorId;
			time = data.messageTime;
		}
		if (customersObjectArray.length > 0) {
			customersObjectArray.forEach((element, index) => {
				if (element.clientName == client_name) {
					if (type == 'visitorActivity') {
						element.notification = clientMsg;
					} else {
						var msg = {};
						msg.fromMsg = clientMsg;
						msg.fromTime = new Date();
						msg.toMsg = '';
						msg.toTime = '';
						element.messages.push(msg);
						element.counter = element.counter + 1;
						element.notification ="";
					}


				}
			})
			localStorage.setItem("customersObjectArray", JSON.stringify(customersObjectArray))
			var path = (document.location.href).split('/');
			var pathname = path[path.length - 1];
			if (pathname == "conversation") {
				refreshCustormersSidepanel();

				if (customersObjectArray.length == 1) {
					$('.user-element:last-child').trigger("click").addClass('active');
				} else if (!changeDetected) {
					$('.user-element:last-child').trigger("click").addClass('active');
				}
			}



		}

	}

	function refreshCustormersSidepanel() {
		$('#user-grid').html('');
		customersObjectArray.forEach((element, index) => {
			var badgeValue;
			if (currentTab == index) {
				badgeValue = '';
			} else {
				if (element.counter == 0 || element.counter == '' || element.counter == undefined) {
					badgeValue = '';
				} else {
					badgeValue = element.counter;
				}
			}

			if (badgeValue == '') {
				var ele = document.getElementById('user-grid');
				var time = '';
				var fromMsg = element.messages[element.messages.length - 1].fromMsg;
				var toMsg = element.messages[element.messages.length - 1].toMsg;
				var showMsg = "";
				if (toMsg) {
					showMsg = toMsg;
					time = element.messages[element.messages.length - 1].toTime;
				} else {
					showMsg = fromMsg;
					time = element.messages[element.messages.length - 1].fromTime;
				}
				dateFormat(time);
				ele.insertAdjacentHTML('afterbegin', `
				<div class="user-element" id='${index}'>
								<div class="agent-img">
									<img src="/assets/post-login/images/agent.jpg" alt="" />
								</div>
								<div class="agent-info">
									<div class="title-text">
										${element.clientName}
									</div>
									<div class="user-lst-msg" id='${index}'>
										${showMsg}
									</div>
									<div class="created-date">
										${hour}:${min} ${meridiem}
									</div>
								</div>
							</div>
				`);


			} else {
				var ele = document.getElementById('user-grid');
				var time = '';
				var fromMsg = element.messages[element.messages.length - 1].fromMsg;
				var toMsg = element.messages[element.messages.length - 1].toMsg;
				var showMsg = "";
				if (toMsg) {
					showMsg = toMsg;
					time = element.messages[element.messages.length - 1].toTime;
				} else {
					showMsg = fromMsg;
					time = element.messages[element.messages.length - 1].fromTime;
				}
				dateFormat(time);
				ele.insertAdjacentHTML('afterbegin', `
				<div class="user-element" id='${index}'>
						<div class="agent-img">
							<img src="/assets/post-login/images/agent.jpg" alt="" />
						</div>
						<div class="agent-info">
							<div class="title-text">
								${element.clientName}
							</div>
							<div class="user-lst-msg" id='${index}'>
								${showMsg}
							</div>
							<span class="badge"><span class="counter">${badgeValue}</span></span>
							<div class="created-date">
								${hour}:${min} ${meridiem}
							</div>
						</div>
					</div>
				`);
			}


		});

		$('#' + currentTab).trigger('click');
	}

	$('#user-grid').on('click', '.user-element', function () {
		var client_id = $(this).attr('id');
		if (client_id != 0) {
			changeDetected = true;
		}
		$("#chat").attr("disabled",false);
		$(".conversations-info").hide();
		$(".conversations").show();
		currentClient = customersObjectArray[client_id].clientName;
		currentTab = client_id;
		$('.chat-message-list').html('');
		var client = $(this).find('.title-text');
		$('#client-name').html(client.text());
		var ele = $('.user-grid');
		var messages = customersObjectArray[client_id].messages;
		var notifications = customersObjectArray[client_id].notification;
		customersObjectArray[client_id].counter = 0;
		var badge = $(this).find('.badge');
		badge.html('');
		localStorage.setItem("customersObjectArray", JSON.stringify(customersObjectArray))
		$('.user-element').removeClass('active');
		$(this).addClass('active');
		$(this).find('.badge').removeClass('badge');
		messages.forEach((element, index) => {
			var prependString = '';
			if (element.fromMsg && element.toMsg) {

				var toTime = element.toTime;
				dateFormat(toTime);
				toTime = hour + ":" + min + " " + meridiem
				var fromTime = element.fromTime;
				dateFormat(fromTime);
				fromTime = hour + ":" + min + " " + meridiem
				prependString = `
			<div class="message-row you-message" id="chat-log">
			<div class="message-text">${element.toMsg}</div>
			<div class="toMsg-time">
				${toTime}
			</div>
			</div>
			
			<div class="message-row other-message" id="chat-log">
					<div class="message-text">
					${element.fromMsg}
				</div>
				<div class="fromMsg-time">
				${fromTime}
			</div>
			</div> 
			`

			} else if (element.fromMsg && !element.toMsg) {
				var fromTime = element.fromTime;
				dateFormat(fromTime);
				prependString = `<div class="message-row other-message" id="chat-log">
					<div class="message-text">
					${element.fromMsg}
				</div>
				<div class="fromMsg-time">
				${hour}:${min} ${meridiem}
			</div>
			</div>`
			} else if (!element.fromMsg && element.toMsg) {
				var toTime = element.toTime;
				dateFormat(toTime);
				prependString = `<div class="message-row you-message" id="chat-log">
								<div class="message-text">${element.toMsg}</div>
								<div class="toMsg-time">
				${hour}:${min} ${meridiem}
			</div>
								</div>`
			} else {
				var fromTime = element.fromTime;
				dateFormat(fromTime);
				prependString = `<div class="message-row other-message" id="chat-log">
					<div class="message-text">
					${element.fromMsg}
				</div>
				<div class="fromMsg-time">
				${hour}:${min} ${meridiem}
			</div>
			</div> `
			}
			$('.chat-message-list').prepend(`
				${prependString}
			`)
		})
		
		if(notifications) {
			var notificationaString = `<div style="text-align: center;
										font-size: 0.7em;
										color: grey;">
										<i class="fa fa-lock" aria-hidden="true"></i>
									${notifications}
								</div>`;
			$('.chat-message-list').prepend(`
			${notificationaString}
			`)
			$("#chat").attr("disabled",true);
		}

	})

	$('#chat').on('focus', function (e) {
		$(this).on('keyup', function (e) {

			msg = $(this).val();
			var sendMsg = msg;
			if (e.keyCode == 13) {

				if ($(this).val() == '') {
					//alert('Field should not be empty')
					return false;
				}
				$('.chat-message-list').prepend(`<div class="message-row you-message" id="chat-log"><div class="message-text">${msg}</div></div>`);

				//				   customersObjectArray[parseInt(currentTab)].messages[ customersObjectArray[parseInt(currentTab)].messages.length-1].toMsg = msg;
				if (customersObjectArray.length > 0) {
					customersObjectArray.forEach((element, index) => {

						if (element.clientName == currentClient) {
							var isFlag = false;
							if (element.messages.length > 0) {
								var msgLength = element.messages.length;
								var toMsg = element.messages[msgLength - 1].toMsg;
								if (!toMsg) {
									customersObjectArray[parseInt(currentTab)].messages[customersObjectArray[parseInt(currentTab)].messages.length - 1].toMsg = sendMsg;
									customersObjectArray[parseInt(currentTab)].messages[customersObjectArray[parseInt(currentTab)].messages.length - 1].toTime = new Date();
									isFlag = true;
								}

							}
							if (!isFlag) {
								var msg = {};
								msg.fromMsg = '';
								msg.fromTime = '';
								msg.toTime = new Date();
								msg.toMsg = sendMsg;
								element.messages.push(msg);
							}

						}
					})
				}
				localStorage.setItem("customersObjectArray", JSON.stringify(customersObjectArray))
				/*chatSocket.send(JSON.stringify({
					'message': msg,
					'client_name': currentClient
				}));*/
				chatSocket.send(JSON.stringify(
					{
						type: "agentMessage",
						data: {
							message: msg,
							messageTime: new Date().getTime(),
							visitorID: currentClient
						}
					}));
				$(this).val('');
				refreshCustormersSidepanel();

			}
		})
	})
	// Date Format
	function dateFormat(time) {

		localTimeStamp = 12;

		date = new Date(time);


		hour = date.getHours();
		min = date.getMinutes();
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		monthName = months[date.getMonth()];
		today = date.getDate()

		hour = hour < 10 ? '0' + hour : hour;

		min = min < 10 ? '0' + min : min;

		meridiem = hour <= 12 ? 'AM' : 'PM'
		hour = hour > localTimeStamp ? hour - localTimeStamp : hour
	}
})
