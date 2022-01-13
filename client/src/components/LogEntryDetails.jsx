import React from 'react';
import {Marker, Popup} from 'react-map-gl';

const LogEntryDetails = ({logEntry, showPopup, setShowPopup}) => (
	<>
		<Marker key={logEntry._id} latitude={logEntry.latitude} longitude={logEntry.longitude}>
			<div
				style={{
					cursor: 'pointer',
				}}
				onClick={() =>
					setShowPopup({
						[logEntry._id]: true,
					})
				}
			>
				<svg
					style={{
						width: '24px',
						height: '24px',
					}}
					className="marker"
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
		{showPopup[logEntry._id] ? (
			<Popup
				latitude={logEntry.latitude}
				longitude={logEntry.longitude}
				closeButton
				closeOnClick
				dynamicPosition
				onClose={() => setShowPopup({})}
				offsetTop={50}
				anchor="top"
				className="container"
			>
				<div className="popup">
					{logEntry.image && <img src={logEntry.image} alt={logEntry.title} />}
					<h3>{logEntry.title}</h3>
					<p>{logEntry.comments}</p>
					<small>Rating: {logEntry.rating}/10</small>
					<small>Visited on: {new Date(logEntry.visitDate).toLocaleDateString()}</small>
				</div>
			</Popup>
		) : null}
	</>
);

export default LogEntryDetails;
