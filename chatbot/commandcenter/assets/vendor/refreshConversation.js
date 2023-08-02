var customersObjectArray = [], currentTab, currentClient = '', changeDetected = false;
var msg, inputMsg_html;
let date, hour, min, meridiem, months, monthName, today, localTimeStamp;
export function refreshCustormersSidepanel() {
    $('#user-grid').html('');
    customersObjectArray = JSON.parse(localStorage.getItem("customersObjectArray"));
    if (customersObjectArray.length > 0) {
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
								<div class="created-date">
									${hour}:${min} ${meridiem}
								</div>
								<div class="user-lst-msg" id='${index}'>
									${showMsg}
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
						<div class="created-date">
							${hour}:${min} ${meridiem}
						</div>
						<div class="user-lst-msg" id='${index}'>
							${showMsg}
						</div>
						<span class="badge"><span class="counter">${badgeValue}</span></span>
					</div>
				</div>
			`);
            }


        });
    }

    if (customersObjectArray.length == 1) {
        $('.user-element:last-child').trigger("click").addClass('active');
    } else if (!changeDetected) {
        $('.user-element:last-child').trigger("click").addClass('active');
    }
}
$('#user-grid').on('click', '.user-element', function () {
    var client_id = $(this).attr('id');
    if (client_id != 0) {
        changeDetected = true;
    }
    currentClient = customersObjectArray[client_id].clientName;
    currentTab = client_id;
    $('.chat-message-list').html('');
    var client = $(this).find('.title-text');
    $('#client-name').html(client.text());
    var ele = $('.user-grid');
    var messages = customersObjectArray[client_id].messages;
    customersObjectArray[client_id].counter = 0;
    var badge = $(this).find('.badge');
    badge.html('');

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
            <div class="created-date toMsg-time">
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
            <div class="created-date toMsg-time">
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
            <div class="created-date toMsg-time">
            ${hour}:${min} ${meridiem}
        </div>
        </div> `
        }
        $('.chat-message-list').prepend(`
            ${prependString}
        `)
    })

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