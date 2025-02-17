"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { CiDark, CiLight } from "react-icons/ci";

const NavBarColorModeBtn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box onClick={toggleColorMode} cursor={"pointer"}>
      {colorMode === "light" ? <CiDark size={35} /> : <CiLight size={35} />}
    </Box>
  );
};

export default NavBarColorModeBtn;
