
var apiURL = apiURL || baseURL;
var debug = true;
var css = '.iframe{width:75px;height:75px;border:1;position:fixed;bottom:5%;border:0;overflow:hidden}.iframeMaximize{width:478px;height:590px;overflow:hidden}@media only screen and (max-width: 478px) {.iframeMaximize {width: 350px!important;}}';
var head = document.getElementsByTagName('head')[0];

var iframeStyle =  document.createElement('style');
iframeStyle.appendChild(document.createTextNode(css))
head.append(iframeStyle);


function createMetas() {
	  var meta = document.createElement('meta');
	  meta.setAttribute('name', 'viewport');
	  meta.setAttribute('content', 'width=device-width, initial-scale=1');
	  head.append(meta)
}

function checkMetas() {
	var metas = document.getElementsByTagName('meta'), found = true;
	
	if(metas.length != 0) {
		for (var i=0; i<metas.length; i++) {
			  var meta = metas[i];
			  if (meta.getAttribute('name') == 'viewport') {
				found = false;
			    return found;
			  } 
		}
		if(found) {
			createMetas()
		}
	} else {
		createMetas()
	}
}

checkMetas()


var body = document.getElementsByTagName('body')[0];
var iframe = document.createElement('iframe');
var iframeClassList, iframeLaunchIcon, chatbotClose, iframeBody,chatbotMinimize;
//var iframeURL = baseURL + '/static/iframeContent.html'
var iframeURL = baseURL + '/assets/chat-widget/iframeContent.html'


iframe.className = 'iframe';
iframe.setAttribute('name', 'iframedoc');
iframe.setAttribute('data-url', baseURL);
iframe.setAttribute('api-url', apiURL);
iframe.setAttribute('bot-id', bot_id);
iframe.setAttribute('app-id', app_id);
iframe.setAttribute('name', 'iframedoc');
body.append(iframe)
var doc = frames["iframedoc"].document;
doc.open();
doc.close();

myIFrame = iframe.contentWindow ||
iframe.contentDocument.document ||
iframe.contentDocument;
myIFrame.document.open();
myIFrame.document.write(`
<body>
	<div class="chat-icon" id="chat" style="display:none">
	<div id="default-icon"><!-- <i class="fa fa-comments-o" aria-hidden="true"></i> -->
	<a class="chat-launch-icon-type" >
              <img    class="tab-icon launch-icon" >
            </a>
	</div>
	<div id ="default-upload">
	<img  style="height:40px; width:40px"  id="selected-icon">
	</div>
	            
	
		
	</div>
			<div class="container">
				<div class="chatbot-container">
					<div class="msg-header">
						<div class="row">
							<div class="col-md-6 col-6 col-6">
								<div class="row">
									<div class="col-md-3 col-3 col-3">
										<div class="mgs-header-img">
											<img class="headerImg" src="" />
											<i class="fa fa-circle" id="online" aria-hidden="true"></i>
										</div>
									</div>
									<div class="col-md-9 col-9 col-9">
										<div class="active">
											<h4 id ="bot-name">DIVA</h4>
											<h6 id ="bot-online">Online</h6>
										</div>
									</div>
								</div>
							</div>
							
							<div class="col-md-4 col-4 col-4" align="right">
								<!-- <div class="mgs-header-button">
									<button class="btn btn-default">FAQ <i class="fa fa-external-link" aria-hidden="true"></i></button>
								</div> -->
							</div>
							
							<div class="col-md-2 col-2 col-2 chatbot-right-click">
							    <div class="chatbot-minimize">
									<i class="fa fa-minus" aria-hidden="true"></i>
								</div>
								<div class="chatbot-close">
									<i class="fa fa-times" aria-hidden="true"></i>
								</div>
							</div>
							
						</div>
						
					</div>
					<div class="chat-page">
						<div class="msg-inbox">
							<div class="chats">
							    
								<div class="msg-page"></div>
							</div>
						</div>
						
						<div class="msg-bottom">
							<form id="chatbot-form">
								<div class="input-group">
										<input type="text" class="form-control" id="msg" placeholder="Type your message..." required autocomplete="off">
										<div class="input-group-append">
											<button type="submit" id="chatButton"><span class="input-group-text" id="send">
												<i class="fa fa-paper-plane" aria-hidden="true"></i>
											</span></button>
										</div>
								</div>
							</form>
						</div>
						<!-- The Modal -->
				<div id="myModal" class="closePopup-modal">

					<!-- Modal content -->
					<div class="modal-content">
					<div class = "msg-connection"><span id= "msg-connect">Trying to connect bot..</span></div>
					<div style="display:flex;justify-content:center"><button class="retryOption" style="background-color: rgb(0, 167, 157);border:none">Retry option</button></div>
							    
					<div class="close-content">
					Do you want to cancel the chat?
					 <div style="display:flex;margin-top:5px">
						<button class="close-chat" style="background-color: rgb(0, 167, 157);">Yes</button>
						<button class="cancel">No</button>
					</div>
					</div>
					</div>

				</div>
					</div>
					
				</div>
				
			</div>
			</div>
</body>
`);
myIFrame.document.close();

iframeLaunchIcon = iframe.contentWindow.document.getElementsByClassName("chat-icon")[0];
iframeMinimize = iframe.contentWindow.document.getElementsByClassName("minimize")[0];
chatbotMinimize =  iframe.contentWindow.document.getElementsByClassName("chatbot-minimize")[0];
chatbotClose = iframe.contentWindow.document.getElementsByClassName("chatbot-close")[0];
	
	iframeLaunchIcon.onclick = function() {
		iframe.classList.add('iframeMaximize')
	}
	
	if(iframe.classList.contains('minimize')) {
		iframeMinimize.onclick = function() {
			iframe.classList.add('iframeMaximize')
		}
	}
	chatbotMinimize.onclick = function() {
		iframe.classList.remove('iframeMaximize');
	}

var linkFont = document.createElement('link');
linkFont.href = 'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap';
linkFont.rel = 'stylesheet';


var linkBoot = document.createElement('link');
linkBoot.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
linkBoot.rel = 'stylesheet';

var linkFA = document.createElement('link');
linkFA.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
linkFA.rel = 'stylesheet';

var linkMyStyle = document.createElement('link');
//linkMyStyle.href = baseURL + '/static/api/style.css';
linkMyStyle.href = baseURL + '/assets/chat-widget/style.css';
linkMyStyle.rel = 'stylesheet';

/*var jqLib = document.createElement('script');
jqLib.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';*/

var jqPopper = document.createElement('script');
jqPopper.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js';

var jqBoot = document.createElement('script');
jqBoot.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';


var fpMyScript = document.createElement('script');
fpMyScript.src = 'https://openfpcdn.io/fingerprintjs/v3/iife.min.js';

var polyFillJs = document.createElement('script');
polyFillJs.src = 'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js';

var lifev3js = document.createElement('script'); 
lifev3js.src = 'https://openfpcdn.io/fingerprintjs/v3/iife.min.js';

var jqMyScript = document.createElement('script');
//jqMyScript.src = baseURL + '/static/api/main.js';
jqMyScript.src = baseURL + '/assets/chat-widget/js/main.js';


iframeClassList = document.getElementsByClassName('iframe')[0];
iframeHead = iframeClassList.contentWindow.document.getElementsByTagName('head')[0];
iframeBody = iframeClassList.contentWindow.document.getElementsByTagName('body')[0];
iframeBody.style.overflow = 'hidden';


iframeHead.appendChild(linkFont);
iframeHead.appendChild(linkBoot);
iframeHead.appendChild(linkFA);
iframeHead.appendChild(linkMyStyle);



function LoadLibrary(liburl,callback){
    var jscript = document.createElement("script");
    jscript.type = 'text/javascript';
    jscript.src = liburl;
    console.log(jscript.readyState);
    //for IE type browsers
    if (jscript.readyState) { 
        jscript.onreadystatechange = function () {
            if (jscript.readyState == "loaded" || jscript.readyState == "complete") {
                jscript.onreadystatechange = null;
                callback();
            }
        };
    } else {
        jscript.onload = function () {
            callback();
        };
    }
    iframeHead.appendChild(jscript);
}

LoadLibrary('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
	    function(){
		iframeHead.appendChild(jqPopper);
		 iframeHead.appendChild(jqBoot);
		 iframeHead.appendChild(polyFillJs);
		 iframeHead.appendChild(lifev3js);
		 iframeHead.appendChild(fpMyScript);
		 
		 iframeHead.appendChild(jqMyScript);
		 
		 
		 // 
	    }
	);

/*window.onload = function() {
	 iframeHead.appendChild(jqPopper);
	 iframeHead.appendChild(jqBoot);
	 iframeHead.appendChild(jqMyScript);
} */

//var xhttp = new XMLHttpRequest();
//
//xhttp.onreadystatechange = function() {
//  if (this.readyState == 4 && this.status == 200) {
//	  doc.body.innerHTML = this.responseText;
//
//	  iframeLaunchIcon = iframeClassList.contentWindow.document.getElementsByClassName("chat-icon")[0];
//		iframeMinimize = iframeClassList.contentWindow.document.getElementsByClassName("minimize")[0];
//		chatbotMinimize =  iframeClassList.contentWindow.document.getElementsByClassName("chatbot-minimize")[0];
//		chatbotClose = iframeClassList.contentWindow.document.getElementsByClassName("chatbot-close")[0];
//  		
//  		iframeLaunchIcon.onclick = function() {
//  			iframeClassList.classList.add('iframeMaximize')
//  		}
//  		
//  		if(iframeClassList.classList.contains('minimize')) {
//  			iframeMinimize.onclick = function() {
//  				iframeClassList.classList.add('iframeMaximize')
//  			}
//  		}
//  		chatbotMinimize.onclick = function() {
//  			iframeClassList.classList.remove('iframeMaximize');
//  		}
//  		/*chatbotClose.onclick = function() {
//  			iframeClassList.classList.remove('iframeMaximize');
//  		}*/
//  	}
//};
//
//xhttp.open("GET", iframeURL , true);
//xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
//xhttp.setRequestHeader('Content-type', '*')
//xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
//xhttp.send()

