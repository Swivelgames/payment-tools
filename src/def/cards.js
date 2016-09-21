export const defaultFormat = /^(\d{4}|\d{1,3})(\d{4}|\d{1,3})?(\d{4}|\d{1,3})?(\d{4}|\d{1,3})?/;
export const expFormat = /(\d{2})(\d{1,4})/;

export const cards = {
	'unidentified': {
		fail: true,
		pattern: /^$/,
		format: defaultFormat,
		length: [16],
		cvvLength: 4,
		luhn: true
	},
	'amex': {
		pattern: /^3[47]/,
		format: /^(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		length: [15],
		cvvLength: 4,
		luhn: true
	},
	'dankort': {
		pattern: /^5019/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'dinersclub': {
		pattern: /^(36|38|30[0-5])/,
		format: /^(\d{1,4})(\d{1,6})?(\d{1,4})?/,
		length: [14],
		cvvLength: 3,
		luhn: true
	},
	'discover': {
		pattern: /^(6011|65|64[4-9]|622)/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'jcb': {
		pattern: /^35/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'laser': {
		pattern: /^(6706|6771|6709)/,
		format: defaultFormat,
		length: [16,19],
		cvvLength: 3,
		luhn: true
	},
	'maestro': {
		pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
		format: defaultFormat,
		length: [12,19],
		cvvLength: 3,
		luhn: true
	},
	'mastercard': {
		pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'unionpay': {
		pattern: /^62/,
		format: defaultFormat,
		length: [16,19],
		cvvLength: 3,
		luhn: false
	},
	'visaelectron': {
		pattern: /^4(026|17500|405|508|844|91[37])/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'elo': {
		pattern: /^(4011|438935|45(1416|76|7393)|50(4175|6699|67|90[4-7])|63(6297|6368))/,
		format: defaultFormat,
		length: [16],
		cvvLength: 3,
		luhn: true
	},
	'visa': {
		pattern: /^4/,
		format: defaultFormat,
		length: [13, 16, 19],
		cvvLength: 3,
		luhn: true
	}
};
