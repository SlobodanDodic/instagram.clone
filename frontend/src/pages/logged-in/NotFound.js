import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && navigate(-1);
  }, [counter, navigate]);

  return (
    <div className="w-screen h-screen bg-center bg-no-repeat bg-cover bg-notFound">
      <div className="absolute bottom-0 flex flex-col items-center justify-end h-screen overflow-hidden text-center">
        <h1 className="w-screen pt-10 text-5xl text-yellow-400 bg-zinc-900/60">404</h1>
        <h1 className="w-screen py-4 text-5xl text-yellow-400 bg-zinc-900/60">Page Not Found</h1>
        <h1 className="w-screen pb-2 text-3xl text-yellow-500 bg-zinc-900/60">I'll send you back in:</h1>
        <h1 className="w-screen pb-10 text-3xl text-yellow-500 bg-zinc-900/60">
          {counter} {counter > 1 ? " seconds" : " second"}
        </h1>
      </div>
    </div>
  );
}