/*var tmpContent = ["人生總充滿著不可思議，覺得不可能的事情也許下一秒就發生在眼前，即使如此我們還是會笑、會難過、會吵架，也會將努力灑落在夢想與希望的種子上。",
"有些害羞內向的鎮長、和藹可親的副鎮長、喜歡小道消息的執行官、認真負責的訓練官，和其他好多好多的大家都是同為新手鎮努力的一份子，過程中也許有一點溫馨、有一點搞笑，還帶點苦澀，但這是我們的故事，要一起來嗎？"];
*/
var enrolledName = [
	['呂Ｏ浩', '蘇Ｏ文', '許Ｏ慈', '林Ｏ岸', '張Ｏ語', '林Ｏ培', '張Ｏ宸', '張Ｏ', 'Peter Chang', '胡Ｏ芳', '盧Ｏ均', '黃Ｏ傑', '湯Ｏ摯', '姚Ｏ辰', '吳Ｏ嘉', '劉Ｏ函', '蔡Ｏ霖', '陳Ｏ銓', '盧Ｏ達', '鄭Ｏ卉', '王Ｏ澤', '林Ｏ倫', '陳Ｏ心', '陳Ｏ樺', '鍾Ｏ瑋', '鄭Ｏ謙', '蔡Ｏ夆', '蔡Ｏ哲', '詹Ｏ詠', '康Ｏ浩', '葉Ｏ多', '梁Ｏ東', '陳Ｏ阜', '鄭Ｏ尹', '林Ｏ瀚', '姜Ｏ妤', '李Ｏ庭', '余Ｏ序', '許Ｏ彬', '黃Ｏ維', '吳Ｏ達', '林Ｏ豐', '李Ｏ瑀', '戴Ｏ儀', '朱Ｏ廣', '汪Ｏ亮', '林Ｏ', '張Ｏ喬', ],
	['藍Ｏ瑾', '楊Ｏ菱', 'PN Wu', '于Ｏ', ],
];
var enrolledNameTable = [
	[],
	[],
];
for (var i in enrolledName) {
	for (var j = 0; j < enrolledName[i].length; j += 5) {
		enrolledNameTable[i].push(
			enrolledName[i].slice(j, j + 5)
		)
	}
}

var React = require('react');
var ReactDOM = require('react-dom');
var ruler = require('../partial/ruler.jsx');
var Table = require('../partial/table.jsx');

var EnrollPage = React.createClass({
	getDefaultProps: function() {
		return { calledAnimation: false };
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.checkReached, false);
	},
	checkReached: function() {
		if (!ruler.haveReached(document.getElementById('enrollPage')))
			return;
		if (this.props.calledAnimation)
			return;
		this.props.calledAnimation = true;
		window.removeEventListener('scroll', this.checkReached, false);
		enrollPageAnimation();
	},
	render: function() {
		return (
			<div className="enrollPage">
				<div className="pageContainer">
					<div className="left">
						<h2>錄取團員</h2>
						{/* <div className="tmpContent" style={{textAlign: 'center'}}>近期公開</div>*/}
						<h3>正取</h3>
						<Table applyClass="enrollPageTable" colClass="popInPre">
							{enrolledNameTable[0]}
						</Table>
						<h3>備取 <small className="hint">若正取學員未在期限前成功繳費，我們將會依後補順序寄信通知候補學員</small></h3>
						<Table applyClass="enrollPageTable" colClass="popInPre">
							{enrolledNameTable[1]}
						</Table>
						<img className="girl" src={"img/girl.png"} />
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<EnrollPage />,
	document.getElementById('enrollPage')
);

function enrollPageAnimation() {
	var popIn = document.querySelectorAll('#enrollPage .col');
	for (var i = 0; i < popIn.length; ++i) {
		popIn[i].className = popIn[i].className +
			" delayRand" +
			(1 + Math.floor((Math.random() * 19)));
	}
	for (var i = 0; i < popIn.length; ++i)
		popIn[i].className = popIn[i].className + " popIn";
	popIn = null;
}
