"use client";

import { useEffect } from "react";

const PrintOnLoad = () => {
  useEffect(() => {
    window.print();
  });

  return <></>;
};

export default PrintOnLoad;
