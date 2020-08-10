export default function verifyModule11(field:string, digit:number, validZero:boolean) {
  if (digit > 9 || digit < 0) {
    throw new RangeError('Digit must be just one number');
  }

  let summation = 0, multiplier = 2;
      
      for (let i = field.length-1; i >= 0; --i) {
          summation += (parseInt(field[i]) % 10) * multiplier;
  
          multiplier++;
          if (multiplier > 9)
              multiplier = 2;
      }
      const rest = summation % 11;
      let validatedDigit = rest <= 1 ? 0 : 11-rest;

      if (!validZero && validatedDigit == 0) {
        validatedDigit = 1;
      }
  
      return digit == validatedDigit;
  }