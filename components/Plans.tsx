import Head from "next/head";
import logo from "../public/logo.svg";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { AiOutlineCheck } from "react-icons/ai";
import { Product } from "@stripe/firestore-stripe-payments";
import { useState } from "react";
import Loader from "./Loader";
import Table from "./Table";
import { loadCheckout } from "@/lib/stripe";

interface Props {
  products: Product[];
}

export default function Plans({ products }: Props) {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id!);
    setIsBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-5 border-b border-[#ffffff30]">
        <Image src={logo} alt="brand logo" className="w-[90px] md:w-[150px]" />
        <button className="font-medium" onClick={logout}>
          Sign Out
        </button>
      </header>
      <main className="pt-28 mw-w-5xl pb-12 transition-all md:px-10 max-w-5xl mx-auto">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> Watch all you
            want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" />{" "}
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> Change or
            cancel your plan anytime.
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-yellow-300" />
            ) : (
              "Subscribe"
            )}
          </button>{" "}
        </div>
      </main>
    </div>
  );
}
