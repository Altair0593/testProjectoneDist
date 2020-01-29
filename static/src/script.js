import {getSettings, changeLanguage, languageBox} from './indexLanguage.js';
import {renderGroup, inputEnebled, postRequestGroup, localhostServ} from "./helpers/groupCallbacks";
import * as utils from "../src/helpers/utils";
import {checkOnlyNumbers, checkValueLength} from "./helpers/scriptValidation";
import "../public/css/index.less"

var createButton = document.getElementById("Create");
var table = document.getElementById("resulttable");
var myAccountBtn = document.getElementById("myAccount");
var exitCabinet = document.getElementById('exitCabinet');
var groupWrapper = document.querySelector(".group-wrapper");
var selectElementLanguage = document.getElementById("selectElementLanguage");

var nameStudent = document.getElementById("Name");
var lastName = document.getElementById("Lastname");
var city = document.getElementById("City");
var ageInput = document.getElementById("Age");
ageInput.oninput = checkOnlyNumbers;
nameStudent.oninput = function () {
    checkValueLength(this, 16)
};
lastName.oninput = function () {
    checkValueLength(this, 16)
};
city.oninput = function () {
    checkValueLength(this, 16)
};

var wrapGroup = document.getElementById("wrap-group");
wrapGroup.addEventListener("dblclick", inputEnebled);
var addGroupBtn = document.getElementById("add-group");
addGroupBtn.addEventListener("click", renderGroup);
//addGroupBtn.addEventListener('click', postRequestGroup);

var wrapGroups = document.getElementById("group-wrapper");
wrapGroups.addEventListener("click", tabClick);

var eventGroupId;

createButton.addEventListener("click", createStudent);
myAccountBtn.addEventListener("click", function () {
    document.location.href = 'http://localhost:7800/accountSettings.html'
});
exitCabinet.addEventListener('click', function () {
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

main();

function main() {
    changeLanguage();
}

function toggleBilling(arg) {
    for (var i = 0; i < arg.length; i++) {
        arg[i].disabled = !arg[i].disabled;
    }
}

table.addEventListener("click", function (e) {
    if (e.target.tagName !== 'BUTTON') return;

    if(e.target.innerText === "cancel") {
        var allInputs = e.target.parentNode.parentNode.querySelectorAll(".row_childs");
        var childCount = 0;
        var buttonCount = 0;
        for (var element of allInputs) {
            element.disabled = true;
            if (childCount === 4) {
                for (var el of element.children) {
                    if (buttonCount < 2) {
                        el.style.display = "inline-block";
                        buttonCount++
                    }else {
                        el.style.display = "none";
                    }
                }
            }
            childCount++;
        }
    }
});

table.addEventListener("click", function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    var rows = document.getElementsByClassName("row");

    id = parseInt(e.target.getAttribute("id"));

    var str = "";

    if(e.target.innerText === "Update"){
        var upd = document.getElementById(e.target.getAttribute("id"));
        var del = document.getElementById(`${id}del`);
        allInputs = e.target.parentNode.parentNode.querySelectorAll(".row_childs");
        del.style.display = "inline-block";
        upd.style.display = "inline-block";

        for (var element of allInputs) {
            for (var el of element.children) {
                if(el.textContent === "ok" || el.textContent === "cancel") {
                    el.style.display = "inline-block";
                }else {
                    e.target.parentNode.append(ok);
                    e.target.parentNode.append(cancel);
                }
            }
        }
        toggleBilling(allInputs);
        del.style.display = "none";
        upd.style.display = "none";

    } else if(e.target.innerText === "Delete") {
        deleteRow(e.target);
    }
});

function updateInfo(e) {
    var arrValues = [];
    for (var key in allInputs) {
        arrValues.push(allInputs[key].value)
    }

    var arrValuestoSend = arrValues.slice(0, -3);
    console.log(allInputs[4])

    var data = {
        id: id,
        username: arrValuestoSend[0],
        lastname: arrValuestoSend[1],
        age: arrValuestoSend[2],
        city: arrValuestoSend[3]
    };
    localStorage.setItem("student_id", id)
    xhr.open("POST", `${localhostServ}/update`);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        if (xhr.status == 401) {
            alert("insert correct login or password")
        } else {
            allInputs = e.target.parentNode.parentNode.querySelectorAll(".row_childs");
            var studid = localStorage.getItem("student_id");
            toggleBilling(allInputs);
            var childCount = 0;
            var buttonCount = 0;
            // console.log(allInputs[4])
            for (var element of allInputs) {
                if (childCount === 4) {
                    for (var el of element.children) {
                        if (buttonCount < 2) {
                            el.style.display = "inline-block";
                            buttonCount++
                        }else {
                            el.style.display = "none";
                        }
                    }
                }
                childCount++;
            }
        }
    };
    e.stopPropagation();
}

function createStudent(e) {
    var data = createObj();
    if (!data) return;

    xhr.open("POST", `${localhostServ}`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {

            var userData = {
                username: document.getElementById("Name").value,
                lastname: document.getElementById("Lastname").value,
                age: document.getElementById("Age").value,
                city: document.getElementById("City").value,
                groups_id: eventGroupId,
                user_id: JSON.parse(this.response)[0].user_id
            };
            var divRow = createRow(userData);

            table.insertAdjacentHTML("beforeend", divRow);
        }
    };
    xhr.onerror = function () {
        alert("server error");
    };
    e.stopPropagation();
}

function createObj(id) {
    var nameOfStudent1 = document.getElementById("Name");
    var ageOfStudent1 = document.getElementById("Age");
    var lastNameOfStudent1 = document.getElementById("Lastname");
    var city1 = document.getElementById("City");
    var group = document.getElementById("Group");

    var userData = {
        username: nameOfStudent1.value,
        age: ageOfStudent1.value,
        lastname: lastNameOfStudent1.value,
        city: city1.value,
        groups_id: eventGroupId,
    };
    if (userData.username === "" || userData.lastname === "" || userData.age === "" ||
        userData.city === "" || userData.groups_id === undefined) {
        return false
    } else {
        return userData;
    }
}

function deleteRow(event) {
    utils.getServerResponse({id: id}, "delete", () => {
        event.parentNode.parentNode.innerHTML = null;
    })
}

document.addEventListener("DOMContentLoaded", function (e) {
    var div = document.getElementById("indexLoginName");
    div.innerText = localStorage.getItem("loginName");

    utils.getServerResponse({teachers_id: localStorage.getItem("teachers_id")}, "getAllGroups", renderGroupTabs);
});

function renderGroupTabs(data) {
    if (!Array.isArray(data)) {
        return;
    }
    for (var tab of data) {
        var allroups = document.getElementsByClassName("group-wrapper__item");
        if (allroups.length >= 4) {
            return false
        }
        var relativeDiv = document.getElementById("group-wrapper");
        var newGroup = document.createElement("div");
        newGroup.setAttribute("class", "group-wrapper__item");
        var inputGroup = document.createElement("input");
        inputGroup.setAttribute("class", "toggle-students input-item");
        inputGroup.setAttribute("disabled", "true");
        inputGroup.setAttribute("id", `${tab.groups_id}`);
        inputGroup.value = tab.groupname;
        relativeDiv.prepend(newGroup);
        newGroup.append(inputGroup)
    }
}

function createRow(studentData) {
    var btnUpdate;
    var btnDelete;
    var input = "";
    var controlUpdateDelete = "";
    for (var key in studentData) {
        const {user_id: userId} = studentData;
        btnUpdate = `<button id = "${userId}upd"  class="btn btnUpdate">Update</button>`;
        btnDelete = `<button id = "${userId}del"  class="btn btnDelete">Delete</button>`;
        controlUpdateDelete = `<div class="row_childs"> ${btnUpdate} ${btnDelete} </div>`;
        if (key !== "user_id" && key !== "groups_id" && key !== "group_name") {
            input += `<input class="row_childs" value="${studentData[key]}" disabled/>`;
        }
    }
    return `<div class='row ' id='row'> ${input} ${controlUpdateDelete}</div>`;
}

function tabClick(event) {
    if (event.target.tagName !== "INPUT" || event.target.id == "insertGroup") {
        return false;
    }
    var target = event.target;
    var tabId = target.getAttribute("id");
    eventGroupId = tabId;
    utils.setActiveStateByTarget(target, groupWrapper);
    utils.getServerResponse({name: tabId}, "groupStudent", redrawTable);
}

function redrawTable(data) {
    if (!Array.isArray(data)) {
        return;
    }
    table.innerHTML = "";
    for (var student of data) {
        var divRow = createRow(student);
        table.insertAdjacentHTML('beforeend', divRow);
    }
}
