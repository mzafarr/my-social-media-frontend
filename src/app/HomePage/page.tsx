import { FiLogIn } from "react-icons/fi";
import { BsDatabaseCheck } from "react-icons/bs";
import { AiOutlineUnlock } from "react-icons/ai";
import SignUp from "../SignUp/page";

function Homepage() {
  return (
    <div className=" text-white w-full h-[500px]">
      {/* Hero Section */}
      <section className="px-4 py-16 flex justify-center items-center">
        <div className="flex flex-col justify-start w-full md:w-50 py-10">
          <h1  className="py-4 text-4xl font-bold sm:text-6xl text-center sm:text-left sm:pl-10">Social Media</h1>
          <p className="text-center sm:text-left sm:pl-10">We help you connect and share with the people in your life.</p>
        </div>
        <div className="flex justify-center items-center w-full md:w-50 -mt-8">
          <SignUp />
        </div>
      </section>
      <section
        id="how-it-works"
        className="w-full flex justify-center py-28 bg-gray-800"
      >
        <div className="max-w-lg mx-auto ">
          <h2 className="text-4xl font-bold mb-8 text-center text-green-400">
            How It Works
          </h2>
          <div className="text-xl space-y-8 sm:ml-8">
            <div className="flex items-center gap-10">
              <FiLogIn size={35} color="white" />
              <p>Join and create your account.</p>
            </div>
            <div className="flex items-center gap-10">
              <BsDatabaseCheck size={35} color="white" />
              <p>Store your passwords securely.</p>
            </div>
            <div className="flex items-center gap-10">
              <AiOutlineUnlock size={35} color="white" />
              <p>Access your passwords anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
