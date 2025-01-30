import Image from "next/image";
import Navbar from "@/app/components/navbar";

export default function Home() {
  return (
      <div className="relative w-full min-h-screen  rounded-xl">
          <Navbar></Navbar>
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
              <Image
                  src="/images/spiderman.png" // Ensure this file is in the `public/images` folder
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  priority
              />
          </div>

          {/* Foreground Content with Blur */}
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500/10 backdrop-blur-[5px] w-full h-full rounded-xl  p-8">
                  <h1 className="text-white text-2xl font-bold">Hi sir</h1>
              </div>
          </div>
      </div>

  );
}
