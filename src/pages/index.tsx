import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Reservations from "@/Components/HomePage/Reservations";
import Notifications from "@/Components/Notifications";
import {
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/Components/Core/Spinner/Spinner";
export default function Home() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Rental Listings",
        data: [30, 40, 35, 50, 45, 60],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const router = useRouter();

  const options = {
    scales: {
      x: {
        type: "category", // explicitly define x-axis as category scale
      },
      y: {
        beginAtZero: true, // optional: start y-axis at zero
      },
    },
  };

  const [user, setUser] = useState<Record<string, any>>({});

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

      setUser(data);
    })();
  }, [router]);

  return (
    <main className={`p-6 md:px-24`}>
      {isLoading && <Spinner />}
      <h1 className="font-bold text-lg mt-10">
        {user.first_name}&apos;s Dashboard
      </h1>

      <div className="grid  grid-cols-2 gap-7">
        <div className="grid grid-rows-6">
          {/* <div className="relative w-full row-span-1 -mt-[5rem]">
            <Image src={"/alert.png"} fill alt="" />
          </div> */}
          <Reservations bookings={bookings} />
        </div>
        <div className="flex flex-col">
          <Line
            data={data}
            //@ts-ignore
            options={options}
            color="#2AC084"
            className="row-span-3"
          />

          <div className="row-span-3 grid grid-rows-3">
            <div className="flex flex-row gap-3 my-3 row-span-3">
              <div className="p-4 border rounded ">
                <h2 className="text-lg text-gray-700">GHS 50000</h2>
                <h3 className="text-xs text-primary">This year</h3>
              </div>
              <div className="p-4 border rounded">
                <h2 className="text-lg text-gray-700">GHS 50000</h2>
                <h3 className="text-xs text-primary">all time</h3>
              </div>
            </div>

            <Notifications />
          </div>
        </div>
      </div>
    </main>
  );
}
