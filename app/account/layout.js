import SideNavigation from "../_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[15rem_1fr] h-full gap-10 ">
      <div>
        <SideNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
