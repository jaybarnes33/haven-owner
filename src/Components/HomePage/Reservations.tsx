import Image from "next/image";
import React from "react";

const Reservations = ({ bookings }: { bookings: Record<string, any>[] }) => {
  return (
    <div className="border  row-span-4  flex flex-col gap-3 mt-5 rounded">
      <h2 className="text-xl font-semibold px-6 pt-6">Reservations</h2>
      <div className="h-[80%] overflow-y-scroll px-6">
        {!bookings?.length && (
          <div className="bg-red-200 p-2 ">No bookings to show</div>
        )}
        {bookings?.map((item, i) => (
          <div
            key={i}
            className="flex flex-row justify-between items-center gap-3 border-b pb-2"
          >
            <div className="relative w-12 h-12">
              <Image src={"/Img.png"} fill alt="Hostel" />
            </div>
            <div className="flex-1">
              <h1>{item.listing.name}</h1>
              <h2 className="text-gray-400">{item.date}</h2>
            </div>
            <div>
              <h2 className="font-semibold">GHS {item.listing.price}</h2>
              <span className="text-primary text-sm">
                {item.booking_status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
