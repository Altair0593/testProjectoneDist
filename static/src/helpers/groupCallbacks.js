export {renderGroup, inputEnebled, postRequestGroup}
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

function postRequestGroup() {


    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${localhostServ}/groups`);
    var data = {groupName: insertGroup.value};
    console.log(data);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
            var newStudentValue = JSON.parse(this.response);
            console.log(newStudentValue)
            // for (let i = 0; i < newStudentValue.length; i++) {
            //     renderTable( newStudentValue[i]);
            // }

    }
    insertGroup.setAttribute("disabled","true")
    xhr.onerror = function(){
        // alert("server error");
    };
}
