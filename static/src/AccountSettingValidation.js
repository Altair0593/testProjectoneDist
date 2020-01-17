let teacher = getUserData();
setTimeout(fillInput, 800);
let SaveBtn = document.getElementById("SaveBtn");
SaveBtn.addEventListener("click", getValidation);

function getUserData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/accountSetting");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function () {
        teacher = JSON.parse(this.response);
        console.log(teacher);
    };
};

function fillInput() {
    document.getElementById("login").value = teacher[0].login;
    document.getElementById("email").value = teacher[0].email;
    document.getElementById("password1").value = teacher[0].password;
    document.getElementById("password2").value = teacher[0].password;
    document.getElementById("phone").value = teacher[0].phone_number;
}

let err = "";
let User = function () {
    this.login = document.getElementById("login").value.replace(/\s/g, '');
    this.password = document.getElementById("password1").value;
    this.password2 = document.getElementById("password2").value;
    this.email = document.getElementById("email").value;
    this.phone = document.getElementById("phone").value.replace(/[+()-\s]/g, '');
    this.user_id= teacher[0].user_id;
}

function getValidation() {
    let elementValue = new User();
    let message = document.getElementById("message");
    console.log(elementValue);
    if (checkEmail(elementValue.email) && checklogin(elementValue.login) && checkPass(elementValue.password, elementValue.password2) && checkPhone(elementValue.phone, "380")) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/accountupdate");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(elementValue));
        message.innerHTML = "Changes included";
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