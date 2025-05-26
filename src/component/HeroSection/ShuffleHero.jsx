import Lottie from "lottie-react";
import animation from "../../assets/lecure.json";

const ShuffleHero = () => {
  return (
    <section className="bg-gray-200 lg:grid ">
      <div className="mx-auto max-w-[1400px]  h-[95vh] px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4  lg:py-32 ">
        <div className=" text-left  ">
          <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
            Better every day
          </span>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to Visiting Lectures
            <strong className="text-indigo-600"> Lectures </strong>
            Portal
          </h1>

          <p className="mt-6 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            We're looking for passionate educators. Apply now to join our
            academic team. We're looking for passionate educators. Apply now to
            join our academic team. We're looking for passionate educators.
            Apply now to join our academic team.
          </p>

          <div className="mt-8 flex gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="#"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>

        <Lottie animationData={animation} loop={true}  />
      </div>
    </section>
  );
};

export default ShuffleHero;
