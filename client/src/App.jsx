import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import {listLogEntries} from './api';
import LogEntryDetails from './components/LogEntryDetails';
import LogEntryForm from './components/LogEntryForm';

const App = () => {
	const [logEntries, setLogEntries] = useState([]);
	const [showPopup, setShowPopup] = useState({});
	const [addEntryLog, setAddEntryLog] = useState(null);
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: -22.342841,
		longitude: 24.6871044,
		zoom: 5,
	});

	const getEntries = async () => {
		const logEntriesList = await listLogEntries();
		setLogEntries(logEntriesList);
	};

	useEffect(() => {
		getEntries();
	}, []);

	const showAddMarkerPopUp = event => {
		const [longitude, latitude] = event.lngLat;
		setAddEntryLog({
			latitude,
			longitude,
		});
	};

	return (
		<ReactMapGL
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...viewport}
			mapStyle="mapbox://styles/madnyte/cks1tzgh60ske18kc4laivxrq"
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			onViewportChange={nextViewport => setViewport(nextViewport)}
			onDblClick={showAddMarkerPopUp}
		>
			{logEntries.map(entry => (
				<LogEntryDetails
					key={entry._id}
					logEntry={entry}
					showPopup={showPopup}
					setShowPopup={setShowPopup}
				/>
			))}
			{addEntryLog ? (
				<>
					<Marker latitude={addEntryLog.latitude} longitude={addEntryLog.longitude}>
						<div
							style={{
								cursor: 'pointer',
							}}
						>
							<svg
								style={{
									width: '24px',
									height: '24px',
								}}
								className="newMarker"
								viewBox="0 0 24 24"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
						</div>
					</Marker>
					<Popup
						latitude={addEntryLog.latitude}
						longitude={addEntryLog.longitude}
						closeButton
						closeOnClick={false}
						dynamicPosition
						onClose={() => setAddEntryLog(null)}
						offsetTop={50}
						anchor="top"
					>
						<div className="popup">
							<LogEntryForm
								onClose={() => {
									setAddEntryLog(null);
									getEntries();
								}}
								location={addEntryLog}
							/>
						</div>
					</Popup>
				</>
			) : null}
		</ReactMapGL>
	);
};

export default App;
