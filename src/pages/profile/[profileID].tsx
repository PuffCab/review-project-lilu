import ListOfProfiles from "@/components/ListOfProfiles";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const session = useSession();
  console.log("session :>> ", session);

  const user = session && session?.data?.user;
  const [profile, setProfile] = useState({
    name: user?.name,
    email: user?.email,
    dueDate: Date(),
    babyBorn: false,
  });

  const formatDate = (date: Date | string) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US");
    return formattedDate;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/profileById/${user?.image}`);
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="space-y-4 h-screen">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div>
        <div className="bg-white shadow overflow-hidden rounded-md p-4">
          <h2 className="text-lg font-bold text-red-400">{profile.name}</h2>
          <p>
            Email:{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-blue-500 underline"
            >
              {profile.email}
            </a>
          </p>
          <p>Due Date: {formatDate(profile.dueDate)}</p>
          <p>Baby already Born: {profile.babyBorn ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
