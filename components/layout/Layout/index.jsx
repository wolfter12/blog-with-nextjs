import MainNavigation from "../MainNavigation";

function Layout(props) {
  const { children } = props;
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
