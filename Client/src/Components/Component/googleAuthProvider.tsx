import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("✅ GoogleAuthWrapper mounted");
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};
