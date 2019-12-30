var nameOfStudent = document.getElementById("Name");
var ageOfStudent = document.getElementById("Age");
var lastNameOfStudent = document.getElementById("Lastname");
var city = document.getElementById("City");
var createButton = document.getElementById("Create");
var studentId = document.getElementById("StudentId");
var newStudent = document.createElement("div");
var result = document.getElementById("resulttable");
var deleteById = document.getElementById("Delete");
var updateButton = document.getElementById("Update");
var xhr = new XMLHttpRequest();

function renderTable(i, newStudentValue) {

    var divRow = "";
    for (var key in newStudentValue[i]) {
        divRow += "<div>"+ newStudentValue[i][key] +" </div>";
    }
    newStudent.innerHTML += "<div class='row' >" + divRow + "</div>";
    result.append(newStudent);
}


function createObj() {
    var studentid = studentId.value;
    var firstTd = nameOfStudent.value;
    var secondTd = ageOfStudent.value;
    var thirdTd = lastNameOfStudent.value;
    var forth = city.value;


    var userData = {
        id: studentid,
        username: firstTd,
        age: secondTd,
        lastname:thirdTd,
        city:forth
    };
    return userData;
}

function updateInfo(method) {
    if (studentId.value === "") {
        return;
    }

    var data = createObj();
    if(method === "PUT"){
        xhr.open("PUT", "/");
    } else {
        xhr.open("POST", "/");
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function createStudent() {
    if (studentId.value === "") {
        return;
    }

    updateInfo("POST");
    xhr.onload = function () {

        var newStudentValue =  JSON.parse(this.response);
        renderTable(0, newStudentValue);

    };
    xhr.onerror = function(){
        alert("server error");
    }
}

function ready(){

    xhr.open("GET","/");
    xhr.send();
    xhr.onload = function () {

        var newStudentValue =  JSON.parse(this.response);
        for(let i = 0; i < newStudentValue.length; i++) {
            renderTable(i, newStudentValue);
        }
    };

}

function deleteRow(){
    if (studentId.value === "") {
        return;
    }

    var idstudent = studentId.value;

    xhr.open("DELETE",`/:${idstudent}`);

    xhr.send();
}
function updateStudent() {
    updateInfo("PUT");
}

document.onload = ready();
updateButton.addEventListener("click", updateStudent);
deleteById.addEventListener("click", deleteRow);
createButton.addEventListener("click", createStudent);

