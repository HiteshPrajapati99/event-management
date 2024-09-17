export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  totalGuests: number | null;
  userId: number;
  images: {
    id: number;
    image: string;
    eventId: number;
  }[];
}
