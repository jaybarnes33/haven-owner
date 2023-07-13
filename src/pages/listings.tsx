import Input from "@/Components/Core/Input";
import Add from "@/Components/Forms/Listings/Add";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Listings = () => {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, any>>({});
  const [listings, setListings] = useState<Record<string, any>>([]);
  useEffect(() => {
    const token = sessionStorage.getItem("haven_token");
    console.log({ token });
    if (!token) {
      router.push("/auth/login");
    }
    (async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: listingsRes } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/listings`
      );
      console.log(listingsRes);
      setListings(
        listingsRes.results.filter(
          (item: Record<string, any>) => item.owner.id === data.id
        )
      );
      setUser(data);
    })();
  }, [router]);

  const { toggle, setSelected } = useModal();
  return (
    <div className="p-6 md:px-24">
      <Head>
        <title>Listings</title>
      </Head>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Your Listings</h1>
        <button
          className="bg-primary p-2 px-4 cursor-pointer"
          onClick={() => {
            toggle();
            setSelected(<Add />);
          }}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-4 py-3">
        {!listings.length && (
          <div className="bg-red-200 p-2 ">No listings to show</div>
        )}
        {listings.map((item: Record<string, any>, i: number) => (
          <div
            key={i}
            className="flex flex-row gap-3 border items-center rounded cursor-pointer"
          >
            <div className="relative w-52 h-32 rounded-l">
              {item.images && item.images.length ? (
                <Image
                  src={item.images[0]}
                  fill
                  alt="Image"
                  className="rounded-l"
                />
              ) : (
                <Image
                  src={"/hostel.jpg"}
                  fill
                  alt="Image"
                  className="rounded-l"
                />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-sm text-gray-400">{item.name}</h2>
              <div className="flex-1">
                <h1 className="font-semibold">{item.name}</h1>
                <ul className="flex gap-3 text-sm text-gray-400">
                  <li>1 - 4 in a room</li>
                  {item.covered_amenities.map((item: string, i: number) => (
                    <li className="capitalize" key={`amenity-${i}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-md font-bold">GHS {item.price}</div>
            </div>
            <div className="flex flex-col items-center px-3">
              <div className="bg-green-100 py-1 w-24 ml-auto text-center px-3 text-primary">
                Active
              </div>
              <div className="text-gray-400 text-sm">Sep 20 - August 2022</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
