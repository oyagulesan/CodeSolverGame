import createDataContext from './createDataContext';

const appReducer = (state, action) => {
    switch (action.type) {
        case 'throwError':
        case 'setInfo':
            return { ...state, info: {
                message: action.payload.message,
            }}
        case 'setNumber':
            return {...state,
                numberToBeGuessed: action.payload}
        case 'setGameOn':
            return {...state,
                gameOn: action.payload}
        case 'setGuesses':
            return {...state,
                guesses: action.payload}
        case 'setIterations':
            return {...state,
                iterations: action.payload}
        default:
            return state;
    }
};

const throwError = dispatch => (message) => {
    dispatch({type: 'throwError', payload: {message}});
};

const setInfo = dispatch => (message) => {
    dispatch({type: 'setInfo', payload: {message}});
};

const setNumber = dispatch => (val) => {
    dispatch({type: 'setNumber', payload: {val}});
};

const setGameOn = dispatch => (val) => {
    dispatch({type: 'setGameOn', payload: {val}});
};

const setGuesses = dispatch => (val) => {
    dispatch({type: 'setGuesses', payload: {val}});
};

const setIterations = dispatch => (val) => {
    dispatch({type: 'setIterations', payload: {val}});
};

export const { Context, Provider } = createDataContext(
    appReducer,
    { throwError, setInfo, setNumber, setGameOn, setGuesses, setIterations },
    {    
        initialMessage: 'Hello to the code solver game',
        description1: 'You will need to guess a 4 digits number.',
        description2: 'Numbers are not repeating and cannot start with 0.',
        description3: '"+" sign means a digit at its place while "-" ',
        description4: 'means a digit exists in the number but it is not at its exact place.',
        numberToBeGuessed: 1234,   
        info: {
            message: ''
        },
        gameOn: false,
        guesses: {val: []},
        iterations: 0
     }
);
