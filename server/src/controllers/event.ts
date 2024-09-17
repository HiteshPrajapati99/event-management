import { Request, Response } from "express";
import { db } from "../services/prisma";
import { eventSchema } from "../validations/event";
import { TryCatch } from "../utils/TryCatch";

export const createEvent = TryCatch(async (req, res) => {
  try {
    const { name, description, startDate, endDate, totalGuests } = req.body;

    const validate = eventSchema.safeParse(req.body);

    if (validate.error) {
      const errors = validate.error.flatten().fieldErrors;
      const errorMessages = Object.values(errors).flat().join(" AND ");

      return res.json({ s: 0, m: errorMessages });
    }

    const images = req.files as Express.Multer.File[]; // Handle image upload

    if (images.length === 0)
      return res.json({ s: 0, m: "Min 1 image required for create event." });

    const newEvent = await db.event.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalGuests: totalGuests ? parseInt(totalGuests) : null,
        userId: req.user,
      },
    });

    const imageData = images.map((file) => ({
      image: file.path,
      eventId: newEvent.id,
    }));

    await db.image.createMany({
      data: imageData,
    });

    res.status(201).json({ s: true, m: "Event created" });
  } catch (error) {
    res.status(500).json({ s: false, m: error.message, r: null });
  }
});

type ReqQuery = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  order?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export const getEvents = TryCatch(async (req, res) => {
  const userId = req.user;

  const query: ReqQuery = req.query;

  //  Pagination
  const page = parseInt(query.page || "1", 10);
  const pageSize = parseInt(query.pageSize || "10", 10);
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // Sort
  const sortBy = query.sortBy || "startDate";

  const allowedSortByFields = ["name", "startDate", "endDate"];
  if (!allowedSortByFields.includes(sortBy as string)) {
    return res.status(400).json({ s: 0, m: "Invalid sortBy field.", r: [] });
  }

  const order = query.order || "asc";

  const allowedOrderValues = ["asc", "desc"];
  if (!allowedOrderValues.includes(order as string)) {
    return res.status(400).json({ s: 0, m: "Invalid order value.", r: [] });
  }

  // Filters
  const search = query.search || "";

  const filters = {
    userId,
    status: 1,
    name: {
      contains: search,
    },
  };

  const events = await db.event.findMany({
    where: filters,
    include: { images: true },
    skip,
    take,
    orderBy: {
      [sortBy]: order,
    },
  });

  if (events.length === 0)
    return res.json({ s: 0, m: "No Data Found.", r: [] });

  const totalEvents = await db.event.count({
    where: filters,
  });

  return res.json({
    s: 1,
    m: "Data Found.",
    r: {
      events,
      pagination: {
        page,
        pageSize,
        totalEvents,
        totalPages: Math.ceil(totalEvents / pageSize),
      },
    },
  });
});

export const updateEvent = TryCatch(async (req, res) => {
  const { name, description, totalGuests, id, status } = req.body;
  if (!id) return res.json({ s: 0, m: "Event id is required." });

  await db.event.update({
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(totalGuests && { totalGuests: parseInt(totalGuests) }),
      ...(status && { status: parseInt(status) }),
    },
    where: { id: parseInt(id) },
  });

  return res.json({ s: 1, m: "Event Updated." });
});
