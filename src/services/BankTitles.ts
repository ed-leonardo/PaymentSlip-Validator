import verifyModule10 from '../utils/VerifyModule10'
import verifyModule11 from '../utils/VerifyModule11'

export default function bankTitle(line: string) {
  let isValid;
    
  const firstField = line.substr(0, 9)
  let digit = parseInt(line[9])
  let prefix = firstField.slice(0, 4)
  let suffix = firstField.slice(4)
  isValid = verifyModule10(firstField, digit)

  if (isValid) {
      const secondField = line.substr(10, 10);
      digit = parseInt(line[20])
      suffix += secondField;
      isValid = verifyModule10(secondField, digit);
	}
	
  if (isValid) {
      const thirdField = line.substr(21, 10);
      digit = parseInt(line[31])
      suffix += thirdField;
      isValid = verifyModule10(thirdField, digit);
	}
	
  let dueDateCoefficient=0
  let fifthField, value
	let dueDate = new Date(2030, 1, 22)
	
  if (isValid) {
    fifthField = line.substr(33);
    const today = new Date();
    
    if (today >= dueDate)
        dueDate.setDate(dueDate.getDate()-1000);
    else
        dueDate.setDate(dueDate.getDate()-10000);
    dueDateCoefficient = parseInt(fifthField.slice(0, 4));
    if (dueDateCoefficient < 1000)
        value = parseFloat(fifthField.slice(0, -2) + '.' + fifthField.slice(-2));
    else {
        dueDate.setDate(dueDate.getDate() + dueDateCoefficient);
        value = parseFloat(fifthField.slice(4, -2) + '.' + fifthField.slice(-2));
    }

    const block = prefix + fifthField + suffix;
    digit = parseInt(line[32])
    isValid = verifyModule11(block, digit, false);
  }

  if (isValid) {
    const codeBar = prefix + digit + fifthField + suffix;
    if (dueDateCoefficient < 1000) {
			return { Value: value, codeBar: codeBar };
		}
    else {
			return {
        Value: value,
        'Due Date': dueDate.toLocaleString('pt-br',
        	{
          	year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }),
				'Code Bar': codeBar
			}
		}
  }

  return false
}