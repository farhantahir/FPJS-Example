import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { 
	showFormAction,
	mealsInputAction,
	caloriesInputAction,
	saveMealAction
} from './Update';

const { pre, div, h1, button, form, label, input } = hh(h);

function fieldSet(labelText, inputValue, oninput) {
	return div([
		label({ className: 'db mb1' }, labelText),
		input({  
			className: 'pa2, input-reset ba w-100 mb2',
			type: 'text',
			value: inputValue,
			oninput
		})
	]);
}

function buttonSet(dispatch) {
	return div([
		button(
			{
				className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
				type: 'Submit',
				onclick: e => {
					e.preventDefault();					
					dispatch(saveMealAction());
				}
			},
			'Save'
		),
		button(
			{
				className: 'f3 pv2 ph3 bg-light-gray bn mr2 dim',
				type: 'button',
				onclick: () => dispatch(showFormAction(false))
			},
			'Cancel'
		)
	]);
}

function formView(dispatch, model) {
  const {description, calories, showForm} = model;
	if (showForm) {
		return form(
			{ className: 'w-100 mv2' },
			[
			 fieldSet('Meal', description, 
			 	e => dispatch(mealsInputAction(e.target.value))
			 ),
			 fieldSet('Calories', calories || '',
			 	e => dispatch(caloriesInputAction(e.target.value))
		 	 ), 
			 buttonSet(dispatch)
			]
		);	
	}
	
	return button(
		{
			className: 'f3 pv2 ph3 bn bg-blue white',
			onclick: () => dispatch(showFormAction(true)),
		},	
		'Add Meal'
	);
}

function view(dispatch, model) {
	return div(
		{className: 'mw6 center'},
		[
			h1({ className: 'tc f2, pv2, bb'}, 'Calories Counter'),
			formView(dispatch, model),
			pre(JSON.stringify(model, null, 4))
		]
	);
}

export default view;