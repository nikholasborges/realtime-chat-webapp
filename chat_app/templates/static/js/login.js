function isInputInvalid(value) {
    return (!value || 0 === value.length || !value.trim());
};


function checkInputValues(username, roomname) {

    const invalidUsernameDom = document.querySelector("#invalid-username");
    const invalidRoomNameDom = document.querySelector("#invalid-roomname");

    let isInvalid = false;

    if (isInputInvalid(username)) {
        invalidUsernameDom.style.display = "inline";
        isInvalid = true;
    }
    else {
        invalidUsernameDom.style.display = "none";
    }


    if (isInputInvalid(roomname)) {
        invalidRoomNameDom.style.display = "inline";
        isInvalid = true;
    }
    else {
        invalidRoomNameDom.style.display = "none";
    }

    return isInvalid;
};

function loginHandle() {
    const usernameDom = document.querySelector("#username-input");
    const roomNameIdDom = document.querySelector("#roomname-input");

    if (checkInputValues(usernameDom.value, roomNameIdDom.value))
        return;

    localStorage.setItem("username", usernameDom.value);
    localStorage.setItem("roomname", roomNameIdDom.value);

    window.location.pathname = "/chat/" + roomNameIdDom.value + "/";
}

function toggleTip() {
    const tipDom = document.querySelector("#tip");

    let displayValue = tipDom.style.display;

    if (displayValue === 'block') {
        tipDom.style.display = 'none';
    }
    else {
        tipDom.style.display = 'block';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        console.log("enter key pressed");
        loginHandle();
    }
});


