import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import registerNewUser from "./api/registerNewUser";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    dueDate: Date(),
    babyBorn: false,
  });

  const router = useRouter();
  const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = newUser;
    if (!email.includes("@") && password.length < 6) {
      alert(
        "Your email seems to be invalid. \n Your password should be at least 6 characters"
      );
      return;
    } else if (password.length < 6) {
      alert("Your password should be at least 6 characters");
      return;
    } else if (!email.includes("@")) {
      alert("Your email seems to be invalid");
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();

      urlencoded.append("name", newUser.name);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
      urlencoded.append("dueDate", newUser.dueDate as string);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch("/api/registerNewUser", requestOptions);
        console.log("response :>> ", response);
        if (response.ok) {
          const result = await response.json();
          console.log("result in register:>> ", result);

          setNewUser(result);
          alert("Thank you for joining Lilu!");
          // await signIn("credentials", {
          //   ...newUser,
          //   redirect: false,
          // });
        }
        // await router.push("../profiles");
        // location.reload();
      } catch (error) {
        console.log("error in your /signup fetch:>> ", error);
      }
    } catch (error) {
      console.log("error when adding new user:>> ", error);
    }
  };

  useEffect(() => {
    setNewUser(newUser);
  }, []);

  return (
    <div className="bg-red-50 p-8">
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign up</h2>
          <form onSubmit={handleRegister} action="submit">
            <input
              onChange={handleRegisterInput}
              placeholder="Name"
              className="w-full  mb-4  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="name"
            />

            <input
              onChange={handleRegisterInput}
              placeholder="Email"
              className="w-full  mb-4  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="email"
              required
            />

            <input
              placeholder="Password"
              onChange={handleRegisterInput}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              name="password"
              required
            />

            <div className="flex flex-col ">
              <label className="mx-2" htmlFor="course_date">
                When is your due date?
              </label>
              <input
                // value={formatInputDate(userInfo.course_date)}
                className="shadow-custom mb-6 w-36 rounded-2xl bg-[#EDE9E6] p-2 font-medium"
                onChange={handleRegisterInput}
                type="date"
                name="dueDate"
              />
            </div>

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
};

export default SignUp;
