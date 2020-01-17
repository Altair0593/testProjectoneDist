let registrationBtn = document.getElementById("registrationBtn");
registrationBtn.addEventListener("click", getValidation);
let err = "";
let User = function () {
    this.login = document.getElementById("login").value.replace(/\s/g, '');
    this.password = document.getElementById("password1").value;
    this.password2 = document.getElementById("password2").value;
    this.email = document.getElementById("email").value;
    this.phone = document.getElementById("phone").value.replace(/[+()-\s]/g, '');
}

function getValidation() {
    let elementValue = new User();
    let message = document.getElementById("message");
    console.log(elementValue);
    if (checkEmail(elementValue.email) && checklogin(elementValue.login) && checkPass(elementValue.password, elementValue.password2) && checkPhone(elementValue.phone, "380")) {
        delete elementValue.password2;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/registration");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(elementValue));
        xhr.onreadystatechange = function () {
            if (xhr.status === 400) {
                message.innerHTML = "Такой логин уже существует!";
            }

        }
        message.innerHTML = "Регистрация успешна";
        setTimeout(document.location.href = 'http://localhost:7800/authorization.html', 1500);
    } else {
        message.innerHTML = err;
    };
}

function checklogin(login) {
    if (login.length < 1 || !isNaN(Number(login[0]))) {
        err = "Некорректный логин";
        return false;
    }
    return true;
}

function checkPass(pass1, pass2) {
    if (pass1.length < 5 || pass1 !== pass2) {
        err = "Некорректный пароль";
        return false;
    }
    return true;
}

function checkPhone(phone, countriCode) {
    if (phone.length !== 12 || phone.substring(0, 3) != countriCode) {
        err = "Некорректныйтелефон";
        return false;
    }
    return true;
}
function checkEmail(email) {
    if (email.includes("@")) {
        let domen = email.substring(email.indexOf("@"), email.length);
        if (domen.length > 2) {
            return true;
        }

    }
    err = "Некорректный e-mail"
    return false;
}

import "../public/css/registration.less"