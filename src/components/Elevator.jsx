import { useCallback, useEffect, useRef, useState } from "react";
import { Transition } from 'react-transition-group';
import ElevatorImg from "../elv.png"
// import { usePrevious } from "./hooks/usePrevious";

// function usePrevious(value, initial) {
//     const equals = (a, b) =>
//         a.length === b.length &&
//         a.every((v, i) => v === b[i]);
//     const ref = useRef({ target: value, previous: initial });
//     if (!equals(ref.current.target, value)) {
//         ref.current.previous = ref.current.target;
//         ref.current.target = value;
//     }
//     return ref.current.previous;
// }

const Elevator = ({ elevatorIndex, elevatorsQueues, elevatorDelay, elevatorSpeed, elevatorLocation, removeFromQueue, updateElevatorLocation }) => {
    const queue = elevatorsQueues[elevatorIndex]
    // const prevQueue = usePrevious(elevatorsQueues[elevatorIndex])

    // const [actions, setActions] = useState([]);

    // const [elevatorY, setElevatorY] = useState(elevatorLocation);

    // useEffect(() => {
    //     console.log(elevatorY);
    // }, [elevatorY])

    const currentDuration = 1000 * (Math.abs(queue[0] - elevatorLocation) / elevatorSpeed)

    const isQueue = queue[0] && !!queue[0].length
    const target = isQueue ? queue[0] * 110 : elevatorLocation * 110

    useEffect(() => {
        console.log('Queue', elevatorIndex, ":", queue);
        console.log('elevatorLocation', elevatorIndex, ":", elevatorLocation);
        if (queue.length) {
            // updateElevatorStatus()

            updateElevatorLocation(elevatorIndex, queue[0])
            removeFromQueue(elevatorIndex)
        }
    }, [elevatorsQueues])


    // const updateElevatorStatus = useCallback(async () => {
    //     await setTimeout(() => {
    //         updateElevatorLocation(elevatorIndex, queue[0])
    //     }, currentDuration);
    //     await setTimeout(() => {
    //         removeFromQueue(elevatorIndex)
    //     }, currentDuration + elevatorDelay);
    // }, [])

    //==============================================
    // const fetchData = useCallback(async () => {
    // 	let response = await db;
    // 	setBuildings(response);
    // }, []);
    // useEffect(() => {
    // 	fetchData();
    // }, [fetchData]);
    //=======================================

    // const addNewActions = () => {
    //     const origin = queue.length > 1 ? queue[queue.length - 2] : elevatorLocation
    //     const moveAction = {
    //         type: "move",
    //         origin,
    //         target: queue[queue.length - 1],
    //         isMoveUp: origin < queue[queue.length - 1],
    //     }
    //     const delayAction = {
    //         type: "delay",
    //         delay: elevatorDelay
    //     }
    //     setActions([...actions, moveAction, delayAction])
    // }

    // const removeAction = () => {
    //     const copy = [...actions]
    //     copy.shift()
    //     setActions(copy)
    // }

    // const updateActions = () => {
    //     // if (!prevQueue) return
    //     console.log('getting prev queue:', prevQueue);
    //     // if (prevQueue.length < queue.length)
    //     addNewActions()
    // }

    // useEffect(() => {
    //     console.log('actions', elevatorIndex, ":", actions);
    // }, [actions])


    // TODO: Call removeFromQueue after task complete and run next task



    // const [elevatorQueue, setElevatorQueue] = useState([])
    // useEffect(() => {
    //     setElevatorQueue([...elevatorQueue, newFloorId])
    //     const interval = setInterval(() => {
    //         const filteredQueue = [...elevatorQueue]
    //         filteredQueue.shift()
    //         setElevatorQueue(filteredQueue)
    //         console.log(elevatorQueue);
    //         removeFromMainQueue()
    //         if (elevatorQueue.length = 0) clearInterval(interval)
    //     }, 4000);
    // }, [newFloorId])






    const defaultStyle = {
        transition: `bottom ${currentDuration}ms ease`,
        bottom: elevatorLocation * 110
    };
    const transitionStyles = {
        entering: { bottom: elevatorLocation * 110 },
        entered: { bottom: elevatorLocation * 110 },
        exiting: { bottom: target },
        exited: { bottom: target }
    };

    const onEnteredHandle = () => {
        console.log('entered');
    }
    const onExitedHandle = () => {
        console.log('exited');
    }

    return <Transition
        timeout={currentDuration}
        // timeout={currentDuration + elevatorDelay}
        // timeout={{
        //     appear: 0,
        //     enter: 0,
        //     exit: currentDuration + elevatorDelay,
        //     // exit: currentDuration,
        // }}
        onEntered={console.log('entered')}
        onExited={console.log('exited')}
        in={isQueue}>
        {state => (
            <img
                onAnimationEnd={console.log('maaaaaaaaa')}
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
                onClick={() => {
                    updateElevatorLocation(elevatorIndex, queue[0])
                    removeFromQueue(elevatorIndex)
                }}
                className="elevator"
                // style={{
                //     "bottom": 0 + "px",
                //     "transform": "translateY(-" + elevatorY + "px)"
                // }}
                src={ElevatorImg} alt="" />
        )}
    </Transition >
}
export default Elevator