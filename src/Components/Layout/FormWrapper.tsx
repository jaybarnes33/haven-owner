import React, { ReactNode, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const { pathname, back } = useRouter();
  return (
    <>
      <Head>
        <title>{pathname.includes("login") ? "Login" : "Register"}</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen md:h-screen fixed top-0 items-center ">
        <p
          className="text-xl absolute top-5 left-5 hover:text-accent cursor-pointer"
          onClick={() => back()}
        >
          &larr; Go back
        </p>
        <div className="desktop-only px-5 hidden md:block md:col-span-5">
          <div>
            <p className="text-3xl font-bold">
              Have your buildings rented out in a few clicks
            </p>
          </div>
        </div>
        <div className={`px-5 col-span-7 flex w-full items-center `}>
          <div className="w-full  xs:border xs:shadow md:border-none md:shadow-none   mt-5 p-5">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold">
                {pathname === "/login" ? "Welcome Back" : "Get Started"}
              </h1>
              <p>
                Please enter your details to{" "}
                {pathname.includes("login") || pathname.includes("refer")
                  ? "log into your account"
                  : "create an account"}
              </p>
            </div>

            {children}
            <div>
              {/* Or continue with */}
              {/* <div
                className={`${styles.buttons} buttons flex gap-3 justify-content-center`}
              >
                <Image
                  width={35}
                  height={35}
                  src="/google.png"
                  alt="google"
                  quality={100}
                />

                <Image
                  width={35}
                  height={35}
                  src="/facebook.png"
                  alt="facebook"
                  quality={100}
                />
              </div> */}
              <div className="mt-3">
                {pathname.includes("login") || pathname.includes("refer") ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <span className="text-primary hover:text-yellow-500">
                      <Link href="/auth/register">Sign up</Link>
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span className="text-primary">
                      <Link href="/auth/login">Sign in</Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
