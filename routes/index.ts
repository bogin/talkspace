import express from 'express';
import { Router } from 'express';

import BookingRouter from '../api/Booking/router';
import CreditRouter from '../api/Credit/router';
import BookingStatusHistoryRouter from '../api/BookingStatusHistory/router';

const AppRouter: Router = express.Router();

AppRouter.use('/credit', CreditRouter);
AppRouter.use('/booking', BookingRouter);
AppRouter.use('/booking-status-history', BookingStatusHistoryRouter);

export default AppRouter;
