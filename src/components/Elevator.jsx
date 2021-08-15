import { useEffect } from "react";
import styled from "styled-components";
import ElevatorImg from "../elv.png"
import useCountDown from "../hooks/useCountDown";
import useSound from 'use-sound';

import DingSfx from '../ding.mp3'

const Elevator = ({
    elevatorIndex,
    elevatorsQueues,
    elevatorDelay,
    elevatorSpeed,
    elevatorLocation,
    removeFromQueue,
    updateElevatorLocation }) => {

    const [play] = useSound(DingSfx);

    const elevatorQueue = elevatorsQueues[elevatorIndex]
    let nextFloor = elevatorQueue[0] || null
    let travelDuration = (Math.abs(elevatorQueue[0] - elevatorLocation) / elevatorSpeed) || null

    const [timeLeft, { start }] = useCountDown(elevatorDelay, 100);
    useEffect(() => {
        if (timeLeft > 0 && timeLeft <= 100) {
            removeFromQueue(elevatorIndex)
        }
    }, [timeLeft])

    const handleAnimationEnd = () => {
        // Then -> makesound -> 
        console.log('SOUND!!!!');
        play()
        // Then -> wait 2 sec ->
        start(elevatorDelay * 1000)
        updateElevatorLocation(elevatorIndex)
    }

    const forcedLocation = nextFloor ? nextFloor : elevatorLocation

    return <ElevatorImgElement
        src={ElevatorImg} alt=""
        travelDuration={travelDuration}
        forcedLocation={forcedLocation * 110}
        elevatorLocation={elevatorLocation * 110}
        nextFloor={nextFloor * 110}
        elevatorDelay={elevatorDelay}
        onClick={() => {
            updateElevatorLocation(elevatorIndex)
            removeFromQueue(elevatorIndex)
        }}
        onTransitionEnd={() => handleAnimationEnd()}
    />
}
export default Elevator

const ElevatorImgElement = styled.img`
                position: absolute;
                width: 110px;
                bottom: 0;
                transform: translateY(-${props => props.forcedLocation}px);
                transition: transform ${props => props.travelDuration}s ease;
                `