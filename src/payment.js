import { cards, expFormat } from './def/cards.js';

// Utilities

export let checkLength = (strLen, tests) => {
	for(let len of tests) if(strLen === len) return true;
	return false;
}

export let luhn = (num) => {
	var digits = new String(num);

	let sum = 0;
	var odd = true
	for(let d of digits) {
		d = parseInt(d, 10);
		if(odd = !odd) d *= 2;
		if(d > 9) d -= 9;
		sum += d;
	}

	return (sum % 10 == 0);
};

export let findFullCardConfig = (num) => {
	for(var type in cards) if(cards[type].pattern.test(num)) return [type, cards[type]]
	return void 0;
};

export let getCard = (num) => findFullCardConfig(num).pop();
export let getType = (num) => findFullCardConfig(num).splice(0,1);


// Formatters

export let formatCCNum = (num) => {
	const cleanNum = num.replace(/\D/g,'');
	const cfg = findFullCardConfig(cleanNum);
	if(cfg === void 0) return cleanNum;
	let parts = String(cleanNum).match(cfg.format);
	return parts.splice(1).join(' ').trim() || cleanNum;
};
export let formatCCExp = (exp) => {
	var ret = '';
	const cleanExp = String(exp.replace(/\D/g,''));
	if(cleanExp.length === 1 && parseInt(cleanExp[0], 10) > 1) {
		ret = `0${cleanExp}`;
	}
	if(cleanExp.length === 2) return `${ret} / `;
	if(cleanExp.length > 2) return cleanExp.match(expFormat).splice(1).join(' / ') || cleanExp;
};
export let formatCCCVV = (cvv, type = false) => {
	const cleanCvv = /^\d+$/.test(cvv);
	if(type === false) return cleanCvv;
	else if(typeof type === 'string') {
		const typeCfg = cards[type];
	} else {
		const typeCfg = findFullCardConfig(type);
	}
	if(typeCfg === void 0) return cleanCvv;
	if(String(cvv).length > typeCfg.cvvLength) return cleanCvv.substr(0,typeCfg.cvvLength);
	return cleanCvv;
};


// Validators

export let validateCCNum = (num) => {
	const strNum = String(num);
	const cfg = findFullCardConfig(strNum);
	if(cfg === void 0) return false;
	if(!checkLength(strNum.length,cfg.length)) return false;
	if(cfg.luhn === true) return luhn(strNum);
	return true;
};

export let validateCCExp = (exp) => {
	if(String(exp).replace(/\D/g,'').length !== 6) return false;
	var expDate;
	try {
		expDate = new Date(
			formatCCExp(exp).split('/').join('/01/')
		);
	} catch(e) { return false }

	const now = new Date();
	now.setHours(0,0,0,0);
	now.setDate(1);

	return expDate > now;
};

export let validateCCCVV = (cvv, type) => {
	if(typeof type === 'string') {
		const typeCfg = cards[type];
	} else {
		const typeCfg = findFullCardConfig(type);
	}
	return (String(cvv).length === typeCfg.cvvLength)
};
