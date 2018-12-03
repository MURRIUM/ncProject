'use strict'

let hidden = true;

Array.prototype.parseAll = function() {
    for (let i = 0; i < this.length; i++) {
        try {
            this[i] = JSON.parse(this[i]);
        } catch (error) {
            console.log('oops ' + error);
        }
    }
}

function showAddMenu() {
    if (hidden) {
        document.getElementById('addNewForm').setAttribute('style', 'display: block;');
    } else {
        document.getElementById('addNewForm').setAttribute('style', 'display: none;');
    }
    hidden = !hidden;
}

function addLi(number) {
    let ul = document.getElementById('todo');
    let newLi = document.createElement('li');
    let span = document.createElement('span');
    let input = document.createElement('input');
    let date = document.createElement('em');
    input.type = "checkbox";
    if (this.done) {
        input.checked = true;
    }

    let node = document.createTextNode(number);
    span.appendChild(node);
    newLi.appendChild(span);
    newLi.id = +number - 1;

    node = document.createTextNode(this.value);
    newLi.appendChild(node);

    node = document.createTextNode(this.date);
    date.appendChild(node);
    date.style.fontSize = "12px";
    date.style.fontStyle = "italic";
    newLi.appendChild(date);

    newLi.appendChild(input);

    ul.appendChild(newLi);
}

function saveToLS(obj) {
    refreshStorage();
    var str = JSON.stringify(obj);
    localStorage.setItem(localStorage.length, str);
}

//async
function loadFromLS() {
    refreshPromise().then(function() {
        let ul = document.getElementById('todo');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        let arr = new Array();
        for (let i = 0; i < localStorage.length; i++) {
            arr.push(localStorage.getItem(localStorage.key(i)));
        }
        arr.parseAll();
        for (let i = 0; i < arr.length; i++) {
            addLi.call(arr[i], i + 1);
        }
    });
}

//async
function newNote() {
    refreshPromise().then(function() {
        let note = document.getElementById('note').value;
        let isReady = document.getElementById('done').checked;
        let obj = {
            value: note,
            date: new Date(),
            done: isReady
        };
        obj.date.setHours(obj.date.getHours() + 3);
        console.log(document.getElementById('done').checked);
        document.getElementById('addNewForm').setAttribute('style', 'display: none;');
        document.getElementById('note').value = "";
        document.getElementById('done').checked = false;
        saveToLS(obj);
        loadFromLS();
    });
}

//async
function deleteChecked() {
    let ul = document.getElementById('todo');
    for (let i = 0; i < ul.childElementCount; i++) {
        if (ul.childNodes[i].lastChild.checked) {
            promiseForLS(i).then(function() {
                localStorage.removeItem(i);
            }).catch(function(key) {
                console.log('There is no ' + key);
            });
        }
    }
    refreshPromise().then(refreshStorage());
}

//async methods
let promiseForLS = (key) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem(key)) {
                resolve(key);
            } else {
                reject(key);
            }
        }, 0);
    });
};

let refreshPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 0);
    });
};

//async
function saveChangesInLS() {
    let ul = document.getElementById('todo');
    let toChange;
    for (let i = 0; i < ul.childElementCount; i++) {
        if (ul.childNodes[i].lastChild.checked) {
            promiseForLS(i)
                .then(function() {
                    toChange = localStorage.getItem(i);
                    toChange = JSON.parse(toChange);
                    if (!toChange.done) {
                        toChange.done = true;
                        toChange.date = new Date();
                        toChange.date.setHours(toChange.date.getHours() + 3);
                    }
                    localStorage.setItem(i, JSON.stringify(toChange));
                }).catch(function() {
                    console.log("there is no " + i);
                });
        } else if (!ul.childNodes[i].lastChild.checked) {
            promiseForLS(i)
                .then(function() {
                    toChange = localStorage.getItem(i);
                    toChange = JSON.parse(toChange);
                    if (toChange.done) {
                        toChange.done = false;
                        toChange.date = new Date();
                        toChange.date.setHours(toChange.date.getHours() + 3);
                    }
                    localStorage.setItem(i, JSON.stringify(toChange));
                }).catch(function() {
                    console.log("there is no " + i);
                });
        }
    }
    refreshPromise().then(refreshStorage());
}

function refreshStorage() {
    let arr = new Array();
    for (let i = 0; i < localStorage.length; i++) {
        arr.push(localStorage.getItem(localStorage.key(i)));
    }
    arr.parseAll();
    localStorage.clear();
    for (let i = 0; i < arr.length; i++) {
        saveToLS(arr[i]);
    }
    loadFromLS();
}

window.onload = function() {
    loadFromLS();
}