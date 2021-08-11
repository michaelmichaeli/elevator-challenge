const Floor = ({ floorId, addToQueue, elevators }) => {
    const isPressed = elevators.flat().findIndex(floor => floor === floorId) > -1
    return <div className="floor floor-size">
        <div className="blackline"></div>
        <button
            className={`controller metal linear ${isPressed ? "active" : ""}`}
            onClick={() => {
                addToQueue(floorId)
            }}
        >
            {floorId}
        </button>
    </div >
}
export default Floor