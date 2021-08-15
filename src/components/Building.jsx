import { useState } from 'react'
import ElevatorList from './ElevatorList'
import FloorList from './FloorList'

const Building = ({
    floorsCount,
    elevatorsCount,
    elevatorDelay,
    elevatorSpeed }) => {
    
    const floors = [...Array(floorsCount).fill(null)]
    const [elevatorsQueues, setElevatorsQueues] = useState(Array.from(Array(elevatorsCount), () => new Array(0)))
    const [elevatorsLocations, setElevatorsLocations] = useState([...Array(elevatorsCount).fill(0)])
    const [floorsTimes, setFloorsTimes] = useState([...Array(floorsCount).fill(null)])
    const [canUpdate, setCanUpdate] = useState(true)
    
    // useEffect(() => {
    //     console.log('elevatorsQueues:', elevatorsQueues);
    //     console.log('elevatorsLocations:', elevatorsLocations);
    // }, [elevatorsQueues, elevatorsLocations])

    // Adding floorIndex to elevator-queue after choosing the correct elevator
    const addToQueue = (floorIndex) => {
        // If floor already in one of the queues -> do nothing
        if (elevatorsQueues.flat().findIndex(floor => floor === floorIndex) > -1) return
        // If elevator is already in this floor -> do nothing
        if (elevatorsLocations.flat().findIndex(floor => floor === floorIndex) > -1) return

        const correctElevatorIndex = getCorrectElevatorIndex(floorIndex)

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

        // Update state
        const locationCopy = [...elevatorsLocations]
        locationCopy[elevatorIndex] = elevatorsQueues[elevatorIndex][0]
        setElevatorsLocations(locationCopy)
    }

    const getCorrectElevatorIndex = (floorIndex) => {
        const elevatorsTimes = [...Array(elevatorsCount).fill(Infinity)]
        elevatorsQueues.forEach((queue, elevatorIndex) => {
            queue = [...queue, floorIndex]
           
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
           
            elevatorsTimes[elevatorIndex] = time
        })

        return elevatorsTimes.indexOf(Math.min(...elevatorsTimes));
    }

    return <section>
        <header>
            <h1>Speed: {elevatorSpeed} floors/sec</h1>
            <h1>Delay: {elevatorDelay} seconds</h1>
        </header>
        <div className="building">
            <FloorList
                floors={floors}
                addToQueue={addToQueue}
                canUpdate={canUpdate}
                elevatorsQueues={elevatorsQueues}
                floorTimes={floorsTimes}
            />
           <ElevatorList 
                setCanUpdate={setCanUpdate}
                elevatorsQueues={elevatorsQueues}
                elevatorSpeed={elevatorSpeed}
                elevatorDelay={elevatorDelay}
                elevatorsLocations={elevatorsLocations}
                removeFromQueue={removeFromQueue}
                updateElevatorLocation={updateElevatorLocation}
                floorsCount={floorsCount}
            />
        </div>
    </section>
}
export default Building