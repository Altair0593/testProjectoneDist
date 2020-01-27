import { getSettings, changeLanguage, languageBox } from './autorizationLanguage.js'
var loginAvt = document.getElementById("loginAvt");
var passwordAvt = document.getElementById("passwordAvt");
var logInBtn = document.getElementById("logInBtn");
var registrationBtn = document.getElementById("registrationBtnAvt");
var massage = document.getElementById("message");
var selectElementLanguage=document.getElementById("selectElementLanguage");
selectElementLanguage.onchange = changeLanguage;
loginAvt.onkeydown = function (e) {
    if(!e.key.match(/[0-9A-Z]/gi)){
        return false
    }
};
main();
function main(){
    changeLanguage();
}
var loginValue = {};
logInBtn.addEventListener("click", getElementValue);
registrationBtn.addEventListener("click", function () {
    document.location.href = 'http://localhost:7800/registration.html'
});

function getElementValue() {
    loginValue = {login: loginAvt.value, password: passwordAvt.value};
    localStorage.setItem('loginName', loginAvt.value)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/authorization");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(loginValue));
    xhr.onload = function () {
        if (xhr.status == 401) {
            massage.innerText = "Insert correct login or password!!!";
        } else {

            var newStudentValue = JSON.parse(this.response);
             localStorage.setItem("teachers_id", newStudentValue[0].teachers_id);
            document.location.href = 'http://localhost:7800/index.html'



        }
    }
}
import  "../public/css/autorization.less";




