let languageBox={
    en:{ text:{
            textAuthorization:"Authorization",
            labelLogin:"Login:",
            labelPassword:"Password:",
            registrationBtnAvt:"Registration",
            logInBtn:"Log In"
        },
        placeholder:{
            loginAvt:"write your login",
            passwordAvt:"write your password",
        }

    },
    ru:{ text: {
            textAuthorization:"Авторизация",
            labelLogin:"Логин:",
            labelPassword:"Пароль:",
            registrationBtnAvt:"Регистрация",
            logInBtn:"Войти"
        },
        placeholder:{
            loginAvt:"Введите ваш логин",
            passwordAvt:"Введите ваш пароль",
        }
    }
};
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
}

export {getSettings, changeLanguage, languageBox};
