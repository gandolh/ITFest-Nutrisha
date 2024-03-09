import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu";
import { AppShell} from '@mantine/core';

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

      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <HeaderMegaMenu NavLinks={NavLinks} handleChangeActive={changeActive} />
        </AppShell.Header>

        <AppShell.Main pt={60}> <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}