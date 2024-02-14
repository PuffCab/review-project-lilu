import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";

function LogInForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogInInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        ...user,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        await router.push(`/`);
        location.reload();

        console.log("Result of login successfully:", result);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>
          <form onSubmit={handleLogin} action="submit">
            <input
              onChange={handleLogInInput}
              placeholder="Email"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="email"
              required
            />
            <input
              onChange={handleLogInInput}
              placeholder="Password"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="password"
              required
            />

            <button
              className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
