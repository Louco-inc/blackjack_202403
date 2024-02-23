import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { InputStateType } from "../types";

type InputType = "string" | "number";

type PropsType = {
  label?: string;
  errorMessage?: string;
  confirmButtonLabel?: string;
  inputType: InputType;
  confirm: (inputValue: InputStateType) => void;
  goBack: () => void;
};

const createDefaultValue = (inputType: InputType): InputStateType => {
  if (inputType === "number") {
    return 0;
  } else if (inputType === "string") {
    return "";
  } else {
    return undefined;
  }
};

export default function BettingComponent({
  confirm,
  goBack,
  label,
  errorMessage,
  confirmButtonLabel,
  inputType,
}: PropsType): JSX.Element {
  const [value, setValue] = useState<InputStateType>(
    createDefaultValue(inputType)
  );

  return (
    <>
      <div className="pt-8">
        <FormControl className="mt-4">
          <FormLabel>{label}</FormLabel>
          <Input
            type="text"
            value={value}
            onChange={(e) => {
              if (inputType === "number") {
                setValue(Number(e.target.value ?? 0));
              } else if (inputType === "string") {
                setValue(e.target.value ?? "");
              } else {
                setValue(e.target.value);
              }
            }}
          />
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
        <div>
          <Button
            className="mt-4"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={() => confirm(value)}
          >
            {confirmButtonLabel}
          </Button>
        </div>
        <div>
          <Button
            className="mt-4"
            color="#ffffff"
            size="lg"
            variant="ghost"
            onClick={goBack}
          >
            戻る
          </Button>
        </div>
      </div>
    </>
  );
}
