import { getSettings, changeLanguage, languageBox } from './indexLanguage.js';
import {renderGroup, inputEnebled, postRequestGroup, localhostServ} from "./helpers/groupCallbacks";


var createButton = document.getElementById("Create");
var newStudent = document.createElement("div");
var result = document.getElementById("resulttable");
var myAccountBtn= document.getElementById("myAccount");
var exitCabinet = document.getElementById('exitCabinet');

var selectElementLanguage = document.getElementById("selectElementLanguage");

var wrapGroup = document.getElementById("wrap-group");
wrapGroup.addEventListener("dblclick", inputEnebled);
var addGroupBtn = document.getElementById("add-group");
addGroupBtn.addEventListener("click", renderGroup);
//addGroupBtn.addEventListener('click', postRequestGroup);

var wrapGroups = document.getElementById("group-wrapper");
wrapGroups.addEventListener("click", getStudents);


createButton.addEventListener("click", createStudent);
myAccountBtn.addEventListener("click", function(){
    document.location.href = 'http://localhost:7800/accountSettings.html'
});
exitCabinet.addEventListener('click', function(){
    localStorage.clear()
    document.location.href = 'http://localhost:7800/authorization.html'
});
selectElementLanguage.onchange = changeLanguage;

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
main();
function main(){
    changeLanguage();
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
        deleteRow(e.target);
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

}

function createStudent() {
    var data = createObj();
    console.log(data)
    if(!data)return;
    console.log(data)
    xhr.open("POST", `${localhostServ}`);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onerror = function(){
        alert("server error");
    };
    document.location.reload()
}

function createObj() {
    var nameOfStudent1 = document.getElementById("Name");
    var ageOfStudent1 = document.getElementById("Age");
    var lastNameOfStudent1 = document.getElementById("Lastname");
    var city1 = document.getElementById("City");
    var group = document.getElementById("Group")
    var userData = {
        username:  nameOfStudent1.value,
        age: ageOfStudent1.value,
        lastname:lastNameOfStudent1.value,
        city:city1.value,
        groups_id:eventGroupId
    };
    if(userData.username === "" || userData.lastname === "" || userData.age === "" ||
        userData.city === ""|| userData.groups_id === undefined){
        return false
    } else {
        return userData;
    }
}
function deleteRow(e){
    var idstudent = id;
    var data ={
        id:id
    };
    xhr.open("POST",`${localhostServ}/delete`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onload = function(){
        console.log(xhr.statusText)
        if(xhr.status !== 404){
            e.parentNode.parentNode.innerHTML = null
        }
    }
    //document.location.reload()
}


document.addEventListener("DOMContentLoaded", function (e) {
    //if(e.target.classList.contains("input-item"))return false
       var data =  {
           teachers_id: localStorage.getItem("teachers_id")
    }
    console.log(data)
    var div = document.getElementById("indexLoginName");
    div.innerText = localStorage.getItem("loginName");
    xhr.open("POST",`${localhostServ}/getAllGroups`)
    xhr.setRequestHeader("Content-type", "application/json");;
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {

        console.log(JSON.parse(this.response))
            var newStudentValue = JSON.parse(this.response);
            for (let i = 0; i < newStudentValue.length; i++) {
                var allroups = document.getElementsByClassName("group-wrapper__item");
                if(allroups.length >= 4){
                    return false
                }
                var relativeDiv = document.getElementById("group-wrapper");
                var newGroup = document.createElement("div");
                newGroup.setAttribute("class", "group-wrapper__item");
                var inputGroup = document.createElement("input");
                inputGroup.setAttribute("class", "toggle-students input-item");
                inputGroup.setAttribute("disabled","true");
                inputGroup.setAttribute("id",`${newStudentValue[i].groups_id}`);
                inputGroup.value = newStudentValue[i].groupname;
                relativeDiv.prepend(newGroup);
                newGroup.append(inputGroup)
            }

    }
});

function renderTable( newStudentValue) {
    var btnUpdate;
    var btnDelete;
    var divRow = "";
    var controlUpdateDelete = "";
    var id;
    for (var key in newStudentValue) {
        id = `${newStudentValue.user_id}`;
        btnUpdate = `<button id = "${newStudentValue.user_id}upd"  class="btn btnUpdate">Update</button>`;
        btnDelete =  `<button id = "${newStudentValue.user_id}del"  class="btn btnDelete">Delete</button>`;
        controlUpdateDelete = `<div class="row_childs"> ${btnUpdate} ${btnDelete} </div>`;
        if (key === "user_id" || key === "groups_id" || key === "group_name" ) {
            divRow +=  "";
        } else {
            divRow += `<input class="row_childs" value="${newStudentValue[key]}" disabled/>`;
        }
    }
    newStudent.innerHTML += "<div class='row ' id='row'>" + divRow + controlUpdateDelete + "</div>";
    result.append(newStudent);
}
var eventGroupId;

function getStudents(e) {
    if(!e.target.classList.contains("active")){
        eventGroupId = e.target.getAttribute("id");
        console.log(eventGroupId)
    }
    if (e.target.tagName !== "INPUT" || e.target.id == "insertGroup" ) {
        return false
    } else {
        console.log(e.target)
        var data = {
            name: e.target.getAttribute("id")
        };
        var xhr = new XMLHttpRequest();
        e.target.classList.toggle("active");
        e.target.style.color = "white";
        xhr.open("POST", `${localhostServ}/groupStudent`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));


        xhr.onload = function () {
            if (xhr.status == 401) {
                alert("insert correct login or password")
            } else {
                var newStudentValue = JSON.parse(this.response);
                for (let i = 0; i < newStudentValue.length; i++) {
                    renderTable(newStudentValue[i]);
                }
            }
        };
        var row = document.getElementById("row");

        if (row === null) {
            return false;
        } else {
            row.parentNode.innerHTML = null;
        }
    }

}


import "../public/css/index.less"


