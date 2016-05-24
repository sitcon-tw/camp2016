
var timetableContent = [
	// [
	// 	{t:[" "]},
	// 	{t:["day1"]},
	// 	{t:["day2"]},
	// 	{t:["day3"]},
	// 	{t:["day4"]}
	// ],
	[
		{t: ["07:00", "~", "07:30"]},
		{t: [], r: 5, type: "blank"},
		{t: ["起床", "盥洗"], c: 2, type: "easy"},
		{t: [], r: 2, type: "blank"},
	],
	[
		{t: ["07:30","~","08:00"]},
		{t: ["早餐 + 元氣活動", "CSS 選擇器"], r: 2, type: "activity"},
		{t: ["早餐"], type: "easy"}
	],
	[
		{t: ["08:00","~","08:30"]},
		{t: ["共同課程三", "GitHub Pages / Git Branches"], r: 2, type: "course"},
		{t: ["起床", "盥洗"], type: "easy"}
	],
	[
		{t:["08:30","~","09:00"]},
		{t:["共同課程二", "HTTP 請求、RESTful 概念"], r: 2, type:"course"},
		{t:["早餐"], type: "easy"}
	],
	[
		{t:["09:00","~","09:30"]},
		{t:["分流課程二" , "$<span>資料視覺化<hr>Express.js、PM2 套件</span>"], r: 3, type:"course split"},
		{t:["視界咖啡館"], r: 3, type: "activity"}
	],
	[
		{t:["09:30","~","10:00"]},
		{t:["山有小口，彷彿若有光", "報到"], type: "easy extended"},
		{t:["分流課程一", "$<span>jQuery、Ajax、CSS 框架<hr>Node.js、NPM、爬蟲基礎</span>"], r: 2, type:"course split"},
		
	],
	[
		{t:["10:00","~","12:00"]},
		{t:["問所從來，具答之", "開幕 + 隊員破冰"], type: "activity extended"},
	],
	[
		{t:["12:00","~","13:30"]},
		{t:["午餐"], c: 4, type: "easy"},
	],
	[
		{t:["13:30","~","15:30"]},
		{t:["共同課程一", "JavaScript + Git 基礎"], type: "course", r: 2},
		{t:["Debugger"], type: "activity"},
		{t:["分流課程三", "複習與交流"], type: "course", r: 2},
		{t:["Hackathon", "成果發表", "最後競標 + 閉幕"], r: 2, type: "activity"}
	],
	[
		{t:["15:30","~","16:00"]},
		{t:["開源社群精神"], type: "course"}
	],
	[
		{t:["17:00","~","18:00"]},
		{t:["美酒佳肴", "晚餐"], type: "easy extended"},
		{t:["$餘人各復延至其家，<br>皆出酒食", "晚餐 + 社群闖關"], r: 2, type: "activity extended"},
		{t:["美酒佳肴", "晚餐"], type: "easy extended"},
		{t:["$尋向所志，<br>遂迷，不復得路", "賦歸"], type: "easy extended"}
	],
	[
		{t:["18:00","~","21:00"]},
		{t:["活動"], type: "activity"},
		{t:["Hackathon"], type: "activity"},
		{t:[], r: 2, type: "blank"}
	],
	[
		{t:["21:00","~","22:00"]},
		{t:["宵夜"], type: "easy"},
		{t:["神祕活動"], type: "activity"},
		{t:["宵夜"], type: "easy"}	
	],
];

var React = require('react');
var ReactDOM = require('react-dom');
var CourseStore = require('../stores/courseStore.jsx');
var Timetable = require('../partial/timetable.jsx');
var CourseFeature = require('./courseFeature.jsx');

var CoursePage = React.createClass({
	render: function(){
		return (
			<div className="coursePage pageContainer">
				<h2>課 程</h2>
				<div className="tableContainer">
					<Timetable content={timetableContent} />
				</div>
				<CourseFeature />
			</div>
		);
	}
});


ReactDOM.render(
	<CoursePage />,
	document.getElementById('coursePage')
);


/* below is course's info panel */

function getCoursePanelState(){
	return {
		pageData: CourseStore.nowCourse(),
		showmode: CourseStore.nowShow()
	};
}

var CoursePanel = React.createClass({
	getInitialState: function(){
		return getCoursePanelState();
	},
	componentDidMount: function() {
		CourseStore.addShowListener(this.showPanel);
		CourseStore.addCloseListener(this.closePanel);
	},
	componentWillUnmount: function() {
		CourseStore.removeShowListener(this.showPanel);
		CourseStore.removeCloseListener(this.closePanel);
	},
	render: function(){
		return (
			<div className="coursePanel darken">
				<div className="relative">
					<img className="panelClose" src="img/close.png"
						  onClick={this.closePanel} />
					<img className="panelCover" src="img/infoCover.png" />
					{this.state.pageData}
				</div>
				<div className="closeArea" onClick={this.closePanel}></div>
			</div>
		);
	},
	showPanel: function(){
		this.setState( getCoursePanelState() );
		document.getElementById('coursePanel').style.display = "block";
		document.body.style.overflowY = "hidden";
	},
	closePanel: function(){
		document.getElementById('coursePanel').style.display = "none";
		document.body.style.overflowY = "auto";
	}
});

ReactDOM.render(
	<CoursePanel />,
	document.getElementById('coursePanel')
);
