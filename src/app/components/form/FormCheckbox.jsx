"use client";

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

const FormCheckbox = ({
  id,
  label,
  name,
  register,
  rules = {},
  errors,
  checkLabel = "Include Emojis",
  defaultChecked = false,
  colorScheme = "blue",
}) => {
  return (
    <FormControl id={id} isInvalid={!!errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Checkbox
        id={id}
        {...register(name, rules)}
        defaultChecked={defaultChecked}
        colorScheme={colorScheme}
      >
        {checkLabel}
      </Checkbox>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormCheckbox;
