import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col">
          <Image
              className="text-center w-full"
              src="/images/devtoys_logo_big.svg"
              alt="DevToys logo"
              width={180}
              height={38}
              priority
          />
          <h3>Please select a tool from navigation :) </h3>
        </div>
      </main>
    </div>
  );
}
