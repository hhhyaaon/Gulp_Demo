var React = require("react");
var ReactDOM = require("react-dom");

var Index = React.createClass({
	render:function(){
		return (
			<h1>Index</h1>
		);
	}
});

ReactDOM.render(<Index/>,document.getElementById("app"));


function getName(){
	var name = "string";
	console.log(name);
}