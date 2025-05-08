// src/routes/index.routes.ts
import { Router } from "express";
import authRouter from "./auth.routes";
// import userRouter from "./user.routes";
import bookRouter from "./book.routes";
import bookingRouter from "./booking.routes";

const router = Router();

// ─── Auth ──────────────────────────────────────────────────────────────────────
router.use(
  "/auth",
  authRouter
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Authentication endpoints (register, login, OTP, etc.)'
  */
);


// ─── Books ─────────────────────────────────────────────────────────────────────
router.use(
  "/books",
  bookRouter
  /*
    #swagger.tags = ['Books']
    #swagger.description = 'Book catalog (CRUD, pagination, search)'
    #swagger.security = [{ "bearerAuth": [] }]
  */
);

// ─── Bookings ──────────────────────────────────────────────────────────────────
router.use(
  "/bookings",
  bookingRouter
  /*
    #swagger.tags = ['Bookings']
    #swagger.description = 'Create, list, fetch and cancel bookings'
    #swagger.security = [{ "bearerAuth": [] }]
  */
);

export default router;




// ─── Users ─────────────────────────────────────────────────────────────────────
// router.use(
//   "/user",
//   userRouter
//   /*
//     #swagger.tags = ['Users']
//     #swagger.description = 'User management (view profile, update, etc.)'
//     #swagger.security = [{ "bearerAuth": [] }]
//   */
// );