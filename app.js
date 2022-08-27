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
          //console.log("click on msg")
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          // myDataRef.push({name: name, text: text});
          myDataRef.push({
              name: name,
              text: text
          });
          $('#messageInput').val('');
        
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

    
  