
var says = [
	{
		who:'TechNews 科技新報',
		url:'http://technews.tw/2015/08/10/sitcon-summer-camp-2015/',
		show:'走在街上，可以看到人手一台智慧型手機，生活周遭的事物也漸漸數位化，在這股潮流下，幾乎可以確定資訊是未來的趨勢，而資訊教育也顯得格外重要。「SITCON 學生計算機年會」從 2014 年開始......'
	},
	{
		who:'揪凱',
		url:'http://home.gamer.com.tw/creationDetail.php?sn=2991598',
		show:'猶還記得去年的SITCON Camp 2014使我學習到了許多有關電資的技巧，而今年（2015）的夏令營也終於舉行！為期四天共兩梯次的SITCON Camp 2015在聖約翰科技大學舉行！'
	}
];

var React = require('react');
var ReactDOM = require('react-dom');

var OtherSay  =React.createClass({
	render: function(){
		return (
			<div className="otherSay">
				<p>
					{this.props.which.show}
				</p>
				<a target="_blank" href={this.props.which.url}>&gt; 完整閱讀</a>
				<div className="whosay">{this.props.which.who}</div>
			</div>
		);
	}
});

var Footer = React.createClass({
	render: function() {
		return (
			<div className="Footer">
				<footer>{"學生計算機年會籌備團隊"}</footer>
				<div className="followUs">
					<a target="_blank" href="https://www.facebook.com/SITCONCamp">
						<img src="img/fb.png" title="fb" />
					</a>
					<a target="_blank" href="https://www.flickr.com/photos/sitcon/sets/">
						<img src="img/flickr.png" title="flickr" />
					</a>
					<a target="_blank" href="https://www.youtube.com/channel/UCMXFGmpqKAowZMbvz2O2aEw">
						<img src="img/youtube.png" title="youtube" />
					</a>
					<a target="_blank" href="http://sitcon.org/2016/">
						<img src="img/sitcon.png" title="sitcon" />
					</a>
				</div>
				<div className="otherSayBlock">
					<OtherSay which={says[0]}/>
					<OtherSay which={says[1]}/>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Footer />,
	document.getElementById('footer')
);