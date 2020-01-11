var registrationBtn = document.getElementById("registrationBtn");
registrationBtn.addEventListener("click", getValidation);

function getElementValue() {
    var login = document.getElementById("login").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    return { login: login, password: password1, password2: password2, email: email, phone: phone }
}
function getValidation() {
    var elementValue = getElementValue();
    if (checklogin(elementValue.login) && checkPass(elementValue.password, elementValue.password2) && checkPhone(elementValue.phone, "+380")) {
        delete elementValue.password2;
        console.log("Регистрация успешна");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/registration");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(elementValue));
        xhr.onreadystatechange = function () {
            if (xhr.status == 400) {
                alert("user already exist");
            }
        }

        }
}
function checklogin(login) {
    if (login.length < 1 || !isNaN(Number(login[0]))) {
        console.log("Неверный логин");
        return false;
    }
    return true;
}
function checkPass(pass1, pass2) {
    if (pass1.length <= 5 || pass1 !== pass2) {
        console.log("Неверный пароль");
        return false;
    }
    return true;
}
function checkPhone(phone, countriCode) {
    if (phone.length !== 13) {
        console.log("Неверный телефон");
        return false;
    }
    return true;
}
