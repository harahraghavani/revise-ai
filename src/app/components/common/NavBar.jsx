import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import NavBarColorModeBtn from "./NavBarColorModeBtn";
import Link from "next/link";

const NavBar = () => {
  return (
    <Box p={5} boxShadow="base">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Heading as="h2" size="md" letterSpacing={0.5}>
          Revise AI
        </Heading>
        <Flex gap={3} alignItems={"center"}>
          {/* <NavBarColorModeBtn /> */}
          <Link
            href="https://github.com/harahraghavani/revise-ai"
            target="_blank"
          >
            <IconButton
              bg="transparent"
              _hover={{
                bg: "transparent",
              }}
            >
              <FaGithub size={35} />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
