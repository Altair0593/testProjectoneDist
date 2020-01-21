var nameOfStudent1 = document.getElementById("Name");
var ageOfStudent1 = document.getElementById("Age");
var lastNameOfStudent1 = document.getElementById("Lastname");
var city1 = document.getElementById("City");
var createButton = document.getElementById("Create");
var newStudent = document.createElement("div");
var result = document.getElementById("resulttable");
var myAccountBtn= document.getElementById("myAccount");
var exitCabinet = document.getElementById('exitCabinet');
createButton.addEventListener("click", createStudent);
myAccountBtn.addEventListener("click", function(){
    document.location.href = 'http://localhost:7800/accountSettings.html'
});
exitCabinet.addEventListener('click', function(){
    document.location.href = 'http://localhost:7800/authorization.html'
});
var localhostServ = "http://localhost:3000";
var xhr = new XMLHttpRequest();
var id;
var allInputs;
var ok = document.createElement("button");
ok.innerText = "ok";
ok.classList.add("btn");
ok.addEventListener("click", updateInfo);
var cancel = document.createElement("button");
cancel.innerText = "cancel";
cancel.classList.add("btn");
cancel.addEventListener("click", function () {
    document.location.reload()
});

function renderTable( newStudentValue) {
    var btnUpdate;
    var btnDelete;
    var divRow = "";
    var controlUpdateDelete = "";

    for (var key in newStudentValue) {
        id = `${newStudentValue.user_id}`;
        btnUpdate = `<button id = "${newStudentValue.user_id}upd"  class="btn btnUpdate">Update</button>`;
        btnDelete =  `<button id = "${newStudentValue.user_id}del"  class="btn btnDelete">Delete</button>`;
        controlUpdateDelete = `<div class="row_childs"> ${btnUpdate} ${btnDelete} </div>`;
        if(key === "user_id" || key === "teacher_id" ){
            divRow +=  "";
        }else {
            divRow += `<input class="row_childs" value="${newStudentValue[key]}" disabled/>`;
        }
    }
    newStudent.innerHTML += "<div class='row ' >" + divRow + controlUpdateDelete + "</div>";

    result.append(newStudent);

}
function toggleBilling(arg) {
    for (var i = 0; i < arg.length; i++) {
        arg[i].disabled = !arg[i].disabled;
    }
}

result.addEventListener("click", function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    var rows = document.getElementsByClassName("row");

    id = parseInt(e.target.getAttribute("id"));

    var str = "";

    if(e.target.innerText === "Update"){
        var upd = document.getElementById(e.target.getAttribute("id"));
        var del = document.getElementById(`${id}del`);
        allInputs = e.target.parentNode.parentNode.querySelectorAll(".row_childs");
        console.log(allInputs);
        if (allInputs.disable === true) {
            del.style.display = "inline-block";
            upd.style.display = "inline-block";
            return;
        }else {
            e.target.parentNode.append(ok);
            e.target.parentNode.append(cancel);
            toggleBilling(allInputs);
            del.style.display = "none";
            upd.style.display = "none";
        }
    } else if(e.target.innerText === "Delete") {
        deleteRow(id);
    }
});


function updateInfo() {
    var arrValues = [];
    for(var key in allInputs){
        arrValues.push(allInputs[key].value)
    }

    var arrValuestoSend = arrValues.slice(0, -3);
    var data = {
        id: id,
        username: arrValuestoSend[0],
        lastname: arrValuestoSend[1],
        age:arrValuestoSend[2],
        city:arrValuestoSend[3]
    };

    xhr.open("POST", `${localhostServ}/update`);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    document.location.reload()
    //document.getElementsByClassName("row").innerHTML = null;
}

function createObj() {
    var userData = {
        username:  nameOfStudent1.value,
        age: ageOfStudent1.value,
        lastname:lastNameOfStudent1.value,
        city:city1.value
    };
    if(userData.username === "" || userData.lastname === "" || userData.age === "" || userData.city === ""){
        return false
    } else {
        return userData;
    }
}

function createStudent() {
    var data = createObj();
    if(!data)return;

    xhr.open("POST", `${localhostServ}`);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onerror = function(){
        alert("server error");
    };
    document.location.reload()
}

function ready(){
    var div = document.getElementById("indexLoginName");
    div.innerText = localStorage.getItem("loginName");
    xhr.open("GET",`${localhostServ}`);
    xhr.send();

    xhr.onload = function () {
        if(xhr.status == 401){
            alert("insert correct login or password")
        }else{
            var newStudentValue = JSON.parse(this.response);
            for (let i = 0; i < newStudentValue.length ; i++) {
                renderTable( newStudentValue[i]);
            }
        }
    }
}

function deleteRow(id){
    var idstudent = id;
    var data ={
        id:id
    };
    xhr.open("POST",`${localhostServ}/delete`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    document.location.reload()
}

document.onload = ready();
import "../public/css/index.less"



