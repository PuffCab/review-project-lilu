import React, { useEffect, useState } from "react";

function ListOfProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getProfiles");
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // A helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-4 p-4">
      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="bg-white shadow overflow-hidden rounded-md p-4"
        >
          <h2 className="text-lg font-bold text-blue-600">{profile.name}</h2>
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
          <p>Baby Born: {profile.babyBorn ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default ListOfProfiles;
