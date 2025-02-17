import React from "react";
import Select from "react-select";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorMode,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const FormSelect = ({
  id,
  label,
  name,
  control,
  errors,
  placeholder,
  options,
  optionLabel,
  optionValue,
  isSearchable = false,
  isClearable = true,
  onChangeCallback,
  multiple = false,
  required = false,
  externalValue,
  ...rest
}) => {
  const { colorMode } = useColorMode();

  const customStyles = {
    control: (base) => ({
      ...base,
      background: "transparent",
      border:
        colorMode === "light"
          ? "1px solid rgba(0, 0, 0, 0.5)"
          : "1px solid rgba(255,255,255, 0.5)",
      borderRadius: "6px",
      boxShadow: "none",
      "&:hover": {
        border:
          colorMode === "light"
            ? "1px solid rgba(0, 0, 0, 0.5)"
            : "1px solid rgba(255,255,255, 0.5)",
      },
      "&:focus": {
        border:
          colorMode === "light"
            ? "1px solid rgba(0, 0, 0, 0.5)"
            : "1px solid rgba(255,255,255, 0.5)",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      overflow: "hidden",
      padding: "0px",
      backgroundColor: "transparent",
      border:
        colorMode === "light"
          ? "1px solid rgba(0, 0, 0, 0.3)"
          : "1px solid rgba(255,255,255, 0.3)",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      backdropFilter: "blur(25px)",
    }),
    option: (base, state) => ({
      ...base,
      padding: "10px 21px",
      fontWeight: 600,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#a3cfff"
        : state.isFocused
        ? "#a3cfff"
        : "transparent",
      "&:active": {
        backgroundColor: "#a3cfff",
      },
      "&:hover": {
        backgroundColor: "#a3cfff",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6C757D",
    }),
    singleValue: (base) => ({
      ...base,
      margin: "0 2px 0 2px",
      color: colorMode === "dark" ? "white" : "black",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 8px",
      color: "white",
    }),
    inputContainer: (base) => ({
      ...base,
      margin: "2px",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  return (
    <FormControl id={id} isInvalid={!!errors[name]}>
      {label && (
        <FormLabel htmlFor={id} mb={1}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => {
          const selectedValue =
            externalValue || multiple
              ? value
              : value
              ? options?.find((option) => option[optionValue] === value)
              : null;

          return (
            <Select
              placeholder={placeholder}
              options={options}
              innerRef={ref}
              value={selectedValue || null}
              styles={customStyles}
              onChange={(val) => {
                const newValue = multiple ? val : val ? val[optionValue] : null;
                onChange(newValue);
                onChangeCallback?.(newValue);
              }}
              getOptionLabel={(option) => option[optionLabel]}
              getOptionValue={(option) => option[optionValue]}
              isSearchable={isSearchable}
              isClearable={isClearable}
              classNamePrefix="react-select"
              menuShouldScrollIntoView
              {...rest}
            />
          );
        }}
      />

      <FormErrorMessage>
        {errors[name] && errors[name]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;
