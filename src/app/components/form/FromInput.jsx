"use client";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputRightElement,
  Box,
  IconButton,
  InputGroup,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

const FormInput = ({
  id,
  label,
  name,
  rules,
  register,
  type = "text",
  errors,
  placeHolderText = "",
  onChangeCallBack,
  sendOnClick,
  isLoading,
  btnDisabled,
  labelMargin = "auto",
  rightIcon = false,
  showErrorBorder = false,
  errorMsg = true,
  minHeight = "45px",
  value = "",
}) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  const { colorMode } = useColorMode();
  const { ref: inputRef, onChange, ...rest } = register(name, rules);

  const handleChange = (e) => {
    setContent(e.target.value);
    if (onChangeCallBack) {
      onChangeCallBack(e);
    }
    onChange(e);
  };

  // Auto-grow Textarea height based on input content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [content]);

  return (
    <FormControl
      id={id}
      isInvalid={!!errors[name] || showErrorBorder}
      width={"100%"}
    >
      <FormLabel htmlFor={id} marginBottom={labelMargin} fontSize="xl">
        {label}
      </FormLabel>
      <InputGroup>
        <Textarea
          ref={(e) => {
            textareaRef.current = e;
            inputRef(e);
          }}
          value={value || ""}
          width="100%"
          minW={"100%"}
          type={type}
          resize={"none"}
          height={minHeight}
          minHeight={minHeight}
          maxHeight={"170px"}
          onChange={handleChange}
          autoComplete="off"
          isInvalid={showErrorBorder || !!errors[name]}
          placeholder={placeHolderText}
          boxShadow="inner"
          padding={"10px 55px 10px 15px"}
          border={
            showErrorBorder
              ? "1px solid red"
              : colorMode === "light"
              ? "1px solid rgba(0, 0, 0, 0.2)"
              : "1px solid rgba(255,255,255, 0.2)"
          }
          _placeholder={{
            color:
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.4)"
                : "rgba(255,255,255, 0.5)",
          }}
          sx={{
            "&:hover": {
              boxShadow: "none",
              border:
                colorMode === "light"
                  ? "1px solid rgba(0, 0, 0, 0.2)"
                  : "1px solid rgba(255,255,255, 0.2)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
              border:
                colorMode === "light"
                  ? "1px solid rgba(0, 0, 0, 0.2)"
                  : "1px solid rgba(255,255,255, 0.2)",
            },
            "&::-webkit-scrollbar": {
              width: "4px",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "7px",
              borderRadius: "7px",
              margin: "7px 0 7px 0",
            },
            "&::-webkit-scrollbar-thumb": {
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
            },
            border:
              colorMode === "light"
                ? "1px solid rgba(0, 0, 0, 0.5)"
                : "1px solid rgba(255, 255, 255, 0.5)",
            _hover: {
              border: showErrorBorder
                ? "1px solid red"
                : colorMode === "light"
                ? "1px solid rgba(0, 0, 0, 0.4)"
                : "1px solid rgba(255,255,255, 0.4)",
            },
            _focus: {
              outline: "none",
              border: showErrorBorder
                ? "1px solid red"
                : colorMode === "light"
                ? "1px solid rgba(0, 0, 0, 0.4)"
                : "1px solid rgba(255,255,255, 0.4)",
              boxShadow: showErrorBorder ? "0 0 0 1px red" : "none",
            },
          }}
          _invalid={{
            borderColor: "red",
          }}
          rounded={"md"}
          {...rest}
        />
        {rightIcon && (
          <InputRightElement width="4.5rem" height={"100%"} cursor={"pointer"}>
            <IconButton
              h="100%"
              size="lg"
              onClick={() => {
                sendOnClick();
                setContent("");
              }}
              icon={<FiSend />}
              bgColor={"transparent"}
              _hover={{ bgColor: "transparent" }}
              isLoading={isLoading}
              isDisabled={btnDisabled}
              _focusVisible={{ outline: "none" }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {errorMsg && (
        <Box maxW={"330px"}>
          <FormErrorMessage>
            {errors[name] && errors[name]?.message}
          </FormErrorMessage>
        </Box>
      )}
    </FormControl>
  );
};

export default FormInput;
