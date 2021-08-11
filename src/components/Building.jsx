import { useEffect, useState } from 'react'
import Elevator from './Elevator'
import Floor from './Floor'

const Building = ({ floorsCount, elevatorsCount, elevatorDelay, elevatorSpeed }) => {
    const floors = [...Array(floorsCount).fill(null)]
    const [elevatorsQueues, setElevatorsQueues] = useState(Array.from(Array(elevatorsCount), () => new Array(0)))
    const [elevatorsLocations, setElevatorsLocations] = useState([...Array(elevatorsCount).fill(0)])

    useEffect(() => {
        // console.log('elevatorsQueues:', elevatorsQueues);
        // console.log('elevatorsLocations:', elevatorsLocations);
    }, [elevatorsQueues, elevatorsLocations])

    // Succsessfully adding to queue after choose the correct elevator to add floorId to its correct queue
    const addToQueue = (floorId) => {
        let correctElevatorIndex = chooseCorrectElevatorIndex(floorId)

        // If floor already in one of the queues -> do nothing
        if (elevatorsQueues.flat().findIndex(floor => floor === floorId) > -1) return

        // Update state
        const copy = [...elevatorsQueues]
        copy[correctElevatorIndex].push(floorId)
        setElevatorsQueues(copy)
    }

    // Succsessfully removing oldest task from relevant queue using elevator index
    const removeFromQueue = (elevatorIndex) => {
        // If elevator queue is empty -> do nothing
        if (!elevatorsQueues[elevatorIndex].length) return

        // Update state - assuming removing first item in queue
        const copy = [...elevatorsQueues]
        copy[elevatorIndex].shift()
        setElevatorsQueues(copy)
    }

    const updateElevatorLocation = (elevatorIndex, location) => {
        // If elevator queue is empty -> do nothing
        if (!elevatorsQueues[elevatorIndex].length) return
        const copy = [...elevatorsLocations]
        copy[elevatorIndex] = elevatorsQueues[elevatorIndex][0]
        // copy[elevatorIndex] = location
        setElevatorsLocations(copy)
    }

    const chooseCorrectElevatorIndex = (floorId) => {
        const elevatorsTimes = [...Array(elevatorsCount).fill(Infinity)]
        elevatorsQueues.forEach((queue, i) => {
            let time
            if (!queue.length) {
                time = Math.abs(floorId - elevatorsLocations[i]) / elevatorSpeed
            }
            else {
                const sumOfFloorsToTravel = queue.reduce((acc, floor, i, queue) => {
                    acc = (i > 0) ? acc + Math.abs(queue[i] - queue[i - 1]) : acc + 0
                    return acc
                })
                time = sumOfFloorsToTravel / elevatorSpeed + elevatorDelay * (queue.length) + Math.abs(floorId - queue[queue.length - 1]) / elevatorSpeed
            }
            elevatorsTimes[i] = time
        })
        // console.log('elevatorsTimes', elevatorsTimes);
        return elevatorsTimes.indexOf(Math.min(...elevatorsTimes));
    }

    return <div className="building">
        <div className="floors">
            {floors.map((floor, i, floors) => (
                <div
                    className="floor" key={i}>
                    <Floor
                        addToQueue={addToQueue}
                        floorId={floors.length - i - 1}
                        elevators={elevatorsQueues}
                    />
                </div>)
            )}
        </div>
        <div className="shafts">
            {elevatorsQueues.map((elevatorQueue, i) => (
                <div
                    style={{ "height": 110 * floorsCount + 8 + "px" }}
                    className="shaft"
                    key={i}
                >
                    <Elevator
                        elevatorIndex={i}
                        elevatorsQueues={elevatorsQueues}
                        // elevatorQueue={elevatorQueue}
                        elevatorSpeed={elevatorSpeed}
                        elevatorDelay={elevatorDelay}
                        elevatorLocation={elevatorsLocations[i]}
                        removeFromQueue={removeFromQueue}
                        updateElevatorLocation={updateElevatorLocation}
                    />
                </div>
            ))}
        </div>
    </div>
}
export default Building