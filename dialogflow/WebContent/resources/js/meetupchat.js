(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            
            return $('.message_input').val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        
      
       /* $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });*/
        sendMessage('Welcome to API.AI Bot! :-)');
       
        
    });
}.call(this));
$(document).ready(function(){
var ip ="";
var country_code = "";
var country_name="";
var region_code= "";
var region_name= "";
var city = "";
var zip_code="";
var direction="";
 var accessToken = "YOUR CLIENT TOKEN",
      baseUrl = "https://api.api.ai/v1/";
	  
	   $.getJSON('http://freegeoip.net/json/?callback=?', function(data) {
			
			  ip =data.ip;
			   country_code = data.metro_code;
			   country_name=data.country_name;
			  region_code= data.latitude+"/"+data.longitude;
			   region_name= data.region_name;
			   city = data.city;
			  zip_code=data.zip_code;
			console.log(data);
			// Agentstatus();
			});
$('.send_message').click(function (e) {
	var msg = jQuery(".message_input").val();
	
	direction="U";
	if(msg==''){
	alert("Empty Message");
	return false;
	}
		
if(msg!=''){
	$("ul.messages").append("<li class='message right appeared'><div class='avatar'></div>"+
			"<div class='text_wrapper'><div class='text'>"+msg+"</div></div>"+
			"<span class='chat-time'>"+startTime()+"</span></li>");
	$('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
	$('.message_input').val("");
	//store DB
	var data={
			"ip": ip,
			"country_code" : country_code,
			"country_name" : country_name,
			"region_name" : region_name,
			"region_code" : region_code,
			"city" : $("#amount").val(),
			"zip_code" : zip_code,
			"msg" : msg,
			"direction" : direction,
		};
	 
	$.ajax({
        type: "POST",
        url: "chatlogcontroller",
        method : "POST",
		data :data ,
        
		success : function(result) {
			//console.log(result)
				//alert("Msg added successfully");
			
		}
		
		});
var text=msg;
text=text.toLowerCase();
	
	
		jQuery.support.cors = true;
		 $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({query: text, lang: "en", sessionId: "yaydevdiner"}),
			success : function(data) {
			//console.log(data.result.speech);
				direction="A";
				
				$("ul.messages").append("<li class='message left appeared'><div class='avatar'></div>"+
						"<div class='text_wrapper'><div class='text'>"+data.result.speech+"</div></div> <span class='chat-time'>"+startTime()+"</span></li>");
				$('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300);
			
				
				//store DB
				var data={
						"ip": ip,
						"country_code" : country_code,
						"country_name" : country_name,
						"region_name" : region_name,
						"region_code" : region_code,
						"city" : $("#amount").val(),
						"zip_code" : zip_code,
						"msg" : data.result.speech,
						"direction" : direction,
					};
				 
				$.ajax({
			        type: "POST",
			        url: "chatlogcontroller",
			        method : "POST",
					data :data ,
			        
					success : function(result) {
						//console.log(result)
							//alert("Msg added successfully");
						
					}
					
					});
				
					 
			}
		});
}
 
 //$('.chat_window').scrollTop($('.chat_window')[0].scrollHeight);


   // return sendMessage(getMessageText());
});
$('.message_input').keyup(function (e) {
    if (e.which === 13) {
    	$('.send_message').trigger('click');
    }
	
});
});
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var date = new Date();
 
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
 

