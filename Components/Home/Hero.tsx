import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero my-5 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="drop-shadow-[5px_5px_15px_rgba(25,25,25,0.75)]">
            <div className="mockup-phone border-lime-600">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 p-8">
                  <img src="images/others/service.png" alt="car!" />
                  Hi Farmers!
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold">KrishaQ: Harvesting the Future, One Click at a Time</h1>
            <p className="py-6">
            Your one-stop online marketplace, connecting farmers directly with quality buyers for fresh produce and agricultural essentials.
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around md:flex-row md:p-5 space-y-4 p-10 border-4 border-lime-600 my-2 rounded">
        <div className="md:w-1/3 flex items-center justify-center">
          <div className="text-center">
            <img className="w-32 mx-auto" src="images/others/assurance.png" />
            <span className="text-2xl">Assured</span>
          </div>
        </div>
        <div className="md:w-1/3 mx-auto">
          <img
            className="mask mask-hexagon w-96"
            src="images/others/tomato.jpg"
          />
        </div>
        <div className="md:w-1/3 flex items-center justify-center">
          <div className="text-center">
            <img className="w-32 mx-auto" src="images/others/delivery.png" />
            <span className="text-2xl">Fast Delivery</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
