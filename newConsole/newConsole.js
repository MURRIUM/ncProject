'use strict'

class SecondConsole {

    log(item, ...optionalItems) {
        if (typeof console != "undefined" && console.log) {
            if (optionalItems.length != 0) {
                console.log(item, optionalItems);
            } else {
                console.log(item);
            }

        }
        localStorage.setItem('last log', item);

        if (optionalItems.length != 0) {
            let arr = optionalItems;
            for (let i = 0; i < arr.length; i++) {
                localStorage.setItem('last warn #' + (i + 2), arr[i]);
            }
        }
    }

    error(item, ...optionalItems) {
        if (typeof console != "undefined" && console.error) {
            if (optionalItems.length != 0) {
                console.error(item, optionalItems);
            } else {
                console.error(item);
            }
        }
        localStorage.setItem('last error', item);

        if (optionalItems.length != 0) {
            let arr = optionalItems;
            for (let i = 0; i < arr.length; i++) {
                localStorage.setItem('last warn #' + (i + 2), arr[i]);
            }
        }
    }

    warn(item, ...optionalItems) {
        if (typeof console != "undefined" && console.warn) {
            if (optionalItems.length != 0) {
                console.warn(item, optionalItems);
            } else {
                console.warn(item);
            }
        }
        localStorage.setItem('last warn', item);

        if (optionalItems.length != 0) {
            let arr = optionalItems;
            for (let i = 0; i < arr.length; i++) {
                localStorage.setItem('last warn #' + (i + 2), arr[i]);
            }
        }
    }
}

let sndConsole = new SecondConsole();

window.onload = function() {
    sndConsole.log("hello log");
    sndConsole.warn("1st warn", "2nd warn", "3rd warn");
    sndConsole.error("test error");
}