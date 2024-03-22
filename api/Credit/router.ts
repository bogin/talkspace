import express from 'express';
import { CreditController } from './controller';

const router = express.Router();
const controller = new CreditController();
// Define your booking routes here
router.get('/credits/:patientId', controller.getCreditsForPatient);

export default router;
