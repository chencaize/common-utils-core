import DateUtils from "./dateUtils";

let showLog = true;
let logLevel = "debug";
let levelMap = {
    "debug": 4,
    "info": 3,
    "warn": 2,
    "error": 1
};
let template = "%c%s %c%s %c[%s] %c%s";

const LogUtils = {
    setShowLog(val) {
        showLog = val;
    },
    setLogLevel(val) {
        let _val = val.toLowerCase();
        if (!levelMap[_val]) {
            this.error(`${val} is not support,try [debug,info,warn,error]`);
            return;
        }
        logLevel = val;
    },
    debug(...rest) {
        if (showLog === true && levelMap[logLevel] >= levelMap["debug"]) {
            let array = ["color:black", DateUtils.datetimeFormat(DateUtils.getNow()), "color:#00BFFF", "DEBUG", "color:black", (new Error()).stack.split("\n")[2].trim().split(" ")[1], "color:black", ":", ...rest];
            console.log(template, ...array);
        }
    },
    info(...rest) {
        if (showLog === true && levelMap[logLevel] >= levelMap["info"]) {
            let array = ["color:black", DateUtils.datetimeFormat(DateUtils.getNow()), "color:#3CB371", "INFO", "color:black", (new Error()).stack.split("\n")[2].trim().split(" ")[1], "color:black", ":", ...rest];
            console.log(template, ...array);
        }
    },
    warn(...rest) {
        if (showLog === true && levelMap[logLevel] >= levelMap["warn"]) {
            let array = ["color:black", DateUtils.datetimeFormat(DateUtils.getNow()), "color:#FFA500", "WARN", "color:black", (new Error()).stack.split("\n")[2].trim().split(" ")[1], "color:black", ":", ...rest];
            console.log(template, ...array);
        }
    },
    error(...rest) {
        if (showLog === true && levelMap[logLevel] >= levelMap["error"]) {
            let array = ["color:black", DateUtils.datetimeFormat(DateUtils.getNow()), "color:red", "ERROR", "color:black", (new Error()).stack.split("\n")[2].trim().split(" ")[1], "color:black", ":", ...rest];
            console.log(template, ...array);
        }
    },
}

export default LogUtils;