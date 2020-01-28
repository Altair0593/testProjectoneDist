let languageBox={
    en:{ text:{
            myAccount: "My Account",
            exitCabinet: "Exit",
            classList: "Class list",
            labelName: "Name",
            labelLastname: "Lastname",
            labelAge: "Age",
            labelCity: "City",
            Create: "Create",
            tableName: "Name",
            tableLastname: "Lastname",
            tableAge: "Age",
            tableCity: "City",
            tableButtons: "Button",
        },
placeholder:{
    Name:"Write name",
    Lastname:"Write lastname",
    Age:"Write age",
    City:"Write city"
}

    },
    ru:{ text: {
            myAccount: "Мой кабинет",
            exitCabinet: "Выйти",
            classList: "Таблица классов",
            labelName: "Имя",
            labelLastname: "Фамилия",
            labelAge: "Возраст",
            labelCity: "Город",
            Create: "Создать",
            tableName: "Имя",
            tableLastname: "Фамилия",
            tableAge: "Возраст",
            tableCity: "Город",
            tableButtons: "Кнопки",
        },
        placeholder:{
            Name:"Введите имя",
            Lastname:"Введите фамилию",
            Age:"Введите возраст",
            City:"Введите город"
        }
    }
};
export {getSettings, changeLanguage, languageBox};
function getSettings() {
    let selectElementLanguage = document.getElementById("selectElementLanguage");
    selectElementLanguage.addEventListener("click", changeLanguage);
}
function changeLanguage() {
   let  language=selectElementLanguage.value;
   changeText(languageBox[language].text);
   changePlaceHolder(languageBox[language].placeholder)
}
function changeText(obj) {
    for (const key in obj) {
        document.getElementById(key).innerHTML = obj[key];
    }
};
function changePlaceHolder(obj) {
    for (const key in obj) {
        document.getElementById(key).placeholder = obj[key];
    }
};
