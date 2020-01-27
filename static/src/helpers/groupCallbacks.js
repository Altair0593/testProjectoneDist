export {renderGroup, inputEnebled, postRequestGroup, localhostServ}
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
    newGroup.append(inputGroup);
    postRequestGroup();

}


function inputEnebled(e) {
   if(e.target.tagName !== "INPUT") return;
    e.target.removeAttribute("disabled");
}





function postRequestGroup() {


    var xhr = new XMLHttpRequest();
    var insertGroup = document.getElementById("insertGroup");

    xhr.open("POST", `${localhostServ}/groups`);
    var data = {groupName: insertGroup.value, teachers_id: localStorage.getItem("teachers_id")};

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onload = function () {
            var newStudentValue = this.response;
            console.log(newStudentValue)

    }
    insertGroup.setAttribute("disabled","true");
    xhr.onerror = function(){
         console.log("server error");
    };
}
