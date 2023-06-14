import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

interface Props {
  initSeconds: number;
  updateDisplayedValues: () => void;
}

const Timer = ({ initSeconds, updateDisplayedValues }: Props) => {
  const [seconds, setSeconds] = useState(initSeconds);
  const [pause, setPause] = useState(false);

  const onHaltOrResume = useCallback(() => {
    setPause((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setSeconds(initSeconds);
  }, [initSeconds]);

  const tick = useCallback(() => {
    if (pause) {
      return;
    }
    if (seconds === 0) {
      reset();
      updateDisplayedValues();
    } else {
      setSeconds((prev) => prev - 1);
    }
  }, [reset, pause, seconds, updateDisplayedValues]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  return (
    <Flex width={"full"} justifyContent={"space-around"}>
      <Text>{`${seconds} seconds`}</Text>{" "}
      <Button colorScheme={pause ? "green" : "orange"} onClick={onHaltOrResume}>
        {pause ? "Resume" : " Halt"}
      </Button>{" "}
    </Flex>
  );
};

export default Timer;
