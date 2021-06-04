var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
    });
    socket.on("chat_receive",(msg)=>{
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(msg);
    node.appendChild(textnode); 
    messages.appendChild(node);
    })