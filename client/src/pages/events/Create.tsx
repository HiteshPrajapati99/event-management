import { addUpdateEvent } from "@/api/events";
import { FormInput } from "@/components/form";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import { Button } from "@/components/ui/button";
import { pickData } from "@/lib/utils";
import { Event } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const CreateProduct = () => {
  const { id } = useParams();

  const eventSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    description: z.string().min(1, "Event description is required"),
    startDate: z
      .date({ required_error: "start date is required." })
      .refine((date) => date, {
        message: "Invalid start date format",
      }),
    endDate: z
      .date({ required_error: "start date is required." })
      .refine((date) => date, {
        message: "Invalid end date format",
      }),
    totalGuests: z.coerce.number().optional(),

    images: z
      .custom<File[] | []>()
      .refine(
        (file) => (id ? true : file.length !== 0),
        "Min one image is required."
      ),
  });

  type T_Form = z.infer<typeof eventSchema>;

  const data: Event | undefined = useLocation().state;

  const navigate = useNavigate();

  const form = useForm<T_Form>({
    mode: "all",
    resolver: zodResolver(eventSchema),
    defaultValues: {
      images: [],
      name: data?.name || "",
      description: data?.description,
      totalGuests: data?.totalGuests || 0,
      startDate: data?.startDate ? new Date(data?.startDate) : undefined,
      endDate: data?.endDate ? new Date(data?.endDate) : undefined,
    },
  });

  const onSubmit = async (formData: T_Form) => {
    const changedData = pickData({
      keys: Object.keys(form.formState.dirtyFields),
      obj: formData,
    });

    const data = await addUpdateEvent({ ...changedData, id });

    if (!data.s) {
      toast.error(data.m);
      return;
    } else {
      toast.success(data.m);

      navigate(-1);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
      <div className="box py-4 px-10 rounded-lg flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
          </Button>
          <p className="font-semibold text-xl">
            {" "}
            {id ? "Update" : "Create"} Event{" "}
          </p>
        </div>

        <Button disabled={form.formState.isSubmitting}>
          {" "}
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin size-5 mr-2" />
          )}{" "}
          {id ? "Update" : "Add"}{" "}
        </Button>
      </div>

      {/* FORM */}

      <FormProvider {...form}>
        <div className="flex gap-6 px-10 mt-8">
          <div className="space-y-6 flex-1">
            <FormInput
              label="Event Name"
              placeholder="Enter event name"
              name="name"
            />
            <FormInput
              label="Description"
              placeholder="Enter description"
              name="description"
            />
            {!id && <FormInput label="Event Image" name="images" type="file" />}
          </div>
          <div className="space-y-6 flex-1">
            <FormInput label="Total Guests" type="number" name="totalGuests" />
            {!id && (
              <>
                <FormDatePicker name="startDate" label="Start Date" />
                <FormDatePicker name="endDate" label="End Date" />{" "}
              </>
            )}
          </div>
        </div>
      </FormProvider>
    </form>
  );
};

export default CreateProduct;
