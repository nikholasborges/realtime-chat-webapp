//const user_username = JSON.parse(document.getElementById("username").textContent);
//var urlRoomName = JSON.parse(document.getElementById("room-name").textContent);

function isInvalidMessage(message) {
    return (!message || 0 === message.length || !message.trim());
};

function cleanTextInput() {
    document.querySelector("#chat-message-input").value = "";
};

if (localStorage.getItem("username") == null) localStorage.setItem("username", "undefined");
if (localStorage.getItem("roomname") == null) localStorage.setItem("roomname", "lobby");

const chatSocket = new WebSocket("ws://" + window.location.host + "/ws/chat/" + localStorage.getItem("roomname") + "/");

async function sendMessage() {
    const messageInputDom = document.querySelector("#chat-message-input");
    const username = localStorage.getItem("username");
    const message = messageInputDom.value;

    if (isInvalidMessage(message)) {
        messageInputDom.value = "";
        messageInputDom.placeholder = 'mensagem inválida!';
        return;
    }
    else {
        messageInputDom.placeholder = 'escreva aqui...'
    }


    await chatSocket.send(
        JSON.stringify({
            message: message,
            username: username,
        })
    );

    messageInputDom.value = "";
}

document.querySelector("#chat-message-input").focus();
document.querySelector("#chat-message-input").onkeyup = function (e) {
    if (e.keyCode === 13)
        sendMessage();

    if (e.keyCode === 46)
        cleanTextInput();

};

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    document.querySelector("#chat-log").value += data.username + ": " + data.message + "\n";
};

chatSocket.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
};
