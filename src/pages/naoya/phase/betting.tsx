import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type PropsType = {
  goNext: () => void;
  goBack: () => void;
};

export default function BettingComponent(props: PropsType): JSX.Element {
  const { goNext, goBack } = props;
  const [bettingValue, setBettingValue] = useState<number>(0);

  return (
    <>
      <div>
        <FormControl className="mt-4">
          <FormLabel>ベット数</FormLabel>
          <Input
            type="text"
            value={bettingValue}
            onChange={(e) => setBettingValue(Number(e.target.value ?? 0))}
          />
          <FormErrorMessage>
            ベット数が入力されていません。
          </FormErrorMessage>
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
