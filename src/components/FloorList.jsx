import Floor from "./Floor"

const FloorList = ({
    floors,
    addToQueue,
    elevatorsQueues,
    floorTimes }) => {

    return <div className="floors">
        {floors.map((floor, i, floors) => (
            <div
                className="floor" key={i}>
                <Floor
                    floorIndex={i}
                    floorTime={floorTimes[i]}
                    elevatorsQueues={elevatorsQueues}
                    addToQueue={addToQueue}
                />
            </div>)
        )}
    </div>
}

export default FloorList