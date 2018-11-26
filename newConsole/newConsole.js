'use strict'

let log = console.log;

console.log = function() {
    log.apply(this, Array.prototype.slice.call(arguments));
    localStorage.setItem("Last log", Array.prototype.slice.call(arguments));
}

let error = console.error;

console.error = function() {
    error.apply(this, Array.prototype.slice.call(arguments));
    localStorage.setItem("Last error", Array.prototype.slice.call(arguments));
}

let warn = console.warn;

console.warn = function() {
    warn.apply(this, Array.prototype.slice.call(arguments));
    localStorage.setItem("Last warn", Array.prototype.slice.call(arguments));
}

window.onload = function() {
    console.log("hello", { name: "Ivan" }, 1);
    console.error("New error", { error: "No information given!" });
    console.warn("beware the js", { joke: true });
}