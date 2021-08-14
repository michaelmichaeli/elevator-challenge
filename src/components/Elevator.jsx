import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ElevatorImg from "../elv.png"


const Elevator = ({ elevatorIndex, elevatorsQueues, elevatorDelay, elevatorSpeed, elevatorLocation, removeFromQueue, updateElevatorLocation }) => {

    const elevatorQueue = elevatorsQueues[elevatorIndex]
    const [travelDuration, setTravelDuration] = useState(null)
    const [isMoving,setIsmoving] = useState(false)
    useEffect(() => {
        if (!isMoving) {

            setTravelDuration(Math.abs(elevatorQueue[0] - elevatorLocation) / elevatorSpeed)
            console.log(travelDuration);
        }
    }, [elevatorsQueues])


    const nextFloor = elevatorQueue[0]


    console.log('elevatorIndex', elevatorIndex);
    console.log('travelDuration', travelDuration);
    console.log('nextFloor', nextFloor);
    console.log('elevatorLocation', elevatorLocation);

    const handleAnimationEnd = () => {
        console.log('END')
        setIsmoving(false)
        updateElevatorLocation(elevatorIndex)
        // Then -> makesound -> wait 2 sec ->
        // removeFromQueue(elevatorIndex)
    }
    const handleAnimationStart = () => {
        console.log('START')
        setIsmoving(true)
    }


    const elevate = (elevatorLocation, nextFloor) => keyframes`
    0% {
    transform: translateY(-${elevatorLocation}px);
    }
    100% {
    transform: translateY(-${nextFloor}px);
    }
    
`

    const ElevatorImgElement = styled.img`
    position: absolute;
	width: 110px;
    bottom: 0;
    transform: translateY(-${props => props.elevatorLocation}px);
    /* transform: translateY(-${elevatorLocation * 110}px); */
    animation: ${props => elevate(props.elevatorLocation, props.nextFloor)} ${props => props.travelDuration}s ease;
    `


    return <ElevatorImgElement
        src={ElevatorImg} alt=""
        travelDuration={travelDuration}
        nextFloor={nextFloor * 110}
        elevatorLocation={elevatorLocation * 110}
        onClick={() => {
            updateElevatorLocation(elevatorIndex)
            removeFromQueue(elevatorIndex)
        }}
        onAnimationEnd={handleAnimationEnd}
        onAnimationStart={handleAnimationStart}
    />

}
export default Elevator