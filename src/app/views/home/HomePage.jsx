"use client";

import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import PromptSection from "@/app/components/Home/PromptSection";
import ResponseSection from "@/app/components/Home/ResponseSection";
import NavBar from "@/app/components/common/NavBar";
import { FaPen, FaCogs, FaCompress, FaListOl } from "react-icons/fa";

const HomePage = () => {
  const methods = useForm({
    defaultValues: {
      promptInput: null,
      isGenerating: false,
      responseMessage: null,
      isGenerated: false,
      isLoading: false,
      activeBtnId: null,
      actionButtons: [
        {
          id: "re-write",
          name: "Re-write",
          loadingText: "Generating...",
          icon: <FaPen />,
          colorScheme: "blue",
          variant: "solid",
        },
        {
          id: "refine",
          name: "Refine",
          loadingText: "Generating...",
          icon: <FaCogs />,
          colorScheme: "green",
          variant: "solid",
        },
        {
          id: "shorten",
          name: "Shorten",
          loadingText: "Generating...",
          icon: <FaCompress />,
          colorScheme: "purple",
          variant: "solid",
        },
        {
          id: "format-list",
          name: "Format List",
          loadingText: "Generating...",
          icon: <FaListOl />,
          colorScheme: "orange",
          variant: "solid",
        },
      ],
    },
  });

  return (
    <Box>
      <NavBar />
      <Box
        height={"calc(100vh - 80px)"}
        maxWidth={{
          base: "100%",
          md: "1800px",
        }}
        mx="auto"
      >
        <FormProvider {...methods}>
          <Grid templateColumns={"repeat(12, 1fr)"} height="100%">
            <GridItem
              colSpan={{
                base: 12,
                md: 5,
              }}
            >
              <PromptSection />
            </GridItem>
            <GridItem
              colSpan={{
                base: 12,
                md: 7,
              }}
            >
              <ResponseSection />
            </GridItem>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default HomePage;
