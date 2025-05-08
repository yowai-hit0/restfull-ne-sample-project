import { Router } from "express";
import {
  createBooking,
  fetchBookings,
  findBookingById,
  deleteBooking,
} from "../controllers/booking.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import {
  CreateBookingDto,
} from "../dtos/booking.dto";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyAuth, validateRequest(CreateBookingDto), createBooking);

router.get("/", verifyAuth, fetchBookings);
router.get("/:id", verifyAuth, findBookingById);
router.delete("/:id", verifyAuth, deleteBooking);

export default router;

