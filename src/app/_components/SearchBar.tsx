"use client";

import { CalendarDays, MoveRightIcon, UserRound } from "lucide-react";

// calender
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "~/lib/utils";
import AttendanceSelector from "./AttendanceSelector";
import LocationSelect from "./LocationSelect";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const FormSchema = z.object({
  datePicker: z.object({
    from: z.date({
      required_error: "A start date is required.",
    }),
    to: z
      .date({
        required_error: "An end date is required.",
      })
      .optional(),
  }),
  locationSelect: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .optional(),
  attendanceSelector: z
    .object({
      adults: z.number().nullable(),
      children: z.number().nullable(),
      rooms: z.number().nullable(),
    })
    .optional(),
});

export type formType = UseFormReturn<z.infer<typeof FormSchema>>;

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValues = (searchParams: any) => {
    if (searchParams.get("start")) {
      return {
        locationSelect: {
          label: searchParams.get("location") || "",
          value: searchParams.get("location") || "",
        },
        attendanceSelector: {
          adults: Number(searchParams.get("adults")) || null,
          children: Number(searchParams.get("children")) || null,
          rooms: Number(searchParams.get("rooms")) || null,
        },
        datePicker: {
          from: searchParams.get("start")
            ? new Date(searchParams.get("start")!)
            : undefined,
          to: searchParams.get("end")
            ? new Date(searchParams.get("end")!)
            : undefined,
        },
      };
    } else
      return {
        locationSelect: null,
        attendanceSelector: { adults: null, children: null, rooms: null },
        datePicker: {
          from: undefined,
          to: undefined,
        },
      };
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues(searchParams),
  });

  return (
    <>
      <div className="flex h-full w-full flex-col gap-1 py-5 md:flex-row">
        <div className="grid w-full grid-cols-3 gap-x-1 gap-y-1 ">
          {/* Location selection */}
          <div className="relative col-span-3 rounded-sm bg-white text-sm font-medium md:col-span-1">
            <LocationSelect form={form} />
          </div>

          {/* date picker */}
          <div className="relative col-span-3 flex rounded-sm bg-white text-sm font-medium md:col-span-1">
            <Form {...form}>
              <form className="w-full">
                <FormField
                  name="datePicker"
                  render={({ field }) => (
                    <FormItem className="flex h-full flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="h-full py-3">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "flex w-full justify-start pl-1 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarDays className="w-[2rem] px-1 text-gray-600" />
                              {field.value.from && field.value.to ? (
                                format(field.value.from, "PPP") +
                                "-" +
                                format(field.value.to, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* How many people? popover */}
          <div className="col-span-3 flex items-center rounded-sm bg-white text-sm font-medium md:col-span-1">
            <Popover>
              <PopoverTrigger className="flex h-full w-full items-center px-1 py-3 text-gray-600">
                <UserRound className="w-[2rem]" />
                {form.watch("attendanceSelector.adults")} adults -{" "}
                {form.watch("attendanceSelector.children")} children -{" "}
                {form.watch("attendanceSelector.rooms")} room
              </PopoverTrigger>
              <PopoverContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Adults</div>
                  <AttendanceSelector form={form} name="adults" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Children</div>
                  <AttendanceSelector form={form} name="children" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold">Rooms</div>
                  <AttendanceSelector form={form} name="rooms" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => {
              const formValues = form.getValues();
              interface searchObjectInterface {
                rooms?: any;
                adults?: any;
                children?: any;
                location?: any;
                start?: any;
                end?: any;
              }

              const searchObject: searchObjectInterface = {
                rooms: formValues?.attendanceSelector?.rooms,
                adults: formValues?.attendanceSelector?.adults,
                children: formValues?.attendanceSelector?.children,
                location: formValues?.locationSelect?.label,
                start: formValues.datePicker.from,
                end: formValues.datePicker.to,
              };

              for (const key in searchObject) {
                if (
                  searchObject[key as keyof searchObjectInterface] == undefined
                )
                  delete searchObject[key as keyof searchObjectInterface];
              }

              // @ts-ignore
              const url = new URLSearchParams(searchObject).toString();

              router.push(`/listings?${url}`);
            }}
            variant={"default"}
            className="h-full w-full  bg-pink-500 text-lg font-bold hover:bg-pink-600"
          >
            <div className="flex items-center px-2">
              Search
              <MoveRightIcon className="ms-2" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
