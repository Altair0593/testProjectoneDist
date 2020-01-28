import { getSettings, changeLanguage, languageBox } from './accountSettingsLanguage';
import {checkValueLength} from "./helpers/scriptValidation";

var login = document.getElementById("login");
login.oninput = function () {
    checkValueLength(this, 14);
} ;
var password = document.getElementById("password1");
password.oninput = function () {
    checkValueLength(this, 25);
} ;
var password2 = document.getElementById("password2");
password2.oninput = function () {
    checkValueLength(this, 25);
} ;
var email = document.getElementById("email");
email.oninput = function () {
    checkValueLength(this, 25);
} ;
var phone = document.getElementById("phone");
phone.oninput = function () {
    checkValueLength(this, 13);
} ;

let aboutMyself = document.getElementById("aboutMyself");
aboutMyself.addEventListener('keydown', checkCurrentLengthText);
let aboutMyselfCounter = 150;
let textAreaCount = document.getElementById("textAreaCount");

let teacher = getUserData();
setTimeout(fillInput, 800);

let SaveBtn = document.getElementById("SaveBtn");
SaveBtn.addEventListener("click", getValidation);

let closeBtn = document.getElementById("close");
closeBtn.addEventListener('click',() => {document.location.href = 'http://localhost:7800/index.html'});

var selectElementLanguage=document.getElementById("selectElementLanguage");
selectElementLanguage.onchange = changeLanguage;

main();
function main(){
    changeLanguage();
}

function getUserData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/accountSetting");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function () {
        teacher = JSON.parse(this.response);
        console.log(teacher);
    };
}

function fillInput() {
    document.getElementById("login").value = teacher[0].login;
    document.getElementById("email").value = teacher[0].email;
    document.getElementById("password1").value = teacher[0].password;
    document.getElementById("password2").value = teacher[0].password;
    document.getElementById("phone").value = teacher[0].phone_number;
    document.getElementById("aboutMyself").value = teacher[0].about_myself;
    // document.getElementById("teacherIcon").src = teacher[0].teacher_icon;
}

let err = "";
let User = function () {
    // this.document.getElementById("login").value.replace(/\s/g, '');
    // this.password.value;
    // this.password2.value;
    // this.email.value;
    // this.phone.value.replace(/[+()-/\s]/g, '');
    // this.aboutMyself = document.getElementById("aboutMyself").value;
    // this.teachers_id = teacher[0].teachers_id;
    // this.icon =  document.getElementById("icon").value;
};

function getValidation() {
    // let elementValue = new User();
    let elementValue = {
        login: login.value.replace(/\s/g, ''),
    password:password.value,
        password2:   password2.value,
        email:   email.value,
        phone:  phone.value.replace(/[+()-/\s]/g, ''),
        aboutMyself:  aboutMyself = document.getElementById("aboutMyself").value,
        teachers_id: teacher[0].teachers_id,
        // this.icon =  document.getElementById("icon").value;
    };
    console.log(elementValue)
    let message = document.getElementById("message");
    if (checkEmail(elementValue.email) && checklogin(elementValue.login) && checkPass(elementValue.password, elementValue.password2) && checkPhone(elementValue.phone, "380")) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/accountupdate");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(elementValue));
        message.innerHTML = "Changes included";
        console.log(elementValue);
        setTimeout(document.location.href = 'http://localhost:7800/authorization.html', 1500);
    } else {
        message.innerHTML = err;
    }
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
    if (phone.length !== 12 || phone.substring(0, 3) !== countriCode) {
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
    err = "Некорректный e-mail";
    return false;
}

function checkCurrentLengthText() {
    if (aboutMyself.value.length > 150) {
        return;
    }
   textAreaCount.innerText =  String(aboutMyselfCounter - aboutMyself.value.length);
}

import "../public/css/accountSettings.less"