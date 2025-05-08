import { Router } from "express";
import {
  createBook,
  fetchBooks,
  findById,
  updateBook,
  deleteBook,
}  from "../controllers/book.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { CreateBookDto, UpdateBookDto} from "../dtos/book.dto";
import { verifyAuth } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Public
router.get("/", fetchBooks);
router.get("/:id", findById);

// Admin-only
router.post("/", verifyAuth, roleMiddleware(Role.ADMIN), validateRequest(CreateBookDto), createBook);
router.put("/:id", verifyAuth, roleMiddleware(Role.ADMIN), validateRequest(UpdateBookDto), updateBook);
router.delete("/:id", verifyAuth, roleMiddleware(Role.ADMIN), deleteBook);

export default router;
