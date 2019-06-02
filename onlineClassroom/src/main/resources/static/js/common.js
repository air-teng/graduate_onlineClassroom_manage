function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
function getAge(birthday,nowDate){
	var bthd = birthday.split("-");
	var nd = nowDate.split("-");
	var age = nd[0] - bthd[0];
	if(bthd[1] > nd[1]){
		if(age>0)age--;
	}else if(bthd[1] == nd[1] && nd[2] < bthd[2]){
		if(age>0)age--;
	}
	return age;
}
//将日期格式化为两位，不足补零
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
//通过输入的时间获取包含datetime的时间
//Date转为datetimeLocal
function dateToDatetimeLocal(date){
	var now = new Date();
	now.setTime(date);
    var datetime = now.getFullYear() + "-" + fix((now.getMonth() + 1), 2) + "-" + fix(now.getDate(), 2) + "T" + fix(now.getHours(), 2) + ":" + fix(now.getMinutes(), 2);
    return datetime;
}
function dateToDetaiTime(date){
	var now = new Date();
	now.setTime(date);
	var datetime = now.getFullYear() + "-" + fix((now.getMonth() + 1), 2) + "-" + fix(now.getDate(), 2) + " " + fix(now.getHours(), 2) + ":" + fix(now.getMinutes(), 2)+ ":" + fix(now.getSeconds(), 2);
	return datetime;
}
//datetimeLocal转为Date
function datetimeLocalToDate(datetime){
	//将datetime-local转换为Date
	var date = new Date();
    date.setFullYear(parseInt(datetime.substring(0, 4)));
    date.setMonth(parseInt(datetime.substring(5, 7)) - 1);
    date.setDate(parseInt(datetime.substring(8, 10)));
    date.setHours(parseInt(datetime.substring(11, 13)));
    date.setMinutes(parseInt(datetime.substring(14, 16)));
    return date;
}