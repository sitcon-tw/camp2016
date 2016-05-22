var partIn = [{
		group: "主辦單位",
		applyClass: "mainPart",
		parts: [
			{ name: "學生計算機年會", logo: "sitconLogo.png", url: "http://sitcon.org/" }
		]
	}, {
		group: "共同主辦",
		applyClass: "secondPart",
		parts: [
			{ name: "開放文化基金會", logo: "OCFLogo.png", url: "http://ocf.tw/" },
			{ name: "中央大學 電子計算機中心", logo: "NCUCCLogo.png", url: "http://www.cc.ncu.edu.tw/" }
		]
	}, {
		group: "特別感謝",
		applyClass: "thirdPart",
		parts: [
			{ name: "中央大學 網路開源社", logo: "NOSLogo.jpg", url: "http://nos.ncu.cc" }
		]
	}
	/*,
		{group:"媒體夥伴",applyClass:"mediaPart",parts:[
		]},
		{group:"贊助單位",applyClass:"sponsorPart",parts:[
		]}*/
];

var React = require('react');
var ReactDOM = require('react-dom');
var ruler = require('../partial/ruler.jsx');

var popInMixins = {
	getDefaultProps: function() {
		return { calledAnimation: false };
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.checkReached, false);
		window.addEventListener('load', this.loadPic, false);
	},
	checkReached: function() {
		if (!ruler.haveReaching(this.refs.partIn))
			return;
		if (this.props.calledAnimation)
			return;
		this.props.calledAnimation = true;
		window.removeEventListener('scroll', this.checkReached, false);
		this.refs.partIn.className += " popIn";
	},
	loadPic: function() {
		window.removeEventListener('scroll', this.loadPic, false);
		// this.refs.logoImg.src =
		// 	'img/logos/' + this.props.detail.logo;
	}
};

var PartIn = React.createClass({
	mixins: [popInMixins],
	render: function() {
		return (
			<div className={"partIn popInPre "+this.props.colorPick} ref="partIn">
				<a target="_blank" href={this.props.detail.url} style={{backgroundImage: 'url(img/logos/' + this.props.detail.logo + ')'}}>
					<div className="partInName">
						<strong>{this.props.detail.name}</strong>
						<div className="partInNameBg"></div>
					</div>
				</a>
			</div>
		);
	}
});

var PartInGroup = React.createClass({
	render: function() {
		var allPartIn = [];
		var colorPick = this.props.colorPick;
		this.props.partIn.forEach(function(p, cnt) {
			allPartIn.push(
				<PartIn detail={p}
					colorPick={colorPick} key={cnt} />
			);
		})
		return (
			<div className={"partInGroup "+this.props.applyClass}>
				<div className={"groupHeader "+colorPick}>
					<div className="upBar">
						<div className="downBorder borderFloatLeft"></div>
						<div className="downBorder borderFloatRight"></div>
					</div>
					<h2>
						{this.props.groupName}
						<div className="middleBar"></div>
					</h2>
					<div className="downBar">
						<div className="upBorder borderFloatLeft"></div>
						<div className="upBorder borderFloatRight"></div>
					</div>
				</div>
				{allPartIn}
			</div>
		);
	}
});

var SponsorPage = React.createClass({
	render: function() {
		var allGroup = [];
		this.props.groups.forEach(function(g, cnt) {
			var colorPick = "red";
			if (cnt % 2)
				colorPick = " blue";
			allGroup.push(
				<PartInGroup key={cnt}
					groupName={g.group} partIn={g.parts} 
					colorPick={colorPick} applyClass={g.applyClass} />
			);
		})
		return (
			<div className="sponsorPage pageContainer">
				{allGroup}
			</div>
		);
	}
});

ReactDOM.render(
	<SponsorPage groups={partIn} />,
	document.getElementById('sponsorPage')
);
