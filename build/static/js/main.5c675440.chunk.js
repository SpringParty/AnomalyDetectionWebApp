(this.webpackJsonpanomaly_detection_web_app=this.webpackJsonpanomaly_detection_web_app||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n(5),a=n.n(r),c=(n(14),n(2)),o=n.n(c),i=n(4),p=n(6),u=n(7),l=n(9),h=n(8),j=n.p+"static/media/logo.6ce24c58.svg",d=(n(16),n(0)),b=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(p.a)(this,n);for(var s=arguments.length,r=new Array(s),a=0;a<s;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))).state={response:"",post:"",responseToPost:""},e.callapi=Object(i.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/models");case 2:return t=e.sent,e.next=5,t.json();case 5:if(n=e.sent,200===t.status){e.next=8;break}throw Error(n.message);case 8:return e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)}))),e.handleSubmit=function(){var t=Object(i.a)(o.a.mark((function t(n){var s,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,fetch("/api/detect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({post:e.state.post})});case 3:return s=t.sent,t.next=6,s.text();case 6:r=t.sent,e.setState({responseToPost:r});case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.callapi().then((function(t){return e.setState({response:t.express})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(d.jsxs)("p",{children:["Edit ",Object(d.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(d.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]}),Object(d.jsx)("p",{children:this.state.response}),Object(d.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(d.jsx)("p",{children:Object(d.jsx)("strong",{children:"Post to Server:"})}),Object(d.jsx)("input",{type:"text",value:this.state.post,onChange:function(t){return e.setState({post:t.target.value})}}),Object(d.jsx)("button",{type:"submit",children:"Submit"})]}),Object(d.jsx)("p",{children:this.state.responseToPost})]})}}]),n}(s.Component),f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,s=t.getFID,r=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),s(e),r(e),a(e),c(e)}))};a.a.render(Object(d.jsx)(b,{}),document.getElementById("root")),f()}},[[18,1,2]]]);
//# sourceMappingURL=main.5c675440.chunk.js.map