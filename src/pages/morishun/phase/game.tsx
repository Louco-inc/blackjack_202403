import { PlayerType } from "@/types";
import { 
  Button,
  HStack,
  Text,
} from '@chakra-ui/react'

type PropsType = {
  playerData: PlayerType;
  bettingPoint: number;
  betDoublePoint: () => void;
  openTop: () => void;
  onRetry: () => void;
  onFinishedGame: (point: number) => void;
};

export default function GameComponent(props: PropsType): JSX.Element {
  return (
    <>
      <div className="h-full relative text-white">
        <div className="absolute top-0 right-0">
          <div>ポイント</div>
        </div>
        <div className="grid justify-items-center h-2/6">
          <div>ディーラー</div>
        </div>
        <div className="grid justify-items-center h-3/6">
          <div>手札</div>
        </div>
        <div className="grid justify-items-center h-1/6">
          <HStack className="w-4/5">
            <Button 
              className="w-1/4 mx-1"
              colorScheme='white' 
              variant='outline'
              size="lg"
            >
              <Text>ヒット</Text>
            </Button>
            <Button 
              className="w-1/4 mx-1"
              colorScheme='white' 
              variant='outline'
              size="lg"
            >
              <Text>ダブル</Text>
            </Button>
            <Button 
              className="w-1/4 mx-1"
              colorScheme='white' 
              variant='outline'
              size="lg"
            >
              <Text>スタンド</Text>
            </Button>
            <Button 
              className="w-1/4 mx-1"
              colorScheme='white' 
              variant='outline'
              size="lg"
            >
              <Text>サレンダー</Text>
            </Button>
          </HStack>
        </div>
      </div>
    </>
  );
}
