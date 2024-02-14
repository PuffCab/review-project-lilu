import Contact from "@/components/contact";
import { useSession } from "next-auth/react";
import React from "react";

const ContactPage = () => {
  const session = useSession();

  console.log("session :>> ", session);

  return <Contact />;
};

export default ContactPage;
