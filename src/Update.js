import * as R from 'ramda';

const ACTION_TYPES = {
	SHOW_FORM: "SHOW_FORM",
	MEAL_INPUT: "MEAL_INPUT",
	CALORIES_INPUT: "CALORIES_INPUT"
};

export function showFormAction(showForm) {
	return {
		type: ACTION_TYPES.SHOW_FORM,
		data: {
			showForm
		}
	};
}

export function mealsInputAction(description) {
	return {
		type: ACTION_TYPES.MEAL_INPUT,
		data: {
			description
		}
	};	
}

export function caloriesInputAction(calories) {
	return {
		type: ACTION_TYPES.CALORIES_INPUT,
		data: {
			calories
		}
	};	
}


function update(action, model) {
	switch(action.type) {
		case ACTION_TYPES.SHOW_FORM: 
			const { data: { showForm } } = action;
			return { ...model, showForm, description: '', calories: 0 };

		case ACTION_TYPES.MEAL_INPUT:
			const { data: { description } }	= action;
			return { ...model, description };

		case ACTION_TYPES.CALORIES_INPUT:
			const calories = R.pipe(
				parseInt,
				R.defaultTo(0)
			)(action.data.calories);
			return { ...model, calories };

		default:
			return model;	
	}
}

export default update;