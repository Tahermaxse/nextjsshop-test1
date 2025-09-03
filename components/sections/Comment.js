import React from "react";

const Comment = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-20 text-sm">
        <div className="">
          <div className="p-3">
            <div className="relative  bg-gray-50 dark:bg-[#ffffff1b] mx-auto  max-w-3xl rounded-3xl  p-10  sm:px-16">
              <div className="text-center mt-10">
                <h2 className="text-base  sm:text-2xl">
                  <span className="relative">
                    <span className="text-4xl text-black dark:text-white absolute -translate-x-6 -translate-y-2 ">
                      ❝
                    </span>{" "}
                    CopyUI has been a{" "}
                    <span className=" bg-green-500 text-white p-1 font-bold">
                      game-changer
                    </span>{" "}
                    for me! While I excel in backend development, CSS and
                    frontend design are not my strong suits. But with CopyUI,
                    I've saved time, avoided frustration, and brought my visions
                    to life effortlessly.
                    <span className="text-4xl text-[#414141] dark:text-white absolute xl:-bottom-2 -bottom-4  mt-20 ml-1">
                      ❞
                    </span>
                  </span>
                </h2>
                <div className="mt-5 text-center">
                  <img
                    src="https://pbs.twimg.com/profile_images/1490075268928655364/L-PTx3nW_400x400.jpg"
                    className="object-cover rounded-full inline-block w-16 mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-600 mb-1">
                    Peter Mick
                  </h3>
                  <p className="text-xs text-dark-300 sm:text-base">
                    <span>
                      Founder of{" "}
                      <a
                        href="https://Copylime.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold"
                      >
                        Copylime
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://TweetAI.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold"
                      >
                        TweetAI
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
