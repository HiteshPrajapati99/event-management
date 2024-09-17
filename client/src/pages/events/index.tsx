import { addUpdateEvent, getAllEvents } from "@/api/events";
import { useQuery } from "react-query";
import EventCard from "./event";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const Products = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-all-products", search],
    queryFn: () => getAllEvents({ search }),
    select: (d) => (d ? d.r || [] : null),
    keepPreviousData: true,
  });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-8 gap-8  mb-6">
        <div className="flex gap-6 w-full">
          <Input
            placeholder="Search Event"
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          {/* <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-6 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div> */}
        </div>
        <Button onClick={() => navigate("/event/create")}> Add New </Button>
      </div>

      {/* Events */}
      <div>
        {isLoading ? (
          <div
            className="flex justify-center items-center"
            style={{
              height: "calc(100dvh - 8rem)",
            }}
          >
            <Loader2 className="animate-spin" />
          </div>
        ) : data?.events.length !== 0 ? (
          <div className="px-10  grid gap-4 grid-cols-2 md:grid-cols-4 2xl:grid-cols-3">
            {data?.events.map((p) => (
              <EventCard event={p} refatch={refetch} />
            ))}
          </div>
        ) : (
          <div
            className="flex justify-center items-center text-xl font-semibold"
            style={{
              height: "calc(100dvh - 8rem)",
            }}
          >
            No Events Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
