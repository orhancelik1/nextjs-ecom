"use client";

import { useEffect } from "react";

const BootsrapClient = () => {
  useEffect(() => {
    require("../../../node_modules/bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return null;
};

export default BootsrapClient;
