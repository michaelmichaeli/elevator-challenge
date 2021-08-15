import Elevator from "./Elevator"

const ElevatorList = ({
    elevatorsQueues,
    elevatorSpeed,
    elevatorDelay,
    elevatorsLocations,
    removeFromQueue,
    updateElevatorLocation,
    floorsCount
}) => {
    
    return <div className="shafts">
        {elevatorsQueues.map((elevatorQueue, i) => (
            <div
                style={{ "height": 110 * floorsCount + 8 + "px" }}
                className="shaft"
                key={i}
            >
                <Elevator
                    elevatorIndex={i}
                    // setCanUpdate={setCanUpdate}
                    elevatorsQueues={elevatorsQueues}
                    elevatorSpeed={elevatorSpeed}
                    elevatorDelay={elevatorDelay}
                    elevatorLocation={elevatorsLocations[i]}
                    removeFromQueue={removeFromQueue}
                    updateElevatorLocation={updateElevatorLocation}
                />
            </div>
        ))}
    </div>
}

export default ElevatorList