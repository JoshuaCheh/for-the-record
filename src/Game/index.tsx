import { Stack, Input, Button, Text, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Timer from "./Timer";
import { isFibonacci } from "./utiliy";

enum GameState {
  Start = "Start",
  GamePlay = "GamePlay",
  End = "End",
}

interface NumberCounter {
  number: number;
  frequency: number;
}

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [timeBetween, setTimeBetween] = useState(0);

  const [numberIsFib, setNumberIsFib] = useState(false);
  const [numberInput, setNumberInput] = useState("");

  const [numberFrequencyCounter, setNumberFrequencyCounter] = useState<
    NumberCounter[]
  >([]);

  const [displayedNumberFreq, setDisplayedNumberFreq] = useState<string>("");

  const onStart = useCallback(() => {
    setGameState(GameState.GamePlay);
  }, []);

  const onNumberEnter = useCallback(() => {
    const enteredNumber = Number(numberInput);

    const existingNumberCounter = numberFrequencyCounter.find(
      (counter) => counter.number === enteredNumber
    );
    let updatedList: NumberCounter[] = [];
    if (existingNumberCounter) {
      updatedList = numberFrequencyCounter.map((counter) => {
        if (counter.number === enteredNumber) {
          return { ...counter, frequency: counter.frequency + 1 };
        }
        return counter;
      });
    } else {
      updatedList = [
        ...numberFrequencyCounter,
        {
          number: enteredNumber,
          frequency: 1,
        },
      ];
    }

    setNumberIsFib(isFibonacci(enteredNumber));
    setNumberFrequencyCounter(updatedList);
    setNumberInput("");
  }, [numberFrequencyCounter, numberInput]);

  const updateDisplayedValues = useCallback(() => {
    const displayedString = numberFrequencyCounter
      .sort((a, b) => b.frequency - a.frequency)
      .reduce((acc, current, i) => {
        if (i === 0) {
          return `${acc}${current.number}: ${current.frequency}`;
        }
        return `${acc}, ${current.number}: ${current.frequency}`;
      }, "");

    setDisplayedNumberFreq(displayedString);
  }, [numberFrequencyCounter]);

  const onQuit = useCallback(() => {
    updateDisplayedValues();
    setGameState(GameState.End);
  }, [updateDisplayedValues]);

  return (
    <Stack direction={"column"} padding={"20"}>
      {gameState === GameState.Start ? (
        <>
          <Text size="s">
            Please input the amount of time in seconds between emitting numbers
            and their frequency
          </Text>
          <Input
            size="s"
            type="number"
            value={timeBetween}
            onChange={(event) => {
              const newValue = Number(event.target.value);
              if (!isNaN(newValue)) setTimeBetween(newValue);
            }}
          />
          <Button
            colorScheme="blue"
            isDisabled={timeBetween < 1}
            onClick={onStart}
          >
            Start
          </Button>
        </>
      ) : gameState === GameState.GamePlay ? (
        <>
          <Stack width={"full"}>
            <Timer
              initSeconds={timeBetween}
              updateDisplayedValues={updateDisplayedValues}
            />
            <Text>{displayedNumberFreq}</Text>
            <Text>{numberIsFib ? "FIB" : ""}</Text>
          </Stack>
          <Text size="s">
            {!numberFrequencyCounter.length
              ? "Please enter the first number"
              : "Please enter the next number"}
          </Text>
          <Flex alignItems={"center"}>
            <Input
              size="s"
              type="number"
              value={numberInput}
              onChange={(event) => {
                const newValue = event.target.value;
                setNumberInput(newValue);
              }}
            />
            <Button
              colorScheme="blue"
              isDisabled={
                !(!isNaN(Number(numberInput)) && Number(numberInput) >= 0) ||
                numberInput.trim() === ""
              }
              onClick={onNumberEnter}
            >
              Enter
            </Button>
          </Flex>

          <Flex
            width={"full"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Button colorScheme="red" onClick={onQuit}>
              QUIT
            </Button>
          </Flex>
        </>
      ) : gameState === GameState.End ? (
        <>
          <Text>{displayedNumberFreq}</Text>
          <Text>Thanks for playing</Text>
        </>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default Game;
