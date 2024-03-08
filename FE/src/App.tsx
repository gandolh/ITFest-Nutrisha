import { HeaderMegaMenu } from "./shared/HeaderMegaMenu";
import { MantineProvider } from '@mantine/core';
import { ToggleThemeComp } from "./shared/ToggleThemeComp";



export default function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
        <HeaderMegaMenu />
        <ToggleThemeComp />
    </MantineProvider>
  )
}