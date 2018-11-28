'use strict'

for (let key in console) {
    let con = console[key];
    console[key] = function() {
        con.apply(this, Array.prototype.slice.call(arguments));
        localStorage.setItem(key, Array.prototype.slice.call(arguments));
    }
}

window.onload = function() {
    console.log("hello", { name: "Ivan" }, 1);
    console.error("New error", { error: "No information given!" });
    console.warn("beware the js", { joke: true });
}