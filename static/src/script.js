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
    //console.log(parseInt("20del"))
    //console.log(newStudentValue)

    for (var key in newStudentValue) {
        //console.log( newStudentValue[i].user_id)
       // buttonUndate.setAttribute("id", `${newStudentValue[i].user_id}`)
        id = `${newStudentValue.user_id}`
        btnDelete =  `<button id = "${newStudentValue.user_id}del"  >Delete</button>`;
        btnUpdate = `<button id = "${newStudentValue.user_id}upd" >Update</button>`
        if(key === "user_id" || key === "teacher_id" ){
            divRow +=  ""
        }else {
            divRow += "<div>" + newStudentValue[key] + " </div>";
        }
    }
    newStudent.innerHTML += "<div class='row ' >" + divRow  +btnUpdate + btnDelete + "</div>";


    result.append(newStudent);


}


result.addEventListener("click", function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    var rows = document.getElementsByClassName("row")

    id = parseInt(e.target.getAttribute("id"));
    //console.log(id)
    var str = ""

    if(e.target.innerText === "Update"){
        e.target.parentNode.after (ok);
        e.target.parentNode.after (city);
        e.target.parentNode.after (lastNameOfStudent);
        e.target.parentNode.after (ageOfStudent);
        e.target.parentNode.after (nameOfStudent);
        for(var key in e.target.parentNode.children){
                if(e.target.parentNode.children[key].innerHTML!="undefined" || e.target.parentNode.children[key].innerHTML != "Update"
                && e.target.parentNode.children[key].innerHTML != "Delete")
                str += e.target.parentNode.children[key].innerHTML;

        }
        console.log(e.target.parentNode.children);
        console.log(e.target)
    } else {
        deleteRow(id);
    }
});
console.log(id)

var nameOfStudent = document.createElement("input");
var ageOfStudent = document.createElement("input");
var lastNameOfStudent = document.createElement("input");
var city = document.createElement("input");
var ok = document.createElement("button");
ok.addEventListener("click", updateInfo);
ok.innerText = "ok";

function updateInfo() {
    console.log(id)
    var studentid = id;
    var firstTd = nameOfStudent.value;
    var secondTd = lastNameOfStudent.value;
    var thirdTd = ageOfStudent.value;
    var forth = city.value;
    var data = {
        id: studentid,
        username: firstTd,
        age: secondTd,
        lastname:thirdTd,
        city:forth
    };

    xhr.open("PUT", "/");

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    //document.location.reload()
    document.getElementsByClassName("row").innerHTML = null;
    ready()

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