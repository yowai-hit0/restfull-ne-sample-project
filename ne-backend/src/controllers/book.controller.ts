import { Prisma } from "@prisma/client";
import { config } from "dotenv";
import { Request, Response } from "express";
import prisma from "../prisma/prisma-client";
import { AuthRequest } from "../types";
import ServerResponse from "../utils/ServerResponse";
import { paginator } from "../utils/paginator";

config();

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user.id;
    const { name, author, publisher, publicationYear, subject } = req.body;

    const book = await prisma.book.create({
      data: {
        name,
        author,
        publisher,
        publicationYear,
        subject,
        createdBy: { connect: { id: userId } },
      },
    });

    return ServerResponse.created(res, "Book created successfully", { book });
  } catch (error: any) {
    if (error.code === "P2002") {
      const key = (error.meta.target as string[])[0];
      return ServerResponse.error(
        res,
        `${key.charAt(0).toUpperCase() + key.slice(1)} (${(req.body as any)[key]}) already exists`,
        null,
        400
      );
    } else {
      return ServerResponse.error(res, "Error occurred", { error });
    }
  }
};

export const fetchBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchKey, page, limit } = req.query;
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 10;

    if (pageNum <= 0) {
      return ServerResponse.error(res, "Page number must be > 0", null, 400);
    }
    if (limitNum <= 0) {
      return ServerResponse.error(res, "Limit must be > 0", null, 400);
    }

    const where: Prisma.BookWhereInput = {};
    if (searchKey) {
      where.name = {
        contains: String(searchKey),
        mode: "insensitive",
      };
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.book.count({ where }),
    ]);

    return ServerResponse.success(res, "Books fetched successfully", {
      books,
      meta: paginator({ page: pageNum, limit: limitNum, total }),
    });
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};

export const findById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return ServerResponse.notFound(res, `Book with id ${id} not found`);
    }
    return ServerResponse.success(res, "Book fetched successfully", { book });
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const book = await prisma.book.update({
      where: { id },
      data,
    });
    return ServerResponse.success(res, "Book updated successfully", { book });
  } catch (error: any) {
    if (error.code === "P2002") {
      const key = (error.meta.target as string[])[0];
      return ServerResponse.error(
        res,
        `${key.charAt(0).toUpperCase() + key.slice(1)} (${(req.body as any)[key]}) already exists`,
        null,
        400
      );
    } else {
      return ServerResponse.error(res, "Error occurred", { error });
    }
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await prisma.book.delete({ where: { id } });
    return ServerResponse.success(res, "Book deleted successfully");
  } catch (error: any) {
    return ServerResponse.error(res, "Error occurred", { error });
  }
};
