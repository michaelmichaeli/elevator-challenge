import { useEffect } from "react"
import useCountDown from "../hooks/useCountDown";

const Floor = ({
    floorIndex,
    addToQueue,
    elevatorsQueues,
    floorTime }) => {
    
    const isPressed = elevatorsQueues.flat().findIndex(floor => floor === floorIndex) > -1

    const [timeLeft, { start }] = useCountDown(floorTime, 100);
    useEffect(() => {
        start(floorTime * 1000)
    }, [floorTime])

    return <div className="floor floor-size">
        <div className="blackline"></div>

        <button
            className={`controller metal linear ${isPressed ? "active" : ""}`}
            onClick={() => {
                addToQueue(floorIndex)
            }}
        >
            {floorIndex}
        </button>

        {timeLeft && <p>{(timeLeft / 1000).toFixed(1)}</p>}

    </div >
}
export default Floor