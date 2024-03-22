import express from 'express';
import { BookingStatusHistoryController } from './controller';
const router = express.Router();
const controller = new BookingStatusHistoryController();

router.get('/:bookingId/history', controller.getBookingStatusHistory);
   
export default router;
