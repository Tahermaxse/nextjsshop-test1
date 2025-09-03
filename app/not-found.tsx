import Link from "next/link";
import React from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Undo2 } from "lucide-react";

const notfound = () => {
  return (
    <div>
      <div className="text-center mt-20">
        <h1 className="">Whoops, this page doesn't exist.</h1>
        <h1 className="text-9xl  my-5 font-bold">
          <TextShimmer className="font-mono" duration={1}>
            404
          </TextShimmer>
        </h1>
        <Link href="/">
          <button className=" bg-green-500 hover:bg-green-400 text-white  rounded-lg px-5 py-3 mb-5 mt-2">
            <Undo2 className="inline-block mr-2" size={20} />
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default notfound;
