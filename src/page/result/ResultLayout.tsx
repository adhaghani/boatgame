import { memo } from "react";
import { Outlet } from "react-router-dom";
const ResultLayout = memo(() => {
  return <Outlet />;
});

export default ResultLayout;
