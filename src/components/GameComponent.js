import React, {useContext, useState, useEffect} from 'react';
import {Context as AppContext} from '../context/AppContext';
import Button from 'react-bootstrap/Button'
import NumericInput from 'react-numeric-input';

const GameComponent = (props) => {
    const { setGameOn, setGuesses, setIterations, state: {guesses, iterations, gameOn, numberToBeGuessed, initialMessage, description1, description2, description3, description4 }} = useContext(AppContext);
    const [showNumber, setShowNumber] = useState(false);
    const [err, setErr] = useState(null);
    const [number, setNumber] = useState(0);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        setIterations(0);
        setGuesses([]);
    }, []);

    function incrementIterations() {
        setIterations(iterations.val + 1);
    }
    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function makeGuess() {
        if ((number + '').length != 4) {
            setErr('Please input a 4 digit number without repeating digits ' + number);
        } else {
            const str = number + '';
            let charArr = [...str];
            charArr = charArr.filter(unique);
            if (charArr.length < 4) {
                setErr('Please make sure there are no repeating digits');
            } else {
                setErr(null);
                incrementIterations();
                let result = '';
                for (let i = 0; i < 4; i++) {    
                    console.log('.....numberToBeGuessed...', numberToBeGuessed.val, numberToBeGuessed.val.toString());
                    const idx = numberToBeGuessed.val.toString().indexOf(number.toString().charAt(i));
                    if (idx == i) {
                        result = '+' + result;
                    } else if (idx > -1) {
                        result = result + '-';
                    }
                }
                console.log('....result...' + result);
                const newGuess = {guess: number, result};
                if (result == '++++') {
                    setSuccess(true);
                }
                setGuesses(guesses.val.concat(newGuess));
            }
        }
    }

    function endGame() {
        setGameOn(false);
    }

    function toggleShowNumber() {
        setShowNumber(showNumber ? false : true);
    }

    return <div>
        <hr></hr>
        <p>Game Started</p>
        <div>
        {guesses.val.map((item, index) => {
            return <div key={index}>
                <p>{index + 1 + ' Guess: ' + item.guess + ' - Result: ' + item.result}</p>
                </div>
        })}
        {!success ?
        <div>
            <NumericInput min={0} max={9876} className="form-control" onChange={val => setNumber(val)}/>
            <Button style={{height: 40, width: 80, color: 'black', alignContent: 'center'}} onClick={makeGuess}>Guess</Button>
        </div>
        :
        <p>{'You have found the number in ' + iterations.val + ' iterations'}</p>
        }

        {err && !success ? <p>{err}</p> : null}
        {!success ? <Button style={{height: 40, width: 80, color: 'black', alignContent: 'center'}} onClick={toggleShowNumber}>{showNumber ? 'Hide Number' : 'Show Number'}</Button> : null }
        {showNumber && !success ? <p>{numberToBeGuessed.val}</p> : null}
        </div>
        <div>
        <Button style={{height: 40, width: 80, color: 'black', alignContent: 'center'}} onClick={endGame}>End Game</Button>
        </div>
    </div>
} 
export default GameComponent;