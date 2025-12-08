import express from "express"
import { PaymentController } from "../../Controller/paymentController/Implimentation/paymentController"
import { PaymentService } from "../../services/paymentService/Implimentation/paymentService"
import { asyncHandler } from "../../middleware/asyncHandler"
import { verifyAccessToken } from "../../middleware/jwt"
import { PaymentRepository } from "../../Repositories/payment/implimentation/implimentation"



const paymentRepository = new PaymentRepository()
const paymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService)




const Router = express.Router()

Router.route('/create-payment').post(verifyAccessToken,asyncHandler(paymentController.createPayment))

export default Router