import { cards, expFormat } from './def/cards.js';

// Utilities

export let checkLength = (strLen, tests) => {
	for(let len of tests) if(strLen === len) return true;
	return false;
}

export let luhn = (num) => {
	var digits = String(num).split('').reverse();

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
	return ['visa', cards.visa];
};

export let getCard = (num) => findFullCardConfig(num).pop();
export let getType = (num) => findFullCardConfig(num).splice(0,1).pop();


// Formatters

export let formatCCNum = (num) => {
	if(!num) return '';
	const cleanNum = num.replace(/\D/g,'');
	const cfg = getCard(cleanNum);
	if(cfg === void 0) return cleanNum;
	let parts = String(cleanNum).match(cfg.format);
	return parts.join(' ').trim() || cleanNum;
};
export let formatCCExp = (exp) => {
	if(!exp) return '';
	const cleanExp = String(exp.replace(/\D/g,''));
	if(cleanExp.length === 1) {
		if(parseInt(cleanExp[0], 10) > 1) return `0${cleanExp}`;
		else return cleanExp;
	}
	if(cleanExp.length === 2) return `${cleanExp} / `;
	if(cleanExp.length > 2) return cleanExp.match(expFormat).splice(1).join(' / ') || cleanExp;
	return cleanExp;
};
export let formatCCCVV = (cvv, type = 'visa') => {
	if(!cvv) return '';
	var typeCfg;
	const cleanCvv = cvv.replace(/\D/g,'');
	if(typeof type === 'string') typeCfg = cards[type];
	else typeCfg = getCard(type);
	if(typeCfg === void 0) return cleanCvv;
	if(String(cvv).length > typeCfg.cvvLength) return cleanCvv.substr(0,typeCfg.cvvLength);
	return cleanCvv;
};


// Validators

export let validateCCNum = (num) => {
	const strNum = String(num).replace(/\D/g,'');
	const cfg = getCard(strNum);
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
	var typeCfg;
	if(typeof type === 'string') typeCfg = cards[type];
	else typeCfg = getCard(type);
	return (String(cvv).length === typeCfg.cvvLength)
};
