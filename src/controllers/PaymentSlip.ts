import { Request, Response } from 'express';
import bankTitle from '../services/BankTitles'
import dealership from '../services/Dealership'

export default class PaymentSlipController {
  async create(request: Request, response: Response) {
    var { codeBar } = request.body
  
  if (!codeBar) {
    return response
      .status(400)
      .send({ error: { message: 'You must provide a code bar number' } })
  }

  codeBar = codeBar.replace(/( |-|\.)/g, '');

  if (!isNaN(codeBar)) {
    if (codeBar.length === 48) { 
      const res = dealership(codeBar)
      return res ? 
        response.json(res)
        : 
        response
          .send({ message: 'Invalid code bar' })
    }
    else if (codeBar.length === 47) {
      const res = bankTitle(codeBar)
      return res ? 
        response.json(res)
        : 
        response
          .send({ message: 'Invalid code bar' })
    }
      
    return response
        .status(400)
        .send({ error: { message: 'Wrong code bar size' } })
  }
  
  return response
      .status(400)
      .send({ error: { message: 'Code bars are formed only by numbers' } })
  }
}