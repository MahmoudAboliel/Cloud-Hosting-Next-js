import Image from "next/image";
import CloudImage from '../../../public/cloud-hosting.png';
import Feature from "@/components/home/Feature";


const Hero = () => {
  return (
    <section className="h-full flex flex-col md:flex-row justify-center items-center p-5">
      <div className="flex flex-col max-md:bg-white max-md:p-4 max-md:rounded-3xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Cloud Hosting</h1>
        <p className="text-lg md:text-xl text-gray-600">The best web hosting solution for your online success</p>
        <div className="mt-3">
          <Feature>Easy To Use Control Panel</Feature>
          <Feature>Secure Hosting</Feature>
          <Feature>Website Maintenance</Feature>
        </div>
      </div>
      <div className="">
        <Image src={CloudImage} alt="cloud" width={500} height={500} />
      </div>
    </section>
  );
}

export default Hero;