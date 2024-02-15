import ListOfProfiles from "@/components/ListOfProfiles";
import React, { useEffect, useState } from "react";

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch("/api/profiles");
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  return (
    <div className="space-y-4 ">
      <h1 className="text-2xl font-semibold">Profiles</h1>
      <div>
        {profiles.map((profile) => (
          <div
            key={profile.name}
            className="bg-white shadow overflow-hidden rounded-md p-4"
          >
            <h2 className="text-xl font-bold">{profile.name}</h2>
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
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;
