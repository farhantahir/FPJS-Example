import * as R from 'ramda';
import { ACTION_TYPES } from './Actions';

function update(action, model) {
	switch(action.type) {
		case ACTION_TYPES.SHOW_FORM: {
			const { data: { showForm } } = action;
			return { ...model, showForm, description: '', calories: 0 };
		}

		case ACTION_TYPES.MEAL_INPUT: {
			const { data: { description } }	= action;
			return { ...model, description };
		}
		
		case ACTION_TYPES.CALORIES_INPUT: {
			const calories = R.pipe(
				parseInt,
				R.defaultTo(0)
			)(action.data.calories);
			return { ...model, calories };
		}
		
		case ACTION_TYPES.SAVE_MEAL: {
			const { editId } = model;
			const updatedModel = editId !== null
				? edit(action, model)
				: add(action, model);				
			return updatedModel;
		}
			
		case ACTION_TYPES.DELETE_MEAL: {
			const { data: { id } } = action;
			const meals = R.filter(
				meal => meal.id !== id,
				model.meals
			);
			return { ...model, meals };
		}
			
		case ACTION_TYPES.EDIT_MEAL: {
			const { data: { editId } } = action;
			const meal = R.find(
				meal => meal.id === editId,
				model.meals
			);
			const { description, calories } = meal;
			return {
				...model,
				editId,
				description: meal.description,
				calories: meal.calories,				
				showForm: true
			};
		}

		default:
			return model;	
	}
}

function add(action, model) {
	const { nextId, description, calories} = model;
	const meal = { id: nextId, description, calories };
	const meals = [ ...model.meals, meal ];
	return {
		...model,
		meals,
		nextId: nextId + 1,
		description: '',
		calories: 0,
		showForm: false
	};
}

function edit(action, model) {
	const { editId, description, calories } = model;
	const meals = R.map(
		meal => {
			if (meal.id === editId) {
				return { ...meal, description, calories };
			}
			return meal;		
		},
		model.meals
	);
	return {
		...model,
		meals,
		editId: null,
		description: '',
		calories: '',
		showForm: false
	};
}


export default update;
