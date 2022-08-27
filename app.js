function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
setCookie("name", "aniketcoockie", 30);
var myDataRef = firebase.database().ref('chat');
$('#namesubmit').click(() =>{
  
  var name = $('#nameInput').val();
          if (name != null){
    
            $('.name').addClass("hide");
            $('#namesubmit').addClass("hide");
            $('#messageInput').removeClass("hide");
            $('#msgsubmit').removeClass("hide");
          }

        });
       
          $('#msgsubmit').click(()=> {
            if ($('#messageInput').val().length >=1){
            //console.log("click on msg")
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            // myDataRef.push({name: name, text: text});
            myDataRef.push({
                name: name,
                text: text
            });
            $('#messageInput').val('');
          }
        });
        
    
      myDataRef.on('child_added', function(chatting) {
        var message = chatting.val();
        displayChatMessage(message.name, message.text);
      });
      myDataRef.on('child_removed', function(chatting) {
        var deletedPost = chatting.val();
        console.log("Chat was removed", deletedPost);
      });
      
      function displayChatMessage(name, text) {
     
        $('<div/>').text(text).addClass("text-msg").prepend($('<em/>').text(name+': ').addClass("text-name")).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };

    
  
