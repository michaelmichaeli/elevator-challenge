import "./help.css";
import "./main.css";
import Building from "./components/Building";
import { useCallback, useEffect, useState } from "react";
import db from "./db.json";

function App() {
	const [buildings, setBuildings] = useState([]);

	const fetchData = useCallback(async () => {
		let response = await db;
		setBuildings(response);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (!buildings || !buildings.length) return <h1>"Loading..."</h1>
	else
		return (
			<div className="App">
				<div className="street">
					{buildings.map((building) => (
						<Building
							key={building.id}
							floorsCount={building.floorsCount}
							elevatorsCount={building.elevatorsCount}
							elevatorSpeed={building.elevatorSpeed}
							elevatorDelay={building.elevatorDelay}
						/>
					))}
				</div>
			</div>
		);
}

export default App;
