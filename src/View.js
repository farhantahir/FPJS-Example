import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  showFormAction,
  mealsInputAction,
  caloriesInputAction,
  saveMealAction,
  deleteMealAction,
  editMealAction
} from './Actions.js';

const { 
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  td,
  th,
  tr,
  tbody,
  thead,
  tfoot,
  table,
  i
} = hh(h);


function cell(tag, className, value) {
  return tag({ className }, value);
}

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2 tr', meal.calories),
    cell(td, 'pa2 tc', [
      i({
        className: 'pa1 fa fa-trash-o pointer',
        onclick: () => dispatch(deleteMealAction(meal.id))
      }),
      i({
        className: 'pa1 fa fa-pencil-square-o pointer',
        onclick: () => dispatch(editMealAction(meal.id))
      })
    ]),
  ]);
}

function mealsBody(dispatch, className, meals) {
  const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);
  return tbody({ className }, rows);
}


function mealsHeader(className = '') {
  return thead({ className }, [
    cell(th, 'pa2 tl b', 'Meal'),
    cell(th, 'pa2 tr b', 'Calories'),
    cell(th, 'pa2 tr b', '')
  ]);
}


function mealsFooter(className, meals) {
  const totalCalories = R.pipe(
    R.map(meal => meal.calories),
    R.sum
  )(meals);
  const footerRow = tr({ className: 'pa2' }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr b', totalCalories),
  ]);
  return tfoot({ className }, [footerRow]);
}


function mealsTable(dispatch, model) {
  const { meals } = model;

  if (!meals.length) {
    return div({ className: 'mv2 black-50 i mv3 tc' }, 'No meals to display...')
  }

  const header = mealsHeader();
  const body = mealsBody(dispatch, '', meals);
  const footer = mealsFooter('bt b', meals);
  return table(
    {
      className: 'mw6 center w-100 collapse mv3'
    },
    [header, body, footer]
  );
}


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
  const { description, calories, showForm } = model;
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
    { className: 'mw6 center' },
    [
      h1({ className: 'tc f2, pv2, bb' }, 'Calories Counter'),
      formView(dispatch, model),
      mealsTable(dispatch, model)
    ]
  );
}

export default view;