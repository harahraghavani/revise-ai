"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import FormInput from "../form/FromInput";
import { generateStreamedTextData } from "@/app/server/server";
import { readStreamableValue } from "ai/rsc";
import {
  ACCORDION,
  GEMINI_1_5_FLASH_LATEST,
  GEMINI_2_0_FLASH,
  GEMINI_2_0_FLASH_001,
} from "@/app/constant/appConstant";
import { getSystemInput } from "@/app/utility/utils/utils";

const PromptSection = () => {
  // react hook form
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const inputValue = watch("promptInput"); // Watching input value
  const isFormValid = inputValue;

  const buttons = watch("actionButtons");
  const activeBtnId = watch("activeBtnId");

  const handleGenerate = async (actionType) => {
    setValue("isLoading", true);
    setValue("isGenerating", true);
    setValue("activeBtnId", actionType);
    try {
      const { output } = await generateStreamedTextData({
        prompt: inputValue,
        model: GEMINI_2_0_FLASH,
        systemPrompt: getSystemInput({
          taskType: actionType,
          userText: inputValue,
        }),
      });

      let fullContent = "";

      setValue("isLoading", false);
      for await (const delta of readStreamableValue(output)) {
        fullContent += delta;
        setValue("responseMessage", fullContent);
      }
      setValue("isGenerating", false);
      setValue("isGenerated", true);
      setValue("activeBtnId", null);
    } catch (e) {
      setValue("isLoading", false);
      setValue("isGenerating", false);
      setValue("isGenerated", true);
      setValue("activeBtnId", null);
    }
  };

  return (
    <Box p={7} height="100%">
      <Box height="inherit">
        <Flex direction="column" px={3} gap={1}>
          {/* WRITE MESSAGE SECTION */}
          <Grid templateColumns={"repeat(12, 1fr)"}>
            <GridItem colSpan={12}>
              <FormInput
                name="promptInput"
                id="promptInput"
                register={register}
                errors={errors}
                rules={{}}
                label="Enter Your Message"
                placeHolderText="Please provide the message you would like me to rewrite, refine, or shorten."
                labelMargin={2}
                errorMsg={false}
                minHeight="110px"
                value={inputValue}
              />
            </GridItem>
          </Grid>
          {/* BUTTONS */}
          <Grid templateColumns={"repeat(12, 1fr)"} mt={4} gap={3}>
            {buttons?.map((e) => {
              const isClicked = activeBtnId === e?.id;
              return (
                <GridItem colSpan={{ base: 12, md: 6 }} key={e?.id}>
                  <Button
                    width="100%"
                    leftIcon={e?.icon}
                    loadingText={isClicked ? e?.loadingText : ""}
                    colorScheme={e?.colorScheme}
                    isLoading={isClicked} // Only the clicked button is loading
                    disabled={
                      isClicked || !isFormValid || watch("isGenerating")
                    } // Disable clicked button and others during loading
                    variant={e?.variant}
                    onClick={() => handleGenerate(e?.id)}
                  >
                    {e?.name}
                  </Button>
                </GridItem>
              );
            })}
          </Grid>
          {/* ACCORDION INFO SECTION */}
          <Card mt={6} p={4} borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">
              Action Descriptions
            </Text>
            <Accordion allowMultiple mt={2}>
              {ACCORDION.map((item) => {
                return (
                  <AccordionItem border="none" key={item.id}>
                    <Text as="h2">
                      <AccordionButton px={1}>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          {item?.question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </Text>
                    <AccordionPanel pb={4}>
                      {item?.answer?.trim()}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Card>
        </Flex>
      </Box>
    </Box>
  );
};

export default PromptSection;
