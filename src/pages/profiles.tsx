import React, { useEffect, useState } from "react";

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch("/api/profiles");
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {profiles.map((profile, index) => (
          <li key={index}>
            {profile.name} - {profile.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilesPage;
