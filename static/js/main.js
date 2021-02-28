var player = deepObjCopy(startPlayer);

var startPlayer = {
	money: 0.1,
	moneyPerSecond: 0,
	netMoneyPerSecond: 0,
	moneyPerClick: 0.1,
	clickPower: 1,
	clickTracker : 0
}

function addMoney(money) {
	player.money = Math.round((player.money + money) * 100) / 100;
	$("#money").html(player.money)
	if(money > 0){
		player.totalMoneyEarned = Math.round((player.totalMoneyEarned + money)*100)/100;
	}
	if(player.money < 0) player.money = 0;
}

function moneyButtonClick(amount) {
	var ifUpdate = false;
	addMoney(player.moneyPerClick * amount);
	player.clickTracker += amount;
	player.totalClicks += amount;
}

function deepObjCopy (dupeObj) {
    var retObj = new Object();
    if (typeof(dupeObj) == 'object') {
        if (typeof(dupeObj.length) != 'undefined')
            var retObj = new Array();
        for (var objInd in dupeObj) {   
            if (typeof(dupeObj[objInd]) == 'object') {
                retObj[objInd] = deepObjCopy(dupeObj[objInd]);
            } else if(typeof(dupeObj[objInd]) == 'function') {
            	retObj[objInd] = cloneFunc(dupeObj[objInd]);
            } else if (typeof(dupeObj[objInd]) == 'string') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'number') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'boolean') {
                ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
            }
        }
    }
    return retObj;
}

function init(){
	player = deepObjCopy(startPlayer);
	$("#money").html(player.money)
};

$(document).ready(function(){
	init();
	$("#moneyButton").click(function(){
		moneyButtonClick(player.clickPower);
		player.totalManualClicks += player.clickPower;
	});
});

// document.getElementById("money").innerHTML = player.money;
$("#money").val(player.money);

console.log(player.money);