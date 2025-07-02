import { memo } from "react";
import { Outlet } from "react-router-dom";

const ListLayout = memo(() => {
  return <Outlet />;
});

export default ListLayout;
