import Image from "next/image"
import { Button } from "../../ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import { type Image as ImageDbType } from "@prisma/client";

export default function PropertyGallery({images} : {images : ImageDbType[]}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
      <Carousel className="h-full">
        <CarouselContent className="">
          {images.map((image: ImageDbType) => {
            return (
              <CarouselItem key={image.id} className="h-[90vh] w-[60vw]">
                <Image
                  key={image.id}
                  className="h-full w-full object-cover"
                  width={1000}
                  height={900}
                  alt=""
                  src={image.url}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className=" -left-2 rounded-full" />
        <CarouselNext className=" -right-2 rounded-full " />
      </Carousel>
    </div>
  )
}
