export default function verifyModule10 (field:string, digit:number) {
  if (digit > 9 || digit < 0) {
    throw new RangeError('Digit must be just one number');
  }

  let summation = 0, multiplier = 2;
  
  for (let i = field.length-1; i >= 0; --i) {
      let product = (parseInt(field[i]) % 10) * multiplier;
      while (product > 0) {
          summation += product % 10;
          product = Math.floor(product / 10);
      }
      if (multiplier % 2)
          multiplier = 2;
      else
          multiplier = 1;
  }
  const rest = summation % 10;
  const validatedDigit = rest === 0 ? rest : 10-rest;
  
  return validatedDigit === digit;
}