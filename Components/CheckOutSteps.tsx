const CheckOutSteps = ({current = 0}) => {
  return (
    <>
      <div className="w-full text-center">
      <ul className="steps steps-vertical  lg:steps-horizontal md:w-2/3">
        {[
          "User Login",
          "Shipping Address",
          "Payment Method",
          "Place Order",
        ].map((step, index) => (
          <li
            key={index}
            className={`step ${index <= current ? "step-success" : ""}`}
          >
            {step}
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default CheckOutSteps;
