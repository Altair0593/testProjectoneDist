var loginAvt = document.getElementById("loginAvt");
var passwordAvt = document.getElementById("passwordAvt");
var logInBtn = document.getElementById("logInBtn");
var registrationBtn = document.getElementById("registrationBtnAvt")
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
    xhr.onreadystatechange = function () {
        if (xhr.status == 401) {
            alert("insert correct login or password")
        } else {
            document.location.href = 'http://localhost:7800/index.html'
        }
    }
}
import  "../public/css/autorization.less";


