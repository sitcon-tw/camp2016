var paywayParagraphs = [
	"$ <span class='left'>\
			活動費用\
		</span>\
		<span class='right'>\
			新台幣 5500 元整\
		</span>",
	"$ <span class='left'>\
			補助辦法\
		</span>\
		<span class='right'>\
			<a id='linkHelpFinancial' href='data/SITCONCamp2016help.pdf' target='_blank'>\
				報名費用補助辦法\
			</a>\
		</span>",
	"$ <span class='left'>\
			開放報名\
		</span>\
		<span class='right'>\
			2016 . 05 . 22\
		</span>",
	"$ <span class='left'>\
			報名截止\
		</span>\
		<span class='right'>\
			2016 . 06 . 12\
		</span>",
	"$ <span> </span>",
	"$ 本次營隊報名採用KKTIX <a id='linkDetailProc' href='data/SITCONCamp2016takePartIn.pdf' target='_blank'>詳細報名流程</a>",
	"$ <div class='registBlock'>\
			<a target='_blank' class='regist1' href='http://sitcon.kktix.cc/events/camp-16-1'>\
				<p>我要報名</p>\
				<p>08.02 ~ 08.05</p>\
			</a>\
		</div>",
	"注意事項",
	"$ <ol>\
			<li>正取學員之邀請碼不得轉讓他人使用。</li>\
			<li>繳費後方為完成報名程序，正取學員需於公告名單後幾日完成報名，逾期名額將釋放給候補學員。</li>\
			<li>後續通知及行前注意事項均將透過學員填寫之電子信箱聯繫，請務必保持收信以免影響個人權益。</li>\
			<li>可以在此下載<a href='data/SITCONCamp2016.pdf' target='_blank'>報名簡章</a>任何相關問題請寄信至 <a href='mailto:ask@sitcon.camp'>ask@sitcon.camp</a> ，我們將盡快與您連絡。</li>\
		</ol>",
];

var React = require('react');
var ReactDOM = require('react-dom');
var Article = require('../partial/article.jsx');
//var Info = require('../partial/info.jsx');

var HelpFinancial = React.createClass({
	render: function() {
		return (
			<div className="HelpFinancialContent">
				<iframe src="http://docs.google.com/gview?url=http://ssinrc.org" frameborder="0">
				</iframe>
			</div>
		);
	}
});

var PaywayPage = React.createClass({
	render: function() {
		/*

						<Info htmlID="helpFinancial" clickTriggerId="linkHelpFinancial">
							<HelpPayWay />
						</Info>
		*/
		return (
			<div className="paywayPage pageContainer">
				<h2>報 名</h2>
				<Article applyClass={"paywayArticle"}>
					{paywayParagraphs}
				</Article>
			</div>
		);
	}
});

ReactDOM.render(
	<PaywayPage />,
	document.getElementById('paywayPage')
);
