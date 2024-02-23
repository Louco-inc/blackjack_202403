import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type PropsType = {
  goNext: () => void;
  goBack: () => void;
};

export default function NickNameComponent(props: PropsType): JSX.Element {
  const { goNext, goBack } = props;
  const [nickNameValue, setNickNameValue] = useState<string>("");

  return (
    <>
      <div className="pt-8">
        <FormControl className="mt-4">
          <FormLabel>ニックネーム</FormLabel>
          <Input
            type="text"
            value={nickNameValue}
            onChange={(e) => setNickNameValue(e.target.value)}
          />
          <FormErrorMessage>ニックネームが入力されていません。</FormErrorMessage>
        </FormControl>
        <div>
          <Button
            className="mt-4"
            color="#ffffff"
            size="lg"
            variant="outline"
            onClick={goNext}
          >
            次へ
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
