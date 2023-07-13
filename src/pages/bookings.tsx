import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("haven_token");
    console.log({ token });
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const { data: bookings, isLoading } = useQuery(["bookings"], async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/bookings/owner-bookings`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("haven_token")}`,
        },
      }
    );
    return data;
  });
  return (
    <div className="p-6 md:px-24">
      <h1 className="font-bold mb-2">Bookings</h1>
      <div className="flex flex-col gap-4">
        {/* {bookings.map((_, i) => ( */}
        <div>
          <div className="flex-col flex gap-4">
            {bookings?.map((item: Record<string, any>, i: number) => (
              <div
                key={`bookings-${i}-${i}`}
                className="flex flex-row gap-3  items-center justify-between rounded cursor-pointer"
              >
                <div className="flex-row gap-1 flex text-sm pl-3">
                  <span className="font-semibold">
                    {item.booking_date.split("T")[0]}
                  </span>
                </div>
                <div className="flex flex-1 justify-center items-center gap-2">
                  <div className="h-10 w-10 relative">
                    <Image
                      fill
                      alt="Hostel"
                      src={"/hostel.jpg"}
                      className="rounded-md"
                    />
                  </div>
                  <h2 className="text-sm text-gray-700 font-semibold">
                    {item.listing.name}
                  </h2>
                </div>
                <div className="flex gap-2 items-center px-3">
                  <div className="bg-green-100 py-1 w-24 ml-auto text-center px-3 text-primary">
                    Paid
                  </div>
                  <div className=" h-7 w-7 relative">
                    <Image
                      src={"/hostel.jpg"}
                      fill
                      alt=" user"
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
