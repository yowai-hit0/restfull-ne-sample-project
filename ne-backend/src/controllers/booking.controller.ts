import { Prisma } from "@prisma/client";
import { config } from "dotenv";
import { Request, Response } from "express";
import prisma from "../prisma/prisma-client";
import { AuthRequest } from "../types";
import ServerResponse from "../utils/ServerResponse";
import { paginator } from "../utils/paginator";
import { Role } from "@prisma/client";

config();

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user.id;
    const { bookId, endDate, price } = req.body;

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return ServerResponse.notFound(res, `Book with id ${bookId} not found`);
      
    }

    const booking = await prisma.booking.create({
      data: {
        bookId,
        userId,
        endDate: new Date(endDate),
        price,
      },
    });

    return ServerResponse.created(res, "Booking created successfully", { booking });
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};

export const fetchBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const { searchKey, page, limit } = req.query as any;
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 10;

    if (pageNum <= 0) {
      return ServerResponse.error(res, "Page number must be > 0", null, 400);
      
    }
    if (limitNum <= 0) {
      return ServerResponse.error(res, "Limit must be > 0", null, 400);
      
    }

    const where: Prisma.BookingWhereInput = {};
    if (authReq.user.role === Role.STUDENT) {
      where.userId = authReq.user.id;
    }
    if (searchKey) {
      where.OR = [
        { orderId: { contains: String(searchKey), mode: "insensitive" } },
        { book: { name: { contains: String(searchKey), mode: "insensitive" } } },
      ];
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        include: { book: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({ where }),
    ]);

    return ServerResponse.success(res, "Bookings fetched successfully", {
      bookings,
      meta: paginator({ page: pageNum, limit: limitNum, total }),
    });
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};

export const findBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { book: true, user: true },
    });
    if (!booking) {
      return ServerResponse.notFound(res, `Booking with id ${id} not found`);

    }
    if (authReq.user.role === Role.STUDENT && booking.userId !== authReq.user.id) {
      return ServerResponse.error(res, "Forbidden", null, 403);
    }

    return ServerResponse.success(res, "Booking fetched successfully", { booking });
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return ServerResponse.notFound(res, `Booking with id ${id} not found`);

    }
    if (authReq.user.role === Role.STUDENT && booking.userId !== authReq.user.id) {
      return ServerResponse.error(res, "Forbidden", null, 403);

    }

    await prisma.booking.delete({ where: { id } });
    return ServerResponse.success(res, "Booking deleted successfully");
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};
