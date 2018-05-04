export const ACTION_TYPES = {
	SHOW_FORM: "SHOW_FORM",
	MEAL_INPUT: "MEAL_INPUT",
	CALORIES_INPUT: "CALORIES_INPUT",
	SAVE_MEAL: "SAVE_MEAL",
	DELETE_MEAL: "DELETE_MEAL",
	EDIT_MEAIL: "EDIT_MEAL"
};


export function saveMealAction() {
	return { 
		type: ACTION_TYPES.SAVE_MEAL 
	};
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

export function deleteMealAction(id) {
	return {
		type: ACTION_TYPES.DELETE_MEAL,
		data: {
			id
		}
	};
}

export function editMealAction(editId) {
	return {
		type: ACTION_TYPES.EDIT_MEAL,
		data: {
			editId
		}
	}
}