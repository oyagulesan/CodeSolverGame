import { useContext } from 'react';
import { Context as AppContext } from '../context/AppContext';

const useSetNumber = () => {
    const { setNumber } = useContext(AppContext);

    const setRandomNumber = () => {
        let arrNumbers = [0,1,2,3,4,5,6,7,8,9];
        let ind = Math.floor(8 * Math.random());
        let number = arrNumbers[ind + 1] * 1000;
        arrNumbers.splice(ind + 1,1);
        ind = Math.floor(8 * Math.random());
        number = number + arrNumbers[ind] * 100;
        arrNumbers.splice(ind,1);
        ind = Math.floor(7 * Math.random());
        number = number + arrNumbers[ind] * 10;
        arrNumbers.splice(ind,1);
        ind = Math.floor(6 * Math.random());
        number = number + arrNumbers[ind];
        setNumber(number);
    }

    return [setRandomNumber];
}

export default useSetNumber;