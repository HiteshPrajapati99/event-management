import { API_URL } from "@/api/config";
import { addUpdateEvent } from "@/api/events";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { Event } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";

type CardProps = {
  event: Event;
  refatch: () => void;
};

const ProductCard = ({ event, refatch }: CardProps) => {
  const navigate = useNavigate();
  const [isDeleteModal, setisDeleteModal] = useState(false);

  const handleDelete = async () => {
    const res = await addUpdateEvent({ id: event.id, status: "0" });
    if (res.s) {
      refatch();
      toast.success("Event Delete success!");
      setisDeleteModal(false);
    } else {
      toast.error(res.m);
    }
  };

  return (
    <>
      <div className="w-full h-full shadow-lg border p-4 rounded-md min-w-full">
        <img
          src={API_URL.imageURL + event.images[0].image}
          className="w-full h-44"
        />

        <div className="space-y-3 my-3">
          <p>Event Name : {event.name}</p>
          <p>Event Description : {event.description}</p>
          <p> Total Event Guests : {event.totalGuests}</p>
          <p>Event Start Date : {format(event.startDate, "dd/MM/yyyy")}</p>
          <p>Event End Date : {format(event.endDate, "dd/MM/yyyy")}</p>

          <div>
            images :{" "}
            <div className="flex gap-3 flex-wrap">
              {event.images.map((item) => (
                <img
                  src={API_URL.imageURL + item.image}
                  className="size-16 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="destructive"
            onClick={() => {
              setisDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              navigate("/event/update/" + String(event.id), {
                state: event,
              });
            }}
          >
            Edit
          </Button>
        </div>
      </div>

      <ConfirmModal
        open={isDeleteModal}
        onClose={() => {
          setisDeleteModal(false);
        }}
        onConfirm={handleDelete}
        title={"Confirm Deletion"}
        message={"Are you sure you want to delete this event?"}
        confirmButtonLabel={"Delete"}
      />
    </>
  );
};

export default ProductCard;
