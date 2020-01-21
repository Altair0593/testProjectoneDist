var nameOfStudent1 = document.getElementById("Name");
var ageOfStudent1 = document.getElementById("Age");
var lastNameOfStudent1 = document.getElementById("Lastname");
var city1 = document.getElementById("City");
var createButton = document.getElementById("Create");
var studentId = document.getElementById("StudentId");
var newStudent = document.createElement("div");
var result = document.getElementById("resulttable");
var deleteById = document.getElementById("Delete");
var updateButton = document.getElementById("Update");
var myAccountBtn= document.getElementById("myAccount");
var exitCabinet = document.getElementById('exitCabinet');
myAccountBtn.addEventListener("click", function(){document.location.href = 'http://localhost:7800/accountSettings.html'});
exitCabinet.addEventListener('click', function(){document.location.href = 'http://localhost:7800/authorization.html'});

var xhr = new XMLHttpRequest();

var id;
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
var allInputs;
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

var ok = document.createElement("button");
ok.addEventListener("click", updateInfo);
ok.innerText = "ok";
ok.classList.add("btn");
var cancel = document.createElement("button");
cancel.addEventListener("click", updateInfo);
cancel.innerText = "cancel";
cancel.classList.add("btn");

function updateInfo() {
    var arrValues = [];

    for(var key in allInputs){
        arrValues.push(allInputs[key].value)
    }

    var arrValuestoSend = arrValues.slice(0, -3);
    console.log(arrValuestoSend)
    var data = {
        id: id,
        username: arrValuestoSend[0],
        lastname: arrValuestoSend[1],
        age:arrValuestoSend[2],
        city:arrValuestoSend[3]
    };
    console.log(data)
    xhr.open("POST", "http://localhost:3000/update");

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    document.location.reload()
    //document.getElementsByClassName("row").innerHTML = null;
}

function createObj() {
    var firstTd = nameOfStudent1.value;
    var secondTd = ageOfStudent1.value;
    var thirdTd = lastNameOfStudent1.value;
    var forth = city1.value;

    var userData = {
        username: firstTd,
        age: secondTd,
        lastname:thirdTd,
        city:forth
    };
    return userData;
}

function createStudent() {
    var data = createObj();

    xhr.open("POST", "http://localhost:3000/");

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
    xhr.open("GET","http://localhost:3000/");
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
    }
    console.log(`http://localhost:3000/:${idstudent}`)
    xhr.open("POST",`http://localhost:3000/delete`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    document.location.reload()
}
function updateStudent() {
    updateInfo();
}

document.onload = ready();

createButton.addEventListener("click", createStudent);

import "../public/css/index.less"



