import React, {useState} from "react"
import DataController from "./DataController";
import ButtonController from "./ButtonController";
import styled from "styled-components";
import Display from "./Display";

const ControllerContainer = styled.div`
    display:flex;
    justify-content:space-evenly
`;

const algorithms = ["Last-fit", "Best-fit", "Worst-fit", "Random-fit", "First-fit"];
const processes = {
    Esimene: "1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1",
    Teine: "1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7",
    Kolmas: "5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7",
    Neljas: "4,5;2,7;9,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2",
    Viies: "1,8;7,4;10,6;25,2;1,4;13,3;6,2;8,1;50,1"
};

const Container = () => {

    const [algorithm, setAlgorithm] = useState("Last-fit");
    const [process, setProcess] = useState(processes.Esimene);
    const [counter, setCounter] = useState(null);

    const alghorithmChangeHandler = (algorithmIn) => {
        if (algorithm === algorithmIn) {
            setAlgorithm("Last-fit");
        } else {
            setAlgorithm(algorithmIn);

        }
    };

    const processChangeHandler = (process) => {
        setProcess(process);
    };

    const resetFields = () => {
        setAlgorithm("Last-fit");
        setProcess("1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1");
    };
    return (
        <div>
            <h1>Graafilise kasutajaliidesega simulaator protsessoriaja planeerimise algoritmide töö
                visualiseerimiseks</h1>
            <ControllerContainer>
                <DataController processes={processes} processHandler={processChangeHandler} selected={process}/>
                <ButtonController algorithms={algorithms} algorithmHandler={alghorithmChangeHandler}
                                  reset={resetFields}/>
            </ControllerContainer>
            <Display process={process} algorithm={algorithm}/>
        </div>
    )
};

export default Container;