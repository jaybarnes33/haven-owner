import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Modal from "../Core/Modal";
import { useModal } from "@/hooks/useModal";

const Header = () => {
  const links = ["dashboard", "listings", "bookings"];
  const { open, selected, toggle } = useModal();
  const { pathname } = useRouter();

  return (
    <div className="p-6 py-5 md:px-24 fixed flex w-full border-b z-[999] bg-white">
      <div className="relative w-6 h-6">
        <Image src="/logo.png" fill alt="" />
      </div>
      <div className="mx-auto flex gap-6">
        {links.map((link, i) => (
          <Link
            className={clsx(["capitalize cursor-pointer"])}
            href={`/${link !== "dashboard" ? link : ""}`}
            key={link}
          >
            {link}
            {((pathname === "/" && link === "dashboard") ||
              pathname.includes(link)) && (
              <div className="w-full h-[3px] bg-primary relative  -bottom-[22px]"></div>
            )}
          </Link>
        ))}
      </div>
      <Modal open={open} toggle={toggle} data={selected} />
    </div>
  );
};

export default Header;
