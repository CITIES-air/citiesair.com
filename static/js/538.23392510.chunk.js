"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[538],{8124:function(t,e,r){var n=r(1413),i=r(9439),a=r(5953),o=r(6015),s=r(4565),l=r(4162),c=r(1441),u=r(9530),d=r(3085),h=r(9388),v=r(4011),f=r(5445),m=r(3511),x=r(4809),p=r(184),g=function(t){var e,r,n,i,a,o=t.sensorData,l=t.isScreen;return l&&o.current.sensor_status===v.vI.active?null:(0,p.jsxs)(s.Z,{variant:l?"h6":"caption",sx:{mt:0,fontWeight:l&&"500 !important"},children:[(null===(e=o.current)||void 0===e?void 0:e.sensor_status)!==v.vI.active&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(h.Z,{sx:{"& *":{color:"".concat(m.Z[3].lightThemeColor," !important")},mr:.5}}),"Offline.\xa0"]}),"Last update:",null!==(r=o.current)&&void 0!==r&&r.timestamp||null!==(n=o.sensor)&&void 0!==n&&n.last_seen?" ".concat((0,v.Zj)((null===(i=o.current)||void 0===i?void 0:i.timestamp)||(null===(a=o.sensor)||void 0===a?void 0:a.last_seen))," ago"):"--"]})};e.Z=function(t){var e=t.currentSensorsData,r=t.temperatureUnitPreference,h=t.isScreen,m=void 0===h||h;return(0,p.jsx)(a.ZP,{container:!0,justifyContent:"center",sx:{"& .MuiSvgIcon-root":{verticalAlign:"sub",fontSize:m?null:"1rem"},"& *":{fontWeight:"500"},"& .condensedFont":{fontFamily:"IBM Plex Sans Condensed, sans-serif !important","& *":{fontFamily:"IBM Plex Sans Condensed, sans-serif !important"}}},children:e?Object.entries(e).map((function(t,l){var c,h,Z,j,y,S,b,w,I,q,C,_,k,M,P=(0,i.Z)(t,2),U=P[0],F=P[1];return(0,p.jsxs)(a.ZP,(0,n.Z)((0,n.Z)({item:!0},(M=Object.keys(e).length,{xs:Math.max(12/M,6),sm:Math.max(12/M,4),lg:m?12/M:Math.min(5,Math.max(12/M,2))})),{},{sx:(null===(c=F.current)||void 0===c?void 0:c.sensor_status)!==v.vI.active&&{"& *":{color:"".concat(x.Z.universal.palette.inactiveSensor)}},children:[(0,p.jsxs)(o.Z,{sx:{"& *":{color:null===(h=F.current)||void 0===h?void 0:h.color}},children:[(0,p.jsx)(s.Z,{variant:m?"h4":"h5",fontWeight:"500",className:"condensedFont",children:(null===(Z=F.sensor)||void 0===Z?void 0:Z.location_long)||(null===(j=F.sensor)||void 0===j?void 0:j.location_short)||"No Location Name"}),(0,p.jsx)(s.Z,{variant:m?"h1":"h2",fontWeight:"500",lineHeight:m?.8:.9,children:(null===(y=F.current)||void 0===y?void 0:y.aqi)||"--"}),(0,p.jsx)(s.Z,{variant:m?"h4":"h5",fontWeight:"500",className:"condensedFont",children:(null===(S=F.current)||void 0===S?void 0:S.category)||"--"})]}),(0,p.jsxs)(o.Z,{sx:{"& *":{color:m?(null===(b=F.current)||void 0===b?void 0:b.sensor_status)===v.vI.active?"#c8dcff":x.Z.universal.palette.inactiveSensor:"text.secondary"},mt:m?2:1},className:"condensedFont",children:[(0,p.jsxs)(s.Z,{variant:m?"h6":"body1",children:[(0,p.jsx)(u.Z,{}),(0,f.Lo)({rawTemp:null===(w=F.current)||void 0===w?void 0:w.temperature,currentUnit:f.fG.celsius,returnUnit:r}),"\xa0\xa0-\xa0",(0,p.jsx)(d.Z,{sx:{transform:"scaleX(0.9)"}}),null!==(I=F.current)&&void 0!==I&&I.rel_humidity?Math.round(null===(q=F.current)||void 0===q?void 0:q.rel_humidity):"--","%"]}),["outdoors","indoors_gym"].includes(null===(C=F.sensor)||void 0===C?void 0:C.location_type)&&(0,p.jsx)(s.Z,{variant:m?"body1":"body2",sx:{fontWeight:"300 !important"},children:(0,f.qu)({rawTemp:null===(_=F.current)||void 0===_?void 0:_.temperature,currentUnit:f.fG.celsius,rel_humidity:null===(k=F.current)||void 0===k?void 0:k.rel_humidity,returnUnit:r})}),g({sensorData:F,isScreen:m})]}),F.sensor_status!==v.vI.active&&(0,p.jsx)(s.Z,{variant:m?"h6":"body1",className:"condensedFont",children:(0,v.Tm)(F)})]}),U)})):(0,p.jsxs)(l.Z,{direction:"column",alignItems:"center",justifyContent:"center",children:[(0,p.jsx)(c.Z,{variant:"text",sx:{width:"15rem",fontSize:"2rem"}}),(0,p.jsx)(c.Z,{variant:"text",sx:{width:"5rem",fontSize:"4rem",my:-1.5}}),(0,p.jsx)(c.Z,{variant:"text",sx:{width:"10rem",fontSize:"2rem"}}),(0,p.jsx)(c.Z,{variant:"text",sx:{width:"7.5rem",fontSize:"1rem"}}),(0,p.jsx)(c.Z,{variant:"text",sx:{width:"7.5rem",fontSize:"1rem"}})]})})}},6538:function(t,e,r){r.r(e),r.d(e,{default:function(){return q}});var n=r(9439),i=r(2791),a=r(6871),o=r(1781),s=r(2087),l=r(4346),c=r(4565),u=r(5953),d=r(4162),h=r(6015),v=r(5629),f=r(2069),m=r(4011),x=(r(5445),r(7762)),p=r(3092),g=r(2377),Z=r(3511),j=r(4809),y=r(184),S=function(t){var e,r,a,o,s=t.data,l=(0,i.useState)(!0),c=(0,n.Z)(l,2),u=(c[0],c[1],(0,i.useRef)()),d=(0,i.useRef)(),v=(0,i.useRef)(),f=(0,i.useRef)(),S=(0,i.useRef)(),b=200,w=30,I=80,q=70,C=p.jvg().x((function(t){return a(t.timestamp)})).y((function(t){return o(t.aqi)})).curve(p.YY7.tension(0));return(0,i.useEffect)((function(){if(s&&u.current&&d.current&&v.current&&f.current&&S.current){p.Ys(u.current),e=u.current.clientWidth,r=u.current.clientHeight-w,p.Ys(d.current).selectAll("*").remove(),p.Ys(v.current).selectAll("*").remove(),p.Ys(f.current).selectAll("*").remove(),p.Ys(S.current).selectAll("*").remove(),p.Ys(d.current).attr("opacity",.5),p.Ys(v.current).attr("filter","brightness(0.8) contrast(1.2) saturate(1.2)"),Object.entries(s).forEach((function(t){var e,r=(0,n.Z)(t,2),i=(r[0],r[1]);if(null===(e=i.historical)||void 0===e||e.forEach((function(t){t.timestamp=new Date(t.timestamp),t.aqi=(0,g.Z)(t["pm2.5"]).aqi})),i.historical&&Array.isArray(i.historical)){var a=p.Fp7(i.historical,(function(t){return t.aqi}));a>b&&(b=a)}})),b=50*Math.ceil(b/50);var t,i=(0,x.Z)(Z.Z);try{for(i.s();!(t=i.n()).done;){var l=t.value;if(b>=l.aqiUS.low&&b<=l.aqiUS.high){b=l.aqiUS.high;break}}}catch(F){i.e(F)}finally{i.f()}var c=new Date,h=new Date;h.setHours(h.getHours()-6),a=p.Xf().domain([h,c]).rangeRound([q,e-I]),o=p.BYU().domain([0,b]).range([r+w,w]);for(var y=Math.floor((Z.Z[1].aqiUS.high-Z.Z[0].aqiUS.high)/b*r/2),_=Math.floor(y/5),k=0;k<Z.Z.length;k++){var M=Z.Z[k];if(b<=M.aqiUS.low)break;var P=50*Math.ceil((M.aqiUS.high-M.aqiUS.low)/50);p.Ys(d.current).append("rect").attr("x",0).attr("y",r-M.aqiUS.high/b*r+w).attr("width",e).attr("height",P/b*r).attr("fill",M.lightThemeColor),p.Ys(v.current).append("text").attr("x",_).attr("y",r-M.aqiUS.low/b*r-3.5*_+w).attr("fill",M.lightThemeColor).attr("font-size",y).text(50*Math.floor(M.aqiUS.low/50)),p.Ys(v.current).append("text").attr("class","category-text-graph-sm").attr("x",_+2).attr("y",r-M.aqiUS.low/b*r-_+w).attr("fill",M.lightThemeColor).attr("font-size",y/2).text(M.category)}p.Ys(f.current).append("rect").attr("x",0).attr("y",0).attr("width",e).attr("height",w).attr("fill","white");var U=p.i$Z("%H:%M");p.Ys(f.current).append("g").attr("transform","translate(0,".concat(w,")")).call(p.F5q(a).tickSize(-r).ticks(p.Z_i.every(120)).tickFormat((function(t){return U(t)}))).attr("font-size",y/2.25).attr("color",j.Z.universal.palette.inactiveSensor).select(".domain").remove(),p.Ys(f.current).selectAll("line").attr("stroke","white").attr("stroke-width",2).attr("opacity",.5),Object.entries(s).forEach((function(t){var e,r,i,s=(0,n.Z)(t,2),l=(s[0],s[1]);p.Ys(S.current).append("path").datum(l.historical||[]).attr("x",q).attr("class","line").attr("d",C).attr("fill","transparent").attr("stroke","black").attr("stroke-width","5px").attr("opacity","outdoors"===(null===(e=l.sensor)||void 0===e?void 0:e.location_type)?1:.5);var c=(null===(r=l.historical)||void 0===r?void 0:r.length)>0?null===(i=l.historical)||void 0===i?void 0:i[0]:null;if(c){var u,d,h,v,f=Z.Z[(0,g.Z)(c["pm2.5"]).aqi_category_index],x=p.Ys(S.current).append("g").attr("transform","translate("+a(c.timestamp)+","+o(c.aqi)+")").attr("fill",(null===(u=l.current)||void 0===u?void 0:u.sensor_status)===m.vI.active?f.lightThemeColor:j.Z.universal.palette.inactiveSensor);(null===(d=l.current)||void 0===d?void 0:d.sensor_status)===m.vI.active&&x.append("circle").attr("cx",0).attr("cy",0).attr("filter","brightness(0.5)").attr("class","pulse-ring").attr("r",25),x.append("circle").attr("cx",0).attr("cy",0).attr("stroke","#666").attr("class",(null===(h=l.current)||void 0===h?void 0:h.sensor_status)===m.vI.active&&"pulse-dot").attr("r",10),x.append("text").attr("class","location-label").attr("x",15).attr("y",0).attr("fill","black").attr("alignment-baseline","middle").attr("text-anchor","left").attr("font-size",y/3).text((0,m.KN)(null===(v=l.sensor)||void 0===v?void 0:v.location_short));for(var b=document.getElementsByClassName("location-label"),w=1;w<b.length;w++){var I=b[w-1],_=b[w],k=(0,m.Pk)(I.getBoundingClientRect(),_.getBoundingClientRect());0!==k&&(I.setAttribute("y",10*k),_.setAttribute("y",10*-k))}}}))}}),[s]),(0,y.jsx)(h.Z,{sx:{"& .pulse-ring":{animation:"pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite","@keyframes pulse-ring":{"0%":{transform:"scale(0.2)"},"80%":{},"100%":{opacity:0}}},"& .pulse-dot":{animation:"pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite","@keyframes pulse-dot":{"0%":{transform:"scale(0.5)"},"50%":{transform:"scale(1)",filter:"brightness(1.2) contrast(1.2) saturate(1.2)"},"100%":{transform:"scale(0.5)"}}}},width:"100%",height:"100%",children:(0,y.jsxs)("svg",{id:"recent-historical-graph",width:"100%",height:"100%",ref:u,children:[(0,y.jsx)("g",{ref:d}),(0,y.jsx)("g",{ref:f}),(0,y.jsx)("g",{ref:v}),(0,y.jsx)("g",{ref:S})]})})},b=r(925),w=r(8124),I=r(8206),q=function(t){var e=t.title,r=t.temperatureUnitPreference,x=((0,i.useContext)(o.S).user,(0,a.s0)());(0,i.useEffect)((function(){document.title=e}),[e]);var p=(0,i.useState)(),g=(0,n.Z)(p,2),q=g[0],C=g[1],_=(0,i.useState)({}),k=(0,n.Z)(_,2),M=k[0],P=k[1];(0,i.useEffect)((function(){function t(){return 0!==[0,0,1,1,0,0,1,1,0,0,1,1][(new Date).getMonth()]}C(t());var e=setInterval((function(){C(t())}),864e5);return function(){clearInterval(e)}}),[]),(0,i.useEffect)((function(){var t=(0,I.kG)({endpoint:I.Cq.screen});if(t){(0,I.mQ)(t).then((function(t){P(t)})).catch((function(t){console.log(t),x("/login")}));var e=setInterval((function(){(0,I.mQ)(t).then((function(t){P(t)})).catch((function(t){return console.log(t)}))}),3e5);return function(){clearInterval(e)}}}),[]);var U=function(){if(!Object.values(M).every((function(t){var e;return(null===(e=t.current)||void 0===e?void 0:e.sensor_status)===m.vI.active})))return null;for(var t,e,r=0;r<Object.values(M).length;r++){var n,i=Object.values(M)[r];if("outdoors"===(null===(n=i.sensor)||void 0===n?void 0:n.location_type)){if((t=i.current.aqi)<=Z.Z[0].aqiUS.high)return null}else e=i.current.aqi}var a,o=t/e;if(o>=2)a="".concat(parseFloat(o).toFixed(1)," times");else{if(!(o>1.2))return null;a="".concat(Math.round((t-e)/e*100),"%")}return(0,y.jsx)(s.ZP,{children:(0,y.jsx)(l.Z,{primary:(0,y.jsxs)(y.Fragment,{children:["Indoors air is",(0,y.jsx)(c.Z,{component:"span",color:"".concat(Z.Z[0].lightThemeColor," !important"),children:" ".concat(a," ")}),"better than outdoors"]})})})};return(0,y.jsxs)(u.ZP,{container:!0,alignContent:"stretch",alignItems:"stretch",height:"100vh",sx:{overflow:"hidden",background:"white","& *":{fontWeight:"500 !important"},"& .condensedFont":{fontFamily:"IBM Plex Sans Condensed, sans-serif !important","& *":{fontFamily:"IBM Plex Sans Condensed, sans-serif !important"}},"& .flashingRed":{"& .MuiTypography-root ":{color:"".concat(Z.Z[3].lightThemeColor," !important"),opacity:.8},color:"".concat(Z.Z[3].lightThemeColor," !important"),animation:"flashingRed 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite","@keyframes flashingRed":{"0%":{opacity:1},"50%":{opacity:.5},"100%":{opacity:1}}}},children:[(0,y.jsx)(u.ZP,{item:!0,xs:6,sx:{py:3,px:2,order:q?1:0,background:"#212529"},children:(0,y.jsxs)(d.Z,{direction:"column",justifyContent:"space-between",height:"100%",textAlign:"center",children:[(0,y.jsxs)(h.Z,{children:[(0,y.jsx)(c.Z,{variant:"h4",fontWeight:"500",color:"white",children:"PM2.5 AIR QUALITY INDEX"}),(0,y.jsx)(c.Z,{variant:"h5",className:"condensedFont",color:j.Z.universal.palette.inactiveSensor,children:"Particulate Matter < 2.5\u03bcm"})]}),(0,y.jsx)(u.ZP,{container:!0,justifyContent:"space-around",children:(0,y.jsx)(w.Z,{currentSensorsData:M,temperatureUnitPreference:r})}),(0,y.jsxs)(v.Z,{className:"condensedFont",sx:{listStyleType:"disclosure-closed","& .MuiTypography-root":{fontSize:"1.5rem"},"& .MuiListItem-root":{display:"list-item",ml:3,p:0,pr:3},"& .MuiTypography-root, .MuiListItem-root":{color:j.Z.universal.palette.inactiveSensor}},children:[(0,y.jsx)(U,{}),Object.entries(M).map((function(t){var e,r,i,a=(0,n.Z)(t,2),o=a[0],c=a[1];return(null===(e=c.current)||void 0===e?void 0:e.healthSuggestion)&&(0,y.jsx)(s.ZP,{className:(null===(r=c.current)||void 0===r?void 0:r.aqi)>=Z.Z[2].aqiUS.low&&"flashingRed",children:(0,y.jsx)(l.Z,{primary:null===(i=c.current)||void 0===i?void 0:i.healthSuggestion})},o)}))]})]})}),(0,y.jsxs)(u.ZP,{item:!0,xs:6,sx:{order:q?0:1},children:[(0,y.jsx)(h.Z,{sx:{position:"absolute",top:0,right:!q&&0,left:q&&0,width:"5vw",height:"5vw",m:1},children:(0,y.jsx)(f.Z,{})}),(0,y.jsxs)(u.ZP,{container:!0,alignContent:"space-between",justifyContent:"center",height:"100%",textAlign:"center",children:[(0,y.jsx)(u.ZP,{item:!0,xs:12,sx:{pt:3,px:2},children:(0,y.jsx)(c.Z,{variant:"h4",fontWeight:"500",sx:{color:"black"},children:"AN INITIATIVE BY CITIESair"})}),(0,y.jsx)(u.ZP,{item:!0,xs:2,children:(0,y.jsx)(h.Z,{height:"auto",width:"100%",children:(0,y.jsx)(b.ZP,{size:256,style:{height:"auto",maxWidth:"100%",width:"100%"},value:"".concat((0,m.p7)(document.location.href),"?source=").concat((0,m.c9)(document.location.href)),viewBox:"0 0 256 256"})})}),(0,y.jsx)(u.ZP,{item:!0,xs:12,height:"70%",className:"condensedFont",sx:{"& *":{fontWeight:"600 !important"}},children:(0,y.jsx)(S,{data:M})})]})]})]})}}}]);
//# sourceMappingURL=538.23392510.chunk.js.map