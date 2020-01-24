export {renderGroup, inputEnebled, postRequestGroup, createObj, localhostServ}
var localhostServ = "http://localhost:3000";
function renderGroup () {
    var allroups = document.getElementsByClassName("group-wrapper__item");
    if(allroups.length >= 4){
        return false
    }
    var relativeDiv = document.getElementById("group-wrapper");
    var newGroup = document.createElement("div");
    newGroup.setAttribute("class", "group-wrapper__item");
    var inputGroup = document.createElement("input");
    inputGroup.setAttribute("class", "input-item ");
    inputGroup.setAttribute("disabled","true");
    inputGroup.value = insertGroup.value;
    relativeDiv.prepend(newGroup);
    newGroup.append(inputGroup)
}


function inputEnebled(e) {
   if(e.target.tagName !== "INPUT") return;
    e.target.removeAttribute("disabled");
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
        group:group.value
    };
    if(userData.username === "" || userData.lastname === "" || userData.age === "" ||
        userData.city === ""|| userData.group === ""){
        return false
    } else {
        return userData;
    }
}


function postRequestGroup() {


    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${localhostServ}/groups`);
    var data = {groupName: insertGroup.value};
    console.log(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
            var newStudentValue = JSON.parse(this.response);

    }
    insertGroup.setAttribute("disabled","true");
    xhr.onerror = function(){
         alert("server error");
    };
}
