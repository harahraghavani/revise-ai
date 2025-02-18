"use client";
import { formateString } from "@/app/utility/utils/utils";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiMiniCheck } from "react-icons/hi2";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { useMarkdownTheme } from "@/app/hooks/markdownTheme/useMarkdownTheme";

const ResponseSection = () => {
  const { colorMode } = useColorMode();
  const { customMarkdownTheme } = useMarkdownTheme();
  // States
  const [isCopied, setIsCopied] = useState(false);
  const { watch, reset } = useFormContext();
  const isEmptyState = !watch("isGenerated") && !watch("isGenerating");
  const isLoading = watch("isLoading");

  const handleCopyToClipboard = () => {
    const text = watch("responseMessage")?.trim();
    if (text) {
      const plainText = formateString(text);
      navigator.clipboard.writeText(plainText).then(() => {
        setIsCopied(true);
        // Revert back to copy icon after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Box p={7}>
      <Box height="inherit">
        {isEmptyState && (
          <Center height="inherit" alignItems="baseline">
            <Card
              p={6}
              borderRadius="lg"
              textAlign="center"
              bg={colorMode === "light" ? "gray.100" : "gray.700"}
              width="100%"
            >
              <Flex direction="column" align="center" gap={3}>
                <Icon as={InfoOutlineIcon} boxSize={8} color="blue.500" />
                <Text fontSize="lg" fontWeight="bold">
                  Start by Entering a Message
                </Text>
                <Text fontSize="md">
                  Enter a message & AI will generate a refined version for you!
                </Text>
              </Flex>
            </Card>
          </Center>
        )}
        {!isEmptyState && isLoading ? (
          <Center height="inherit" alignItems="baseline">
            <Spinner />
          </Center>
        ) : (
          !isEmptyState && (
            <Center height="inherit" alignItems="baseline">
              <Card
                p={6}
                borderRadius="md"
                textAlign="center"
                bg={colorMode === "light" ? "gray.100" : "gray.700"}
                width="100%"
              >
                <Flex direction="column" align="center" gap={3} mb={3}>
                  <Text fontSize="md" textAlign="start">
                    <Markdown
                      components={customMarkdownTheme}
                      rehypePlugins={[[remarkGfm]]}
                    >
                      {watch("responseMessage")?.trim()}
                    </Markdown>
                  </Text>
                </Flex>
                {watch("isGenerated") && (
                  <Flex gap={3} alignItems="center">
                    <IconButton onClick={handleCopyToClipboard}>
                      {isCopied ? <HiMiniCheck /> : <MdOutlineContentCopy />}
                    </IconButton>
                    <Button
                      colorScheme="blue"
                      onClick={handleClear}
                      variant="outline"
                    >
                      Clear
                    </Button>
                  </Flex>
                )}
              </Card>
            </Center>
          )
        )}
      </Box>
    </Box>
  );
};

export default ResponseSection;
