import {localhostServ} from "./groupCallbacks";

export function getServerResponse(data, path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${localhostServ}/${path}`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if ( path == "delete") {
            callback();
        }
        if (path === "groups" && xhr.status == 401) {
            alert("insert correct login or password")
        }
        if ( xhr.readyState === 4 && xhr.response !== null ) {
            callback(JSON.parse(xhr.response));
        }
    };
    xhr.send(JSON.stringify(data));
}

export function setActiveStateByTarget(target, groupWrapper) {
    if (target.classList) {
        target.classList.toggle("active");
    }
    for (var innerDiv of groupWrapper.children) {
        if (innerDiv.firstElementChild !== target && innerDiv.firstElementChild.classList.contains("active")) {
            innerDiv.firstElementChild.classList.toggle("active");
        }
    }
}
