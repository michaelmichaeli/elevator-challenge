import { useEffect, useState } from 'react'
import Elevator from './Elevator'
import Floor from './Floor'

const Building = ({ floorsCount, elevatorsCount, elevatorDelay, elevatorSpeed }) => {
    const floors = [...Array(floorsCount).fill(null)]
    const [elevatorsQueues, setElevatorsQueues] = useState(Array.from(Array(elevatorsCount), () => new Array(0)))
    const [elevatorsLocations, setElevatorsLocations] = useState([...Array(elevatorsCount).fill(0)])
    const [floorsTimes, setFloorsTimes] = useState([...Array(floorsCount).fill(null)])

    useEffect(() => {
        // console.log('elevatorsQueues:', elevatorsQueues);
        // console.log('elevatorsLocations:', elevatorsLocations);
    }, [elevatorsQueues, elevatorsLocations])

    // Adding to queue after choose the correct elevator to add floorIndex to its correct queue
    const addToQueue = (floorIndex) => {
        // If floor already in one of the queues -> do nothing
        if (elevatorsQueues.flat().findIndex(floor => floor === floorIndex) > -1) return

        const correctElevatorIndex = getCorrectElevatorIndex(floorIndex)


        // Update state
        const queuesCopy = [...elevatorsQueues]
        queuesCopy[correctElevatorIndex].push(floorIndex)
        setElevatorsQueues(queuesCopy)


        updateFloorTimeStart(floorIndex, correctElevatorIndex)
    }


    const updateFloorTimeStart = (floorIndex, elevatorIndex) => {
        const time = getFloorsTimes(floorIndex, elevatorIndex)

        // Update floor time
        const floorsTimesCopy = [...floorsTimes]
        floorsTimesCopy[floorIndex] = time
        setFloorsTimes(floorsTimesCopy)
    }

    const getFloorsTimes = (floorIndex, elevatorIndex) => {
        const floorInQueueIndex = elevatorsQueues[elevatorIndex].findIndex(curr => curr === floorIndex)
        if (floorInQueueIndex === -1) return
        const myQueue = elevatorsQueues[elevatorIndex].slice(0, floorInQueueIndex + 1)

        let sumOfFloorsToTravel = 0

        if (myQueue.length > 1) {
            myQueue.forEach((floor, i, queue) => {
                sumOfFloorsToTravel = (i > 0)
                    ? sumOfFloorsToTravel += Math.abs(queue[i] - queue[i - 1])
                    : sumOfFloorsToTravel += 0
            })
        }

        sumOfFloorsToTravel += Math.abs(elevatorsLocations[elevatorIndex] - myQueue[0])

        const travelTime = (sumOfFloorsToTravel / elevatorSpeed)
        const delayTime = (elevatorDelay * (myQueue.length - 1))  // - 2 ?
        const time = travelTime + delayTime

        return time
    }

    // Removing oldest task from relevant queue using elevator index
    const removeFromQueue = (elevatorIndex) => {
        // If elevator queue is empty -> do nothing
        if (!elevatorsQueues[elevatorIndex].length) return

        // Update state - assuming remove oldest floor in queue
        const queuesCopy = [...elevatorsQueues]
        queuesCopy[elevatorIndex].shift()
        setElevatorsQueues(queuesCopy)
    }

    const updateElevatorLocation = (elevatorIndex) => {
        // If elevator queue is empty -> do nothing
        if (!elevatorsQueues[elevatorIndex].length) return

        const locationCopy = [...elevatorsLocations]
        locationCopy[elevatorIndex] = elevatorsQueues[elevatorIndex][0]

        // Update state
        // copy[elevatorIndex] = location
        setElevatorsLocations(locationCopy)
    }


    const getCorrectElevatorIndex = (floorIndex) => {
        const elevatorsTimes = [...Array(elevatorsCount).fill(Infinity)]
        // const hypotheticalQueues = [...elevatorsQueues]
        elevatorsQueues.forEach((queue, elevatorIndex) => {
            // queue.push(floorIndex)
            queue = [...queue, floorIndex]
            // console.log('ququ', queue);
            // const time = getFloorsTimes(floorIndex, i)
            // const floorInQueueIndex = elevatorsQueues[elevatorIndex].findIndex(curr => curr === floorIndex)
            // if (floorInQueueIndex === -1) return
            // const myQueue = elevatorsQueues[elevatorIndex].slice(0, floorInQueueIndex + 1)

            let sumOfFloorsToTravel = 0

            if (queue.length > 1) {
                queue.forEach((floor, i, queue) => {
                    sumOfFloorsToTravel = (i > 0)
                        ? sumOfFloorsToTravel += Math.abs(queue[i] - queue[i - 1])
                        : sumOfFloorsToTravel += 0
                })
            }

            sumOfFloorsToTravel += Math.abs(elevatorsLocations[elevatorIndex] - floorIndex)

            const travelTime = (sumOfFloorsToTravel / elevatorSpeed)
            const delayTime = (elevatorDelay * (queue.length - 1))  // - 2 ?
            const time = travelTime + delayTime
            // let time
            // if (!queue.length) {
            //     time = Math.abs(floorIndex - elevatorsLocations[i]) / elevatorSpeed
            // }
            // else {
            //     const sumOfFloorsToTravel = queue.reduce((acc, floor, i, queue) => {
            //         acc = (i > 0)
            //             ? acc + Math.abs(queue[i] - queue[i - 1])
            //             : acc + 0
            //         return acc
            //     })
            //     time = (sumOfFloorsToTravel / elevatorSpeed)
            //         + (elevatorDelay * (queue.length))
            //         + (Math.abs(floorIndex - queue[queue.length - 1]) / elevatorSpeed)
            // }
            elevatorsTimes[elevatorIndex] = time
        })
        // console.log('hypotheticalQueues',hypotheticalQueues);
        // console.log('elevatorsQueues', elevatorsQueues);

        // console.log('elevatorsTimes', elevatorsTimes);
        return elevatorsTimes.indexOf(Math.min(...elevatorsTimes));
    }

    return <section>
        <header>
            <h1>Speed: {elevatorSpeed} floors/sec</h1>
            <h1>Delay: {elevatorDelay} seconds</h1>
        </header>
        <div className="building">
            <div className="floors">
                {floors.map((floor, i, floors) => (
                    <div
                        className="floor" key={i}>
                        <Floor
                            addToQueue={addToQueue}
                            floorIndex={i}
                            elevatorsQueues={elevatorsQueues}
                            elevatorSpeed={elevatorSpeed}
                            elevatorDelay={elevatorDelay}
                            floorTime={floorsTimes[i]}
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
    </section>
}
export default Building