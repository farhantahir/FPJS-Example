import hh from 'hyperscript-helpers';
import { h, diff, patch }  from 'virtual-dom';
import createElement from 'virtual-dom/create-element';


// Impure function and HOF
function app(initModel, view, update, node) {
	let model = initModel;
	let currentView = view(dispatch, model);
	let rootNode = createElement(currentView);
	node.appendChild(rootNode);
	// Closure function
	function dispatch(action) {
		model = update(action, model);
		let updatedView = view(dispatch, model);
		const patches = diff(currentView, updatedView);
		rootNode = patch(rootNode, patches);
		currentView = updatedView;
	}
}

export default app;