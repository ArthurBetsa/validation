'use strict';

// Start work with form's validation.

const forbiddenPaswords = ["1234", "12345", "654321", "qwerty", "password", "qazwsx"];
let count_Validation_Calls = 0;
let count_Messages = 0;
let message = "";

// Random integer from min to max (max+1)

// Create unique ID;
const returnID = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


// Check is form contains forbidden password. | Get password.
const isForbiddenPassword = (password) => forbiddenPaswords.includes(password);


// Validation of login and password. |  Get value of login and password, return message.
const form_Validation = (login, password) => {

    count_Validation_Calls++;

    if (count_Validation_Calls >= 5) {
        login.disabled = 1;
        password.disabled = 1;
        return message = `Вы не смогли войти с 5-ти попыток! Доступ к сайту Заблокирован!`;
    }
    if ((login.value === "" || password.value === "")) {
        return message = "Логин и пароль не должны быть пустыми";
    }
    if (login.value === password.value) {
        return message = "Логин и пароль не должны совпадать";
    }
    if (isForbiddenPassword(password.value)) {
        return message = `Пароль ${password.value} слишком слабый, выберите другой`;
    } else {
        count_Validation_Calls = 0;
        login.value = "";
        password.value = "";
        return message = "Добро пожаловать";
    }
};


// Start work with page.
document.addEventListener("DOMContentLoaded", () => {

    // Form data.
    let login = document.getElementById("login");
    let password = document.getElementById("password");


    // Pop up data
    const pop_up_wrap = document.getElementById("pop_up_wrap");
// Checking click of the form button.
    document.getElementById("confirm_button").addEventListener('click', confirm_Form);

// Close pop-up message by click
    document.addEventListener("click", closeMessage);

    return false;
});


const confirm_Form = event => {
    event.preventDefault();

    let message = form_Validation(login, password);
    let pop_up_Message = new create_Pop_up_Message(message);
    pop_up_Message.rendrer();

    if (count_Messages === 6) {
        pop_up_wrap.firstChild.remove();
        count_Messages--;
    }
    return false;
};

//__________________________________________________________________________________
///////////////////  End work with form's validation.  /////////////////////////////


////////////////////////////////////////////////////////////////////////////////////

//__________________________________________________________________________________
///////////////////  Start work with pop up messages.  /////////////////////////////

// Close pop-up message by click
const closeMessage = (event) => {
    if (event.target.className === "pop_close") {
        event.target.offsetParent.remove();
        count_Messages--;
    }
    return false;
};


class create_Pop_up_Message {
    constructor(message) {
        this.message = message;
        this.id = returnID();
        this.timer;
        this.messageId;
        this.opacity = 1;
    }

    // Render new message
    rendrer() {

        count_Messages++;

        let pop_up_message =
            `<div class="message" id="${this.id}">`
            + `<p>${this.message}</p>`
            + `<div class="pop_close" ></div>`
            + `</div>`

        pop_up_wrap.innerHTML += pop_up_message;

        // this.toFade();

        setTimeout(() => {
            this.delete_message()
        }, 5000);
    }

    // To reduce messages opacity color
    toFade() {
        this.timer = setInterval(() => {
            this.messageId = document.getElementById(`${this.id}`);
            if (this.messageId) {
                this.messageId.style.backgroundColor = `rgba(117, 228, 29, ${this.opacity})`;
                this.opacity -= 0.016;
            }
        }, 100)
    }

    // Delete message
    delete_message() {
        if (this.messageId) {
            this.messageId.remove();
            count_Messages--;
            clearTimeout(this.timer);
        }
    }
}

