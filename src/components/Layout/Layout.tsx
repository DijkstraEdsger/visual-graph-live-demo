import { Outlet } from "react-router-dom";
import Text from "components/atoms/Text";
import Icon from "components/atoms/Icon";
import Header from "components/Header";

const Layout = () => {
  return (
    <>
      {/* <MenuToolbar />
      <Text size="xl">Humberto</Text>
      <Icon name="download" />
      <Icon name="upload" />
      <Icon name="right-arrow" />
      <Icon name="left-arrow" />
      <Icon name="up-arrow" />
      <Icon name="down-arrow" />
      <Icon name="new-document" />
      <Icon name="delete" />
      <Icon name="info" /> */}
      <Header />

      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
