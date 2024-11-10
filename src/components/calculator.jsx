import { useState } from "react";
import styles from './calculator.module.css';
import Button from "./Button";
import axios from 'axios';

const Calculator = () =>{

    const [input, setInput] = useState('0');

    const getDisplay = () => {
        const sections = input.split(/[\+\-\*\/]/);
        if(sections[sections.length - 1] === ''){
            sections.pop();
        }

        return sections[sections.length - 1]
    };

    const handleNumberClick = (char) =>{
        if(input !== "0" || char === '.'){
            setInput(`${input}${char}`);
        }else{
            setInput(char);
        }
    };

    const handleOperationsClick = (operation) => {
        const sections = input.split(/([\+\-\*\/])/);
        const lastElement = sections[sections.length - 1];
        
        // If the last element is an operator, replace it with the new operator
        if ('+-*/'.includes(lastElement)) {
            const inputRemovedLast = sections.slice(0, -1).join('');
            setInput(`${inputRemovedLast}${operation}`);
        } else {
            // Evaluate the current expression
            handleEquals();
            // Append the new operator to the result
            setInput((prevInput) => `${prevInput}${operation}`);
        }
    };

    const handleEquals = async () => {
        const isNum = (str) => {
            return str !== '' && !isNaN(str) && !isNaN(parseFloat(str));
        }
    
        const sections = input.split(/([\+\-\*\/])/); // Split and keep the operators
    
        // Check if we have at least one operator and two numbers
        if (sections.length >= 3) {

            //IMPLEMENTING AXIOS HERE 

            const operand1 = parseFloat(sections[0]);
            const operator = sections[1];
            const operand2 = parseFloat(sections[2]);

            try {
                let response;

                switch(operator){
                    case '+':
                        response = await axios.post("http://localhost:3001/add",{
                            operand1: operand1,
                            operand2: operand2
                        });
                        break;
                    case '-':
                        response = await axios.post("http://localhost:3001/subtract",{
                            operand1, operand2
                        });
                        break;
                    case '/':
                        if(operand2 === 0){
                            setInput("Divide by zero");
                            return;
                        }
                        response = await axios.post("http://localhost:3001/divide",{
                            operand1, operand2
                        });
                        break;
                    case '*':
                        response = await axios.post("http://localhost:3001/multiply",{
                            operand1, operand2
                        });
                        break;
                    default:
                        throw new Error("Invalid operator")
                }

                if(response.data.success){
                    setInput(`${response.data.result}`);
                }
                else{
                    setInput(`Error: ${response.data.message}`);
                }
            } catch (error) {
                console.log("Error evaluation expression", error);
                setInput('Error');
            }
        }
    };

    const handleClear = () =>{
        setInput('0');
    };

    return(
        <div className={styles.container}>
            <div className={styles.calculator}>
                <div className={styles.answerSection}>
                <h1 className={styles.answer}>{getDisplay()}</h1>
                </div>
                <div className={styles.buttonSection}>
                    <div className={styles.buttonRow}>
                        <Button shape={'long'} color={'grey'} text={'AC'} handleClick={handleClear}/>
                        <Button shape={'circle'} color={'orange'} text={'/'} handleClick = {(operation)=> handleOperationsClick('/')}/>
                        
                    </div>
                    <div className={styles.buttonRow}>
                        <Button shape={'circle'} color={'black'} text={'7'} handleClick = {(char)=> handleNumberClick('7')}/>
                        <Button shape={'circle'} color={'black'} text={'8'}handleClick = {(char)=> handleNumberClick('8')}/>
                        <Button shape={'circle'} color={'black'} text={'9'}handleClick = {(char)=> handleNumberClick('9')}/>
                        <Button shape={'circle'} color={'orange'} text={'*'}handleClick = {(operation)=> handleOperationsClick('*')}/>
                    </div>
                    <div className={styles.buttonRow}>
                        <Button shape={'circle'} color={'black'} text={'4'}handleClick = {(char)=> handleNumberClick('4')}/>
                        <Button shape={'circle'} color={'black'} text={'5'}handleClick = {(char)=> handleNumberClick('5')}/>
                        <Button shape={'circle'} color={'black'} text={'6'}handleClick = {(char)=> handleNumberClick('6')}/>
                        <Button shape={'circle'} color={'orange'} text={'-'} handleClick = {(operation)=> handleOperationsClick('-')}/>
                    </div>
                    <div className={styles.buttonRow}>
                        <Button shape={'circle'} color={'black'} text={'1'}handleClick = {(char)=> handleNumberClick('1')}/>
                        <Button shape={'circle'} color={'black'} text={'2'}handleClick = {(char)=> handleNumberClick('2')}/>
                        <Button shape={'circle'} color={'black'} text={'3'}handleClick = {(char)=> handleNumberClick('3')}/>
                        <Button shape={'circle'} color={'orange'} text={'+'} handleClick = {(operation)=> handleOperationsClick('+')}/>
                    </div>
                    <div className={styles.buttonRow}>
                        <Button shape={'rectangle'} text={'0'} handleClick={(char) => handleNumberClick('0')}/>
                        <Button shape={'circle'} color={'black'} text={'.'} handleClick = {(char)=> handleNumberClick('.')}/>
                        <Button shape={'circle'} color={'orange'} text={'='} handleClick = {handleEquals}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;