'use strict';

const forbidden_paswords = ["1234", "12345", "654321", "qwerty", "password", "qazwsx"];
let count = 0;
let error = false;
let err_message = "";
document.addEventListener("DOMContentLoaded", () => {

    const login = document.getElementById("login");
    const password = document.getElementById("password");

    document.getElementById("confirm_button").addEventListener('click', (event) => { //confirm
        event.preventDefault();
        if (count > 5) {
            error = true;
            err_message = `Вы не смогли войти с 5-ти попыток! Доступ к сайту Заблокирован!`;
            console.log(err_message);
        }
        else if(check_password(password.value, forbidden_paswords) || !error){
            error = true;
            err_message = `Пароль ${password.value} слишком слабый, выберите другой`;
            console.log(err_message);
            if (login.value === password.value) {
                err_message ="Логин и пароль не должны совпадать";
                console.log(err_message);
            }
        }
    else{
            console.log("Добро пожаловать");
            count = 0;
        }
        console.log(count);
        count++;

    });
    count++;


});


//check of contains forbidden password

const check_password = function findFor(val, arr) {
    arr = arr.sort();
    let min = 0;
    let max = arr.length;
    let middle = Math.floor((min + max) / 2);
    let stepCount = 0;

    for (let i = 0; i <= arr.length; i++) {
        stepCount++;
        if (val === arr[middle]) {
            return true;
        } else {
            if (val <= arr[middle]) {
                max = middle;
            } else {
                min = middle;
            }
        }
        middle = Math.floor((min + max) / 2);
    }

    return false;

};

