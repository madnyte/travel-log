import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {createLogEntry} from '../api';

const LogEntryForm = ({location, onClose}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const {register, handleSubmit} = useForm();
	const onSubmit = async data => {
		try {
			setLoading(true);
			data.latitude = location.latitude;
			data.longitude = location.longitude;
			await createLogEntry(data);
			onClose();
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};
	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			{error && <h3>{error}</h3>}
			<label htmlFor="title">Title</label>
			<input name="title" type="text" placeholder="title" required {...register('title')} />

			<label htmlFor="comments">Comments</label>
			<textarea name="comments" placeholder="comments" rows={3} {...register('comments')} />

			<label htmlFor="description">Description</label>
			<textarea
				name="description"
				placeholder="description"
				rows={3}
				{...register('description')}
			/>

			<label htmlFor="image">Image</label>
			<input name="image" type="text" placeholder="image url" {...register('image')} />

			<label htmlFor="rating">Rating</label>
			<input name="rating" type="number" required {...register('rating')} min={0} max={10} />

			<label htmlFor="visitDate">Visit Date</label>
			<input name="visitDate" type="date" required {...register('visitDate')} />

			<button type="submit" className="btn" disabled={loading}>
				{loading ? 'Loading...' : 'Create Log'}
			</button>
		</form>
	);
};

export default LogEntryForm;
