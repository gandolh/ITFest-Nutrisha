import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu";


export default function MainLayout() {
  const [NavLinks, setNavLinks] = React.useState<Array<NavLink>>([
    { id: 1, name: "Home", anchor: "", active: true },
    { id: 2, name: "Recipes", anchor: "recipes", active: false },
  ]);

  const changeActive = (id: number) => {
    let navLinksCopy = NavLinks.map((link) =>
      id === link.id ? { ...link, active: true } : { ...link, active: false }
    );
    setNavLinks(navLinksCopy);
  };

  return (
    <>
      <HeaderMegaMenu NavLinks={NavLinks} handleChangeActive={changeActive} />
      <Outlet />
        </>
    );
}