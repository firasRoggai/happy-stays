"use client";
//UI
import Image from "next/image";
import { CalendarIcon, ChevronLeft, Loader2, Upload, XIcon } from "lucide-react";
import { Button } from "~/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/_components/ui/card";
import { Input } from "~/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/_components/ui/select";
import { Textarea } from "~/_components/ui/textarea";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/_components/ui/popover";
import { Calendar } from "~/_components/ui/calendar";

import { listingInput, type ListingEditRequired } from "~/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/_components/ui/form";
import { Badge } from "~/_components/ui/badge";
import { UploadButton } from "~/utils/uploadthing";
import amenities, { type Amenity } from "~/data/ameneties";

interface ListingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  existingListing: ListingEditRequired;
}

export function EditListing({ existingListing }: ListingFormProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  type TlistingInput = z.infer<typeof listingInput>;

  const form = useForm<TlistingInput>({
    resolver: zodResolver(listingInput),
    defaultValues: { ...existingListing, price: Number(existingListing.price) },
  });
  const { mutate: updateListing, isLoading ,isSuccess } = api.listing.update.useMutation();
  //const createImage = api.images.create.useMutation();
  const revalidate = api.useUtils();

  const onSubmit = async (data: TlistingInput) => {
    updateListing({
      id: existingListing.id,
      data: { ...data, ameneties: selectedAmenties },
    });
    if (isSuccess) {
      await revalidate.listing.allUserListings.invalidate();
      router.push("/dashboard");
    }
  };

  const [selectedAmenties, setSelectedAmenties] = useState<string[]>(
    existingListing.Amenties,
  );
  const router = useRouter();
  const handleAmenityClick = (amenity: string) => {
    const alreadySelected = !!selectedAmenties.find((a) => a === amenity);
    if (alreadySelected) {
      setSelectedAmenties((prevAmenities) =>
        prevAmenities.filter((a) => a !== amenity),
      );
    } else {
      setSelectedAmenties((prevAmenities) => [...prevAmenities, amenity]);
    }
    console.log("selected Amenites", selectedAmenties);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className=" mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Edit Listing
                  </h1>
                  {existingListing.approve === "Approved" ? (
                    <Badge variant="default">Approved</Badge>
                  ) : existingListing.approve === "Pending" ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : (
                    <Badge variant="destructive">Not Approved</Badge>
                  )}
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button
                      onClick={() => {
                        router.back();
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                      {isLoading ? <div className="w-[4.6rem] grid justify-center"><Loader2 className="animate-spin"></Loader2></div> : "Save Changes"}
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Details</CardTitle>
                        <CardDescription>
                          This information will be displayed publicly so be
                          careful what you share.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="name">Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="name"
                                      className="w-full"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    This is your Listing&apos;s public display
                                    name.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid  gap-3">
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="description">
                                    Description
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      id="description"
                                      className="resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Describe the listing&apos;s surroundings and
                                    features.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Listing Images</CardTitle>
                        <CardDescription>
                          Add images to better Present your Property{" "}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div>
                            <UploadImage listingsId={existingListing.id} />
                            <ImagesDisplay id={existingListing.id} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="status">
                                    Status:
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="status"
                                        aria-label="Select status"
                                      >
                                        <SelectValue placeholder="Select Status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Active">
                                        Active
                                      </SelectItem>
                                      <SelectItem value="InActive">
                                        InActive
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Select the type of Listing you are adding.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Type</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="category">
                                    Category:
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        id="category"
                                        aria-label="Select category"
                                      >
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Apartement">
                                        Apartement
                                      </SelectItem>
                                      <SelectItem value="House">
                                        House
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Select the type of Listing you are adding.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Availability Date</CardTitle>
                        <CardDescription>
                          Let the users Know when is your Listing available.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className={cn("grid gap-2")}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                  "w-[300px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, "LLL dd, y")} -{" "}
                                      {format(date.to, "LLL dd, y")}
                                    </>
                                  ) : (
                                    format(date.from, "LLL dd, y")
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                fromDate={new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing Address</CardTitle>
                        <CardDescription>
                          Let the users Know where is your Listing at.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="City">city</FormLabel>
                                  <FormControl>
                                    <Input id="City" {...field} />
                                  </FormControl>
                                  <FormDescription>Wilaya</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="province"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Provinance">
                                    Provinance
                                  </FormLabel>
                                  <FormControl>
                                    <Input id="Provinance" {...field} />
                                  </FormControl>
                                  <FormDescription>Baladiya</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="street"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="street">Street</FormLabel>
                                  <FormControl>
                                    <Input id="street" {...field} />
                                  </FormControl>
                                  <FormDescription>Street</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Listing&apos;s Price</CardTitle>
                      </CardHeader>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <CardContent>
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="price">
                                    Price (DZD) :
                                  </FormLabel>
                                  <Input id="price" type="number" {...field} />
                                  <FormDescription>
                                    The average price of a one night in your
                                    Stay.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Amenities</CardTitle>
                        <CardDescription>
                          Add amenties to help describe your property.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2">
                          {amenities.map((amenty: Amenity) => {
                            const Icon = amenty.icon;
                            const alreadySelected = !!selectedAmenties.find(
                              (a) => a === amenty.name,
                            );
                            return (
                              <div
                                className={`m-2 flex flex-col items-center gap-2 rounded-md  py-2 hover:cursor-pointer hover:bg-pink-200 ${alreadySelected ? "bg-rose-400 text-white" : "bg-accent "}`}
                                key={amenty.name}
                                onClick={() => {
                                  handleAmenityClick(amenty.name);
                                }}
                              >
                                <Icon />
                                <div>{amenty.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditListing;

const UploadImage = ({ listingsId }: { listingsId: string }) => {
  const trpc = api.useUtils();
  const createImage = api.images.create.useMutation({
    onSettled: async () => {
      await trpc.images.invalidate();
    },
  });
  return (
    <>
      <label htmlFor="uploadImage">
        <div
          onClick={() => {
            // const uploadButton = document.querySelector('input[type="file"]');
            // if (!uploadButton === null) uploadButton.click();
          }}
          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed hover:cursor-pointer hover:bg-pink-200 "
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </div>
      </label>
      <UploadButton
        className="mt-4"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res.map((image) => {
            createImage.mutate({
              data: { id: image.key, url: image.serverData.fileUrl },
              listingId: listingsId,
            });
          });
        }}
      />
    </>
  );
};

const ImagesDisplay = ({ id }: { id: string }) => {
  const { data: images } = api.images.getPostImages.useQuery(id);
  const trpc = api.useUtils();
  const deleteImage = api.images.deleteimage.useMutation({
    onSettled: async () => {
      await trpc.images.invalidate();
    },
  });

  return (
    <>
      {images?.map((image) => (
        <div key={image.id}>
          <XIcon
            className="absolute m-2 rounded-sm bg-white p-1 text-red-700 shadow-md hover:cursor-pointer hover:bg-red-400 hover:text-white"
            onClick={() => {
              deleteImage.mutate({ imageId: image.id });
            }}
          />
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="750"
            src={image.url}
            width="750"
          />
        </div>
      ))}
    </>
  );
};
