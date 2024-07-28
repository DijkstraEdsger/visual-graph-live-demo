import { Outlet } from "react-router-dom";
import MenuToolbar from "components/MenuToolbar/MenuToolbar";

const Layout = () => {
  return (
    <>
      <MenuToolbar />
      <Outlet />
    </>
  );
};

export default Layout;
