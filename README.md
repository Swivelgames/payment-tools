### Usage

In your project folder
```bash
npm install --save payment-tools
```

### Format Credit Card Field Example

```javascript
el.addEventListener('keyup', (e) => {
	var key = event.keyCode || event.charCode;
	if (key === 8 || key === 46) return;
	el.value = PaymentTools.formatCCNum(el.value);
});

el.addEventListener('keyup', (e) => {
	var key = event.keyCode || event.charCode;
	if (key === 8 || key === 46) return;
	el.value = PaymentTools.formatCCExp(el.value);
});

el.addEventListener('keyup', (e) => {
	var key = event.keyCode || event.charCode;
	if (key === 8 || key === 46) return;
	el.value = PaymentTools.formatCCCVV(el.value);
});
```

### Available Functions

```javascript
import * as PaymentTools from 'payment-tools';

PaymentTools.formatCCNum(num);
PaymentTools.formatCCExp(exp);
PaymentTools.formatCCCVV(cvv, type);

PaymentTools.validateCCNum(num);
PaymentTools.validateCCExp(exp);
PaymentTools.validateCCCVV(cvv, type);

PaymentTools.getCard(num);
PaymentTools.getType(num);
```
