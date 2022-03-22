import React, {useContext, useEffect} from 'react';
import {Context as AppContext} from '../context/AppContext';
import useSetNumber from '../hooks/holdNumber';
import Button from 'react-bootstrap/Button'
import GameComponent from './GameComponent';

const HelloComponent = (props) => {
    const { setGameOn, state: { gameOn, numberToBeGuessed, initialMessage, description1, description2, description3, description4 }} = useContext(AppContext);
    const [setRandomNumber] = useSetNumber();
    function setNumberLocal() {
        setRandomNumber();
    }
    useEffect(() => {
        setNumberLocal();
    }, []);

    function startGame() {
        setGameOn(true);
        setNumberLocal();
    }

    return !gameOn.val ? <div>
            <div  className="cardStyle">
                <p>{description1}</p>
                <p>{description2}</p>
                <p>{description3}</p>
                <p>{description4}</p>
            </div>
            <Button className="buttonStyle" onClick={startGame}>Start Game</Button>
        </div>
        :
        <GameComponent />
} 
export default HelloComponent;