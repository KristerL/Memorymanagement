import React, {useEffect, useState} from "react";
import styled from "styled-components";

const RowContainer = styled.div`
    display:flex;
    align-items: center;
    h1{
        margin:0;
        margin-right:10px;
        width:60px;
        font-size:18px;
    }
`;

const Block = styled.div`
    width:20px;
    height:20px;
    border: 0.5px solid black;
`;

const MemoryContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:50px;
`;

const TextContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: start;
    font-size:18px;
`;

let colors = {
    "A": "green",
    B: "red",
    C: "orange",
    D: "blue",
    E: "yellow",
    F: "purple",
    G: "lightgreen",
    H: "brown",
    I: "cyan",
    J: "pink",
    R: "orangered",
    O: "orangered",
};
const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];


const Display = ({process, algorithm}) => {
    const [visualize, setVisualize] = useState();

    useEffect(() => {
        let memory = [];

        let pos = 0;
        let method = "Last-fit";
        process.split(";").forEach(el => {
            const subel = el.split(",");
            memory.push({
                time: subel[1],
                weight: subel[0],
                position: "",
                tag: alpha[pos],
            });
            pos++;
        });
        console.log(algorithm, "Last-fit", "Last-Fit" === algorithm)
        switch (algorithm) {
            case "Last-fit":
                method = lastFit;
                break;
            case "Best-fit":
                method = bestFit;
                break;
            case "Worst-fit":
                method = worstFit;
                break;
            case "First-fit":
                method = firstFit;
                break;
            case "Random-fit":
                method = randomFit;
                break;
        }

        runner(memory, method);
    }, [process, algorithm]);


    const firstFit = (hoidja, lisada) => {
        const options = getBlocks(hoidja, lisada.weight);
        return options.length !== 0 ? options.slice()[0].start : null;
    };

    const lastFit = (hoidja, lisada) => {
        const options = getBlocks(hoidja, lisada.weight);
        return options.slice().length > 0 ? options.shift().start : null;
    };

    const bestFit = (hoidja, lisada) => {
        const options = getBlocks(hoidja, lisada.weight);
        if (options.length === 0) return null;
        const smallest = options.reduce((prev, curr) => prev.length < curr.length ? prev : curr);
        return smallest.start;
    };

    const worstFit = (hoidja, lisada) => {
        const options = getBlocks(hoidja, lisada.weight);
        if (options.length === 0) return null;
        const smallest = options.reduce((prev, curr) => prev.length > curr.length ? curr : prev);
        return smallest.start;
    };

    const randomFit = (hoidja, lisada) => {
        const options = getBlocks(hoidja, lisada.weight);
        if (options.length === 0) return null;
        const rand = options[Math.floor(Math.random() * options.length)].start;
        return rand;
    };

    const runner = (järjend, method) => {
        let hoidja = new Array(50).fill('-');
        let running = [];
        let rows = [];

        for (let i = 0; i < 10; i++) {
            if (järjend.length > 0) {
                const lisada = järjend.shift();
                let koht = method(hoidja.slice(), lisada);
                if (koht == null) {
                    colors.E = "orangered";
                    rows.push(["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "E", "R", "R", "O", "R", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
                    break;
                }
                for (let j = 0; j < lisada.weight; j++) {
                    hoidja[koht + j] = lisada.tag;
                }
                running.push({...lisada, koht: koht});
                rows.push(hoidja.slice());
                running = decreaseTimes(running.slice());
                hoidja = validate(hoidja.slice(), running.slice());
            }
        }
        setVisualize(rows);
    };

    const decreaseTimes = (running) => {
        let runningCopy = running.slice(0);
        runningCopy.forEach(a => {
            a.time--;
        });
        return runningCopy;
        return runningCopy;
    };

    //currently no cleanup in running
    const validate = (hoidja, running) => {
        running.forEach(el => {
            if (el.time === 0) {
                hoidja = hoidja.map(item => item === el.tag ? "-" : item)
            }
        });
        return hoidja
    };

    const getBlocks = (hoidja, pikkus) => {
        let matches = [];
        let runningLength = 0;
        let running = false;
        let start = 0;
        for (let i = 0; i < hoidja.length; i++) {
            if (runningLength === parseInt(pikkus)) {
                matches.push({start: start, length: runningLength})
            }
            if (hoidja[i] === "-") {
                if (running === false) {
                    runningLength = 1;
                    running = true;
                    start = i;
                } else {
                    runningLength++;
                }
            } else {
                running = false;
                runningLength = 0;
            }
        }
        if (runningLength === parseInt(pikkus)) {
            matches.push({start: start, length: runningLength});
        }
        return matches;
    };

    return (
        <MemoryContainer>
            {visualize !== undefined ? visualize.map((row, id) => <RowContainer key={id}>
                <h1>{id} {alpha[id]}</h1> {row.map((el, id) => <Block style={{background: colors[el]}}
                                                                      key={id}>{el}</Block>)}</RowContainer>) : ""}
        </MemoryContainer>
    )
};

export default Display;