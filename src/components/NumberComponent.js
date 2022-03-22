import React from 'react'
import { useDrag } from 'react-dnd'

const NumberComponent = ({ number, arr }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'number',
        item: { number },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return arr.find(item => item === number) === undefined ?
        <div className="numberStyle" draggable ref={dragRef}>{number}</div>
        : <div className="numberStyle"></div>
}

export default NumberComponent;