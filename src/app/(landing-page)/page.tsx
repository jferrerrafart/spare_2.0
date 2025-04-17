import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <p className="py-10 text-lg font-semibold">
        Please connect your wallet to start using SPARE
      </p>
      <Image src="/rocketspareman.png" alt="Rocket" width={250} height={250} />
    </div>
  );
}
