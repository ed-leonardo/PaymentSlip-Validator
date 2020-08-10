import verifyModule10 from '../utils/VerifyModule10'
import verifyModule11 from '../utils/VerifyModule11'

export default function dealership(line: string) {
  let isValid, digit
  
  isValid = ['6', '7', '8', '9'].indexOf(line[2]) != -1;
  const isModule10 = ['6', '7'].indexOf(line[2]) != -1
  const blocks = [];
  blocks.push(line.substr(0, 12))
  blocks.push(line.substr(12, 12))
  blocks.push(line.substr(24, 12))
  blocks.push(line.substr(36, 12))
  
  for (let i = 0; i < blocks.length && isValid; ++i) {
    const block = blocks[i].slice(0, -1);
    digit = parseInt(blocks[i].slice(-1))
    if (isModule10) {
      isValid = verifyModule10(block, digit);
    }
    else {
      isValid = verifyModule11(block, digit, true);
    }
  }

  if (isValid) {
    isValid = line[0] == '8';
  } 
    

  if (isValid) {
    isValid = line[1] != '0';
  }

  let codeBar = '';

  if (isValid) {
    for (let i = 0; i < blocks.length; ++i)
    
    codeBar += blocks[i].substr(0, 11)
    const block = codeBar.slice(0, 3) + codeBar.slice(4);
    digit = parseInt(codeBar[3])
    
    if (isModule10) {
      isValid = verifyModule10(block, digit);
    }
    else {
      isValid = verifyModule11(block, digit, true);
    }
  }

  let value
  if (isValid) {
    value = parseFloat(codeBar.substr(4, 9) + '.' + codeBar.substr(13, 2));
  }
      
  if (isValid) {
    return {
      Valid: true, 
      Value: value, 
      'Code Bar': codeBar
    }
  }
  
  return false
}