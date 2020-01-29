let languageBox={
    en:{ text:{
            myAccount: "My Account",
            iconTitle: "Change your avatar",
            loginTitle: "New Login",
            password1Title: "New Password",
            password2Title: "Check password",
            emailTitle: "New Email",
            phoneTitle: "New Phone",
            aboutMyselfTitle: "About Myself",
            SaveBtn: "Save changes",
            close: "Close",
        },
    },
    ru:{ text: {
            myAccount: "Мой аккаунт",
            iconTitle: "Изменить свой аватар",
            loginTitle: "Новый логин",
            password1Title: "Новый парол",
            password2Title: "Проверка пароля",
            emailTitle: "Новый эмейл",
            phoneTitle: "Новый телефон",
            aboutMyselfTitle: "Обо мне",
            SaveBtn: "Сохранить изменения",
            close: "Закрыть",
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
}
function changeText(obj) {
    for (const key in obj) {
        document.getElementById(key).innerHTML = obj[key];
    }
}

export {getSettings, changeLanguage, languageBox};
