import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

export const useMarkdownTheme = () => {
  const { colorMode } = useColorMode();

  const customMarkdownTheme = {
    a: (props) => {
      const { children, href } = props;
      return (
        <Text
          as="a"
          href={href}
          color="blue.500" // Change this to your desired link color
          textDecoration="underline"
          _hover={{ color: "blue.600" }} // Optional: change color on hover
          target="_blank" // This makes the link open in a new tab
          rel="noopener noreferrer" // Security best practice for links opening in new tabs
        >
          {children}
        </Text>
      );
    },
    p: (props) => {
      const { children } = props;
      return <Text mb={4}>{children}</Text>; // Adds margin-bottom to paragraphs
    },
    h1: (props) => {
      const { children } = props;
      return (
        <Text fontSize="2xl" mb={4}>
          {children}
        </Text>
      );
    },
    ul: (props) => {
      const { children } = props;
      return (
        <Box as="ul" styleType="disc" pl={4} mb={4}>
          {children}
        </Box>
      );
    },
    ol: (props) => {
      const { children } = props;
      return (
        <Box as="ol" styleType="decimal" pl={4} mb={4}>
          {children}
        </Box>
      );
    },
    li: (props) => {
      const { children } = props;
      return (
        <Box
          as="li"
          mb={2}
          sx={{
            "&::marker": {
              marginInlineStart: "8px", // Adjust this value to set the margin for the list markers (1., 2., 3., etc.)
            },
          }}
        >
          {children}
        </Box>
      );
    },
    pre: (props) => {
      const { children } = props;
      return (
        <Box
          as="pre"
          mb={5}
          overflowX="auto" // Allow horizontal scrolling
          overflowY="hidden" // Hide vertical scrollbar if unnecessary
          whiteSpace="pre" // Prevent wrapping, maintaining the original format
        >
          {children}
        </Box>
      );
    },

    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <Box className="code-box" width="100%" overflowX="auto">
          <SyntaxHighlighter
            style={okaidia}
            language={match[1]}
            PreTag="div"
            customStyle={{ borderRadius: "0.375rem", marginTop: 0 }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </Box>
      ) : (
        <Box
          as="code"
          color={colorMode === "dark" ? "yellow.300" : "purple.500"}
          bg={colorMode === "dark" ? "gray.700" : "gray.100"}
          p={1}
          width={"100%"}
          overflowX="auto"
          borderRadius="md"
          {...props}
        >
          {children}
        </Box>
      );
    },
  };

  return { customMarkdownTheme };
};
