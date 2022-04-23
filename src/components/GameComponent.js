import React, {useContext, useState, useEffect} from 'react';
import {Context as AppContext} from '../context/AppContext';
import Button from 'react-bootstrap/Button'
import { useDrop } from 'react-dnd'
import NumberComponent from './NumberComponent';
import congratsGif from "../assets/images/congrats.gif";

const GameComponent = (props) => {
    const { setGameOn, setGuesses, setIterations, state: {guesses, iterations, numberToBeGuessed }} = useContext(AppContext);
    const [showNumber, setShowNumber] = useState(false);
    const [err, setErr] = useState(null);
    const [numArr, setNumArr] = useState([null, null, null, null]);
    const [success, setSuccess] = useState(false);
    const numberArray = Array.from(Array(10), (_, i) => i + '');
    useEffect(() => {
        setIterations(0);
        setGuesses([]);
    }, []);
    const [{ isOver1 }, dropRef1] = useDrop({
        accept: 'number',
        drop: (item) => {
            const tmpArr = [...numArr];            
            tmpArr[0] = item.number;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));    
        },
        collect: (monitor) => ({
            isOver1: monitor.isOver()
        })
    })

    const [{ isOver2 }, dropRef2] = useDrop({
        accept: 'number',
        drop: (item) => {
            const tmpArr = [...numArr];            
            tmpArr[1] = item.number;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        },
        collect: (monitor) => ({
            isOver2: monitor.isOver()
        })
    })

    const [{ isOver3 }, dropRef3] = useDrop({
        accept: 'number',
        drop: (item) => {
            const tmpArr = [...numArr];            
            tmpArr[2] = item.number;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        },
        collect: (monitor) => ({
            isOver3: monitor.isOver()
        })
    })

    const [{ isOver4 }, dropRef4] = useDrop({
        accept: 'number',
        drop: (item) => {
            const tmpArr = [...numArr];            
            tmpArr[3] = item.number;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        },
        collect: (monitor) => ({
            isOver4: monitor.isOver()
        })
    })

    const onClick1 = () => {
        if (numArr[0] !== null) {
            const tmpArr = [...numArr];            
            tmpArr[0] = null;
            setNumArr(tmpArr);            
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        }
    }
    const onClick2 = () => {
        if (numArr[1] !== null) {
            const tmpArr = [...numArr];            
            tmpArr[1] = null;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        }
    }    
    const onClick3 = () => {
        if (numArr[2] !== null) {
            const tmpArr = [...numArr];            
            tmpArr[2] = null;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        }
    }
    const onClick4 = () => {
        if (numArr[3] !== null) {
            const tmpArr = [...numArr];            
            tmpArr[3] = null;
            setNumArr(tmpArr);
            // setNumber((tmpArr[0] || 0) * 1000 + (tmpArr[1] || 0) * 100 + (tmpArr[2] || 0) * 10 + (tmpArr[3] || 0));
        }
    }
    function incrementIterations() {
        setIterations(iterations.val + 1);
    }
    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function makeGuess() {
        if (numArr.findIndex( item => item === null) > -1) {
            setErr('Please input a 4 digit number ' + numArr.join(''));
        } else {
            setErr(null);
            incrementIterations();
            let result = '';
            for (let i = 0; i < 4; i++) {    
                const idx = numberToBeGuessed.val.toString().indexOf(numArr[i]);
                if (idx === i) {
                    result = '+' + result;
                } else if (idx > -1) {
                    result = result + '-';
                }
            }
            const newGuess = {guess: numArr.join(''), result};
            if (result === '++++') {
                setSuccess(true);
            }
            setGuesses(guesses.val.concat(newGuess));
        }
    }

    function endGame() {
        setGameOn(false);
    }

    function toggleShowNumber() {
        setShowNumber(showNumber ? false : true);
    }

    return <div>
        <p className="cardStyle">Game Started</p>
        <div>
            {guesses.val.map((item, index) => {
                return <div key={index}>
                    <p>{index + 1 + ' Guess: ' + item.guess + ' - Result: ' + item.result}</p>
                    </div>
            })}
            {!success ?
            <div>
                <div className="numberContainer">
                    {numberArray.map(num => <NumberComponent arr={numArr} key={num} number={num} />)}
                </div>
                <div style={{display: 'flex', flexDirection:'row', flex: 1, justifyContent: 'center'}}>
                    <div className={isOver1 ? "toBeSelected" : "inputArea"} ref={dropRef1} onClick={onClick1}>
                        <div className={"centerStyle"}>{numArr && numArr[0] !== null ? numArr[0] : ''}</div>
                    </div>
                    <div className={isOver2 ? "toBeSelected" : "inputArea"} ref={dropRef2} onClick={onClick2}>
                        <div className={"centerStyle"}>{numArr && numArr[1] !== null ? numArr[1] : ''}</div>
                    </div>
                    <div className={isOver3 ? "toBeSelected" : "inputArea"} ref={dropRef3} onClick={onClick3}>
                        <div className={"centerStyle"}>{numArr && numArr[2] !== null ? numArr[2] : ''}</div>
                    </div>
                    <div className={isOver4 ? "toBeSelected" : "inputArea"} ref={dropRef4} onClick={onClick4}>
                        <div className={"centerStyle"}>{numArr && numArr[3] !== null ? numArr[3] : ''}</div>
                    </div>
                </div>                
                <Button className="buttonStyle" onClick={makeGuess}>Guess</Button>
            </div>
            :
            <div>
                <img src={congratsGif} alt="wait until the page loads" />
                <p>{'You have found the number in ' + iterations.val + ' iterations'}</p>
            </div>
            }

            {err && !success ? <p className="errorStyle">{err}</p> : null}
            {!success ? <Button className="buttonStyle" onClick={toggleShowNumber}>{showNumber ? 'Hide Number' : 'Show Number'}</Button> : null }
            {showNumber && !success ? <p>{numberToBeGuessed.val}</p> : null}
        </div>
        <div>
            <Button className="buttonStyle" onClick={endGame}>End Game</Button>
        </div>
    </div>
} 
export default GameComponent;