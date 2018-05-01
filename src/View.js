import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre, div, h1, button, form, label, input } = hh(h);

function fieldSet(labelText, inputValue) {
	return div([
		label({ className: 'db mb1' }, labelText),
		input({  
			className: 'pa2, input-reset ba w-100 mb2',
			type: 'text',
			value: inputValue
		})
	]);
}

function buttonSet(dispatch) {
	return div([
		button(
			{
				className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
				type: 'Submit'
			},
			'Save'
		),
		button(
			{
				className: 'f3 pv2 ph3 bg-light-gray bn mr2 dim',
				type: 'Submit'
			},
			'Cancel'
		)
	]);
}

function formView(dispatch, model) {
  const {descriptoin, calories, showForm} = model;
	if (showForm) {
		return form(
			{ className: 'w-100 mv2' },
			[
			 fieldSet('Meal', descriptoin),
			 fieldSet('Calories', calories || ''),
			 buttonSet(dispatch)
			]
		);	
	}
	
	return button(
		{className: 'f3 pv2 ph3 bn bg-blue white'},
		'Add Meal'
	);
}

function view(dispatch, model) {
	return div(
		{className: 'mw6 center'},
		[
			h1({ className: 'tc f2, pv2, bb'}, 'Calories Counter'),
			formView(dispatch, model),
			pre(JSON.stringify(model))
		]
	);
}

export default view;