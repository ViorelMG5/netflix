import Membership from "@/components/Membership";
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import payments from "@/lib/stripe";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import userIcon from "../public/pingu.png";
import logo from "../public/logo.svg";
import Image from "next/image";
interface Props {
  products: Product[];
}
export default function Account({ products }: Props) {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-5 border-b border-[#ffffff30]">
        <Link href="/">
          <Image
            src={logo}
            alt="brand logo"
            className="w-[90px] md:w-[150px]"
          />
        </Link>
        <Link href="/" className="shrink-0">
          <Image
            src={userIcon}
            alt={"netflix logo"}
            className="w-[40px] md:w-[40px] rounded-md"
          />
        </Link>
      </header>
      <main className="mx-auto max-w-6xl pt-24 px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="font-semibold text-[#555]">
              Member since{subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan details</h4>
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:uderline md:text-right">
            Change plan
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
