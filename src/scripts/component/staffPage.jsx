var staffTaChi = [
	[
		"總召組", "子期、阿哲"
	],
	[
		"行政組", "Penny、葉子"
	],
	[
		"行銷組", ""
	],
	[
		"課活組", "松鼠、全全、Allen Chou、Andy"
	],
	[
		"", "BobbyHo、Jeffrey Lin、家維、球魚、謝秀芳"
	],
	[
		"財務組", "泰泰、L"
	],
	[
		"文創組", "宏宏、Elantris、爛桃、白白"
	],
	[
		"庶務組", "PCC、全全、懷少、阿吉、阿貓"
	],
	[
		"紀錄組", "小草"
	],
	[
		"隊輔組", "拉布"
	],
];

var React = require('react');
var ReactDOM = require('react-dom');
var ruler = require('../partial/ruler.jsx');
var Table = require('../partial/table.jsx');
var Article = require('../partial/article.jsx');

var feedbackData = [{
	title: "球魚",
	subtitle: "",
	content: ["去年年初參加 SITCON 年會後，得知這個神祕的夏令營，毫不猶豫地報（ㄊㄧㄠˋ）名（ㄎㄥ）了。就這樣完成 SITCON 夏令營副本，夏令營真的很充實，而且看到很多黑黑跟大大，點滿很多技能點，走向越來越宅和中二（誤）。看到一個夏令營是由很多人彼此互（推）助（坑）而完成的，真的讓人感受到社群的精神，對夏令營的籌備團隊非常敬佩。並且看到他們，我覺得「今年有人跳坑拉我，明年我也要跳坑拉人」，讓這個夏令營不斷持續下去。"]
}, {
	title: "廣霖",
	subtitle: "",
	content: ["去年的 SITCON 夏令營 是我真正開始認識並參與開源社群活動的開始，在活動中也學到了很多，更重要的是認識了許多來自 SITCON 的朋友們。在之後，我有幸可以參與到很多不同的社群活動/研討會，覺得自己應該要開始真正做出貢獻，因此順勢加入了今年的夏令營籌備團隊，希望能把夏令營辦個更好，帶領更多人接觸開源社群的世界。"]
}];

var StudentFeedback = React.createClass({
	getDefaultProps: function() {
		return { calledAnimation: false };
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.checkReached, false);
	},
	checkReached: function() {
		if (!ruler.haveReaching(this.refs.StudentFeedback))
			return;
		if (this.props.calledAnimation)
			return;
		this.props.calledAnimation = true;
		window.removeEventListener('scroll', this.checkReached, false);
		studentFeedbackAnimation();
	},
	render: function() {
		var allFeedbacks = this.props.feedbackData.map(function(data, cnt) {
			return (
				<div className="studentFeedbackBlock slideInUpPre" key={cnt} ref="StudentFeedback">
					<h2>
						<strong>{data.title}</strong>
						<span>{data.subtitle}</span>
					</h2>
					<Article>
						{data.content}
					</Article>
				</div>
			);
		});
		return (
			<div className="studentFeedback">
				<h2>{"去年學員心得"}</h2>
				{allFeedbacks}
			</div>
		);
	}
});

var StaffPage = React.createClass({
	getDefaultProps: function() {
		return { calledAnimation: false };
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.checkReached, false);
	},
	checkReached: function() {
		if (!ruler.haveReaching(this.refs.inAnchor))
			return;
		if (this.props.calledAnimation)
			return;
		this.props.calledAnimation = true;
		window.removeEventListener('scroll', this.checkReached, false);
		staffPageAnimation();
	},
	render: function() {
		return (
			<div>
			<div className="staffPage pageContainer">
				<div className="left">
					<h2>工作團隊</h2>
					<Table applyClass="staffPageTable" rowClass="slideInUpPre"  ref="inAnchor">
						{staffTaChi}
					</Table>
					<img src={"img/boy.png"} />
				</div>
			</div>

			<StudentFeedback feedbackData={feedbackData}/>
		</div>
		);
	}
});

ReactDOM.render(
	<StaffPage />,
	document.getElementById('staffPage')
);

var staffPageAnimateOk = false;

function staffPageAnimation() {
	setTimeout(function() { staffPageAnimateOk = true }, 800);
	var slideInUp = document.querySelectorAll('#staffPage .staffPage .slideInUpPre');
	for (var i = 0; i < slideInUp.length; ++i) {
		slideInUp[i].className = slideInUp[i].className +
			" delay" + (i);
	}
	for (var i = 0; i < slideInUp.length; ++i)
		slideInUp[i].className = slideInUp[i].className + " slideInUp";
	slideInUp = null;
}

function studentFeedbackAnimation() {
	if (!staffPageAnimateOk) {
		setTimeout(function() { studentFeedbackAnimation(); }, 100);
		return;
	}
	var slideInUp = document.querySelectorAll('#staffPage .studentFeedback .slideInUpPre');
	for (var i = 0; i < slideInUp.length; ++i) {
		slideInUp[i].className = slideInUp[i].className +
			" delay" + (2 + i * 2);
	}
	for (var i = 0; i < slideInUp.length; ++i)
		slideInUp[i].className = slideInUp[i].className + " slideInUp";
	setTimeout(function() {
		for (var i = 0; i < slideInUp.length; ++i)
			slideInUp[i].className = slideInUp[i].className + " borderShow";
		slideInUp = null;
	}, 600);
}
