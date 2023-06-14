import React from "react";
import "./App.css";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import Game from "./Game";

const App = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="App-body">
          <Heading as="h3" size="lg">
            Number Frequency Game
          </Heading>
          <Game />
        </div>
      </div>
    </ChakraProvider>
  );
};

export default App;
