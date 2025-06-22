import express from 'express';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import medicineRouter from './medicine.route.js';
import doctorRouter from './doctor.route.js';
import paymentRoute from './payment.route.js';

const rootRouter = express.Router();
rootRouter.use('/auth',authRouter);
rootRouter.use('/admin',userRouter)
rootRouter.use('/medicine',medicineRouter);
rootRouter.use('/doctor',doctorRouter);
rootRouter.use('/medicines', medicineRouter)
rootRouter.use('/payment', paymentRoute)


export default rootRouter; 