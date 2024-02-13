import React from "react";

function LogInForm() {
  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>
          <form action="submit">
            <input
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="name"
            />

            <br />
            <br />

            <input
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="password"
            />
          </form>
          <br />
          <button
            className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
