import React from 'react'

const Hero = () => {
  return (
    <>
      <div className="hero my-5 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="drop-shadow-[5px_5px_15px_rgba(25,25,25,0.75)]">
            <div className="mockup-phone border-lime-600">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1">
                  Hi Farmers!
                  <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around md:flex-row md:p-5 p-10 border border-8 border-lime-600 my-2 rounded">
        <div className="my-auto">
          <img className="mask mask-hexagon " src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" />
        </div>
        <div className="my-auto">
          <img className="mask mask-hexagon" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
        </div>
        <div className="md:block my-auto flex justify-end">
          <img className="mask mask-hexagon" src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" />
        </div>
      </div>
    </>
  )
}

export default Hero