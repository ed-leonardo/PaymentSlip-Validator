import express from 'express';
import PaymentSlipController from './controllers/PaymentSlip'

const routes = express.Router()

const paymentSlipController = new PaymentSlipController()

routes.post('/code-bars', paymentSlipController.create)
export default routes;