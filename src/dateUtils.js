import moment from "moment";

const DateUtils = {
    VALID_FORMAT: ["yyyy-MM-DD", "yyyy-MM-DD HH:mm:ss", "yyyy-MM-DD LT", "yyyy-MM-DD h:mm:ss A", "yyyy-MM-DD HH:mm:ss", "yyyy-MM-DD HH:mm"],
    DATE_FORMAT: "yyyy{DSLT}MM{DSLT}DD",
    DATETIME_FORMAT: "yyyy{DSLT}MM{DSLT}DD HH{TSLT}mm{TSLT}ss",
    TIME_FORMAT: "HH{TSLT}mm{TSLT}ss",
    YEAR_FORMAT: "yyyy",
    MONTHDAY_FORMAT: "MM{DSLT}DD",
    dateFormat(param, DATE_SPELIT = "-") {
        let patten = this.DATE_FORMAT.replaceAll("{DSLT}", DATE_SPELIT);
        return this.format(param, patten);
    },
    datetimeFormat(param, DATE_SPELIT = "-", TIME_SPELIT = ":") {
        let patten = this.DATETIME_FORMAT.replaceAll("{DSLT}", DATE_SPELIT).replaceAll("{TSLT}", TIME_SPELIT);
        return this.format(param, patten);
    },
    timeFormat(param, TIME_SPELIT = ":") {
        let patten = this.TIME_FORMAT.replaceAll("{TSLT}", TIME_SPELIT);
        return this.format(param, patten);
    },
    yearFormat(param) {
        let patten = this.YEAR_FORMAT;
        return this.format(param, patten);
    },
    monthDayFormat(param, DATE_SPELIT = "-") {
        let patten = this.MONTHDAY_FORMAT.replaceAll("{DSLT}", DATE_SPELIT);
        return this.format(param, patten);
    },
    getValidMomentDate(param) {
        let result;
        if (moment.isMoment(param)) {
            result = moment(param.format("yyyy-MM-DD"), this.VALID_FORMAT, true).isValid() ? moment(param) : "";
        } else if (typeof param === "string") {
            result = moment(param, this.VALID_FORMAT, true).isValid() ? moment(param) : "";
        }
        return result;
    },
    getNow() {
        return moment();
    },
    format(param, patten) {
        let temp = this.getValidMomentDate(param);
        if (moment.isMoment(temp)) {
            return temp.format(patten);
        }
        return "";
    },
    /**
     * 寻找日期范围内有效且最早的日期
     * @param {*} dateArray [string,string,string...]
     * @param {*} range [string,string]
     */
    findTheEffectiveAndEarliiestBetweenRangeDates(stringDateArray, range) {
        let momentDateArray = [];
        //将string日期组转换为moment日期组
        stringDateArray && stringDateArray.forEach(stringDate => {
            momentDateArray.push(moment(stringDate));
        })
        //按从小到大排序
        momentDateArray.sort((a, b) => a - b);
        const [start, end] = range;
        function compare(start, end, date) {
            if (isEmpty(start) && isEmpty(end)) {
                return true;
            } else if (isEmpty(start)) {
                return date.isSameOrBefore(end);
            } else if (isEmpty(end)) {
                return date.isSameOrAfter(start);
            } else {
                return date.isBetween(start, end, null, "[]");
            }
        }
        let result;
        //比较
        for (let i = 0; i < momentDateArray.length; i++) {
            let momentDate = momentDateArray[i];
            if (compare(start, end, momentDate)) {
                result = momentDate;
                break;
            }
        }
        return this.dateFormat(result);
    },
    /**
     *获取两个日期相差的周数
     */
    getDifferWeeksBetweenTwoDates(date1, date2) {
        //1.转换为moment对象
        let moment1 = this.getValidMomentDate(date1);
        let moment2 = this.getValidMomentDate(date2);

        //2.由星期推算出该日所在周的星期一与该日相差天数
        let diffDays1 = moment1.format("E") - 1;
        let diffDays2 = moment2.format("E") - 1;

        //3.获取参考计算日
        let referMoment1 = moment1.subtract(diffDays1, "days");
        let referMoment2 = moment2.subtract(diffDays2, "days");

        //4.计算相差周数
        let diffWeeks = Math.floor(referMoment1.diff(referMoment2, "days", true) / 7);

        return diffWeeks;
    }
}

export default DateUtils;