import express from 'express';
import { BookingController } from './controller';

const router = express.Router();
const controller = new BookingController();

router.get('/', controller.getBookingsStatsForUserId);

router.post('/', controller.createBooking);
export default router;
