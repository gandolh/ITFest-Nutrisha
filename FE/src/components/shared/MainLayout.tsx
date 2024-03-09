import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu";
import { ToastContainer } from 'react-toastify';


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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
      <HeaderMegaMenu NavLinks={NavLinks} handleChangeActive={changeActive} />
      <Outlet />
        </>
    );
}