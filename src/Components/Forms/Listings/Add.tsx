import Input from "@/Components/Core/Input";
import { useModal } from "@/hooks/useModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    room_types: ["two-in-a-room", "four-in-a-room"],
    covered_amenities: ["Electricity", "Gas"],
    pricing_model: "semester",
    price: 0,
    total_rooms: 0,
    location: "",
    images: [],
    owner_id: 1,
  });

  const { toggle } = useModal();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("haven_token");

      const { data: res } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/listings/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast.success("Listing created Added");
      toggle();
    } catch (error) {
      console.log(error);
      Object.keys((error as Record<string, any>).response.data).map((item) =>
        toast(
          typeof (error as Record<string, any>).response.data[item] == "string"
            ? (error as Record<string, any>).response.data[item]
            : (error as Record<string, any>).response.data[item][0]
        )
      );
    }
  };

  return (
    <form
      className="min-w-xl bg-white min-h-[50vh] pt-8 px-5"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-bold">Add listing</h1>
      <div className="grid gap-3 grid-cols-2 mt-4">
        <Input placeholder="Name" name="name" onChange={handleChange} />
        <Input
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
        <Input
          placeholder="Price"
          type="number"
          name="price"
          onChange={handleChange}
        />
        <Input
          placeholder="Total no. of rooms"
          name="total_rooms"
          onChange={handleChange}
        />
        <Input placeholder="Location" name="location" onChange={handleChange} />
      </div>
      <button
        type="submit"
        className="bg-primary text-white p-2 px-4 mt-4 flex mx-auto"
      >
        Add Listing
      </button>
    </form>
  );
};

export default Add;
