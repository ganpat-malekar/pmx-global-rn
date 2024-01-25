import React from "react";

export const Copyright = () => {
  return (
    <p className="Login-copyright" align="center">
      {"Copyright © "}
      {new Date().getFullYear()} PayMate. All rights reserved.
    </p>
  );
};
