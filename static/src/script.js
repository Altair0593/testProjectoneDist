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
myAccountBtn.addEventListener("click", function(){document.location.href = 'http://localhost:3000/public/accountSettings.html'})
var xhr = new XMLHttpRequest();

var id;
function renderTable( newStudentValue) {
    var btnUpdate;
    var btnDelete;
    var divRow = "";

    for (var key in newStudentValue) {
        id = `${newStudentValue.user_id}`
        btnDelete =  `<button id = "${newStudentValue.user_id}del"  class="btn">Delete</button>`;
        btnUpdate = `<button id = "${newStudentValue.user_id}upd"  class="btn">Update</button>`
        if(key === "user_id" || key === "teacher_id" ){
            divRow +=  ""
        }else {
            divRow += `<input class="row_childs" value="${newStudentValue[key]}" disabled/>`;
        }
    }
    newStudent.innerHTML += "<div class='row ' >" + divRow  +btnUpdate + btnDelete + "</div>";


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
    var rows = document.getElementsByClassName("row")

    id = parseInt(e.target.getAttribute("id"));

    var str = "";

    if(e.target.innerText === "Update"){
       e.target.parentNode.append(ok)
       allInputs = e.target.parentNode.getElementsByTagName("input");
        toggleBilling(allInputs);
        var upd = document.getElementById(e.target.getAttribute("id"));
        var del = document.getElementById(`${id}del`);
        del.style.display = "none";
        upd.style.display = "none";
    } else if(e.target.innerText === "Delete") {
        deleteRow(id);
    }
});


var ok = document.createElement("button");
ok.addEventListener("click", updateInfo);
ok.innerText = "ok";
ok.classList.add("btn");

function updateInfo() {

    var arrValues = [];

    for(key in allInputs){
        arrValues.push(allInputs[key].value)
    }

    var arrValuestoSend = arrValues.slice(0, -3);
    console.log(arrValuestoSend)
     var data = {
        id: id,
        username: arrValuestoSend[0],
        age: arrValuestoSend[1],
        lastname:arrValuestoSend[2],
        city:arrValuestoSend[3]
    };
    console.log(data)
    xhr.open("PUT", "/");

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

    xhr.open("POST", "/");

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onerror = function(){
        alert("server error");
    };
    document.location.reload()
}

function ready(){
    var div = document.createElement("div");
    document.body.append(div);
    div.innerText = localStorage.getItem("loginName");
    div.style.color = "white"
    xhr.open("GET","/");
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
    };

}

function deleteRow(id){


    var idstudent = id;

    xhr.open("DELETE",`/:${idstudent}`);

    xhr.send();
    document.location.reload()
}
function updateStudent() {
    updateInfo();
}

document.onload = ready();
// updateButton.addEventListener("click", updateStudent);
// deleteById.addEventListener("click", deleteRow);
createButton.addEventListener("click", createStudent);




// e.target.parentNode.after (ok);
// e.target.parentNode.after (city);
// e.target.parentNode.after (lastNameOfStudent);
// e.target.parentNode.after (ageOfStudent);
// e.target.parentNode.after (nameOfStudent);
// for(var key in e.target.parentNode.children){
//         if(e.target.parentNode.children[key].innerHTML!="undefined" || e.target.parentNode.children[key].innerHTML != "Update"
//         && e.target.parentNode.children[key].innerHTML != "Delete")
//         str += e.target.parentNode.children[key].innerHTML;
//
// }
// console.log(e.target.parentNode.children);
// console.log(e.target)





// var buttonUndate = document.createElement("button");
//     var buttonDelete = document.createElement("button" );
//     buttonUndate.innerText = "update";
//     buttonDelete.innerText = "delete";
//
//     buttonUndate.addEventListener("click", updateInfo);
//     buttonDelete.addEventListener("click", deleteRow);
//
// newStudent.append(buttonDelete)
//newStudent.append(buttonUndate)