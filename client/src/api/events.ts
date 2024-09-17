import { Event } from "@/types";
import { API_GET, API_POST, API_RES, API_URL } from "./config";
import { format } from "date-fns";

type EventAdd = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  totalGuests: number | null;
  images?: File[];
  status: string;
};

export const getAllEvents = ({
  search = "",
}: {
  search?: string;
  category?: string;
}): API_RES<{
  events: Event[];
  pagination: {
    page: number;
    pageSize: number;
    totalEvents: number;
    totalPages: number;
  } | null;
}> => {
  return API_GET(API_URL.getAllEvent, { search });
};

export const addUpdateEvent = (data: Partial<EventAdd>) => {
  const f = new FormData();

  const { id, images, endDate, startDate, ...rest } = data;

  Object.entries(rest).map(([key, value]) => {
    if (value !== undefined) f.append(key, String(value));
  });

  if (images?.length !== 0) {
    images?.forEach((file) => {
      f.append("images", file);
    });
  }

  if (startDate) f.append("startDate", format(startDate, "yyyy/MM/dd"));
  if (endDate) f.append("endDate", format(endDate, "yyyy/MM/dd"));

  if (id) f.append("id", String(id));

  const URL = id ? API_URL.updateEvent : API_URL.createEvent;
  return API_POST(URL, f);
};
