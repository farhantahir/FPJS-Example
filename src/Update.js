import * as R from 'ramda';

const ACTION_TYPES = {
	SHOW_FORM: "SHOW_FORM",
	MEAL_INPUT: "MEAL_INPUT",
	CALORIES_INPUT: "CALORIES_INPUT",
	SAVE_MEAL: "SAVE_MEAL"
};


export const saveMealAction = () => ({ type: ACTION_TYPES.SAVE_MEAL });

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

		case ACTION_TYPES.SAVE_MEAL: 
			return add(action, model);

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


export default update;

