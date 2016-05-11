
var React = require('react');
var ReactDOM = require('react-dom');
var PaddingBlock = require('../partial/padding.jsx');

ReactDOM.render(
	<PaddingBlock applyClass="red" />,
	document.getElementById('pdBar1')
);

ReactDOM.render(
	<PaddingBlock applyClass="blue" />,
	document.getElementById('pdBar2')
);

ReactDOM.render(
	<PaddingBlock applyClass="red" />,
	document.getElementById('pdBar3')
);

ReactDOM.render(
	<PaddingBlock applyClass="blue" />,
	document.getElementById('pdBar4')
);

ReactDOM.render(
	<PaddingBlock applyClass="red" />,
	document.getElementById('pdBar5')
);