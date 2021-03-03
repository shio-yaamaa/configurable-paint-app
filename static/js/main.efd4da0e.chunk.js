(this["webpackJsonpconfigurable-paint-app"]=this["webpackJsonpconfigurable-paint-app"]||[]).push([[0],[,,,,,,,,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),c=t(4),o=t.n(c),i=(t(11),t(12),t(2)),l=(t(13),t(14),t(0)),u=function(e){return Object(r.useEffect)((function(){e.initCanvas()})),Object(l.jsx)("div",{className:"Canvas",children:Object(l.jsx)("canvas",{className:"Canvas-canvas",width:e.width,height:e.height,ref:e.canvasRef})})},s=(t(16),t(17),function(e){return Object(l.jsx)("div",{className:"PenPreview",children:Object(l.jsx)("div",{className:"PenPreview-content",style:{width:e.penSize,height:e.penSize,backgroundColor:e.color}})})}),d=(t(18),function(e){return Object(l.jsx)("div",{className:"ColorPicker",children:Object(l.jsx)("input",{className:"ColorPicker-input",type:"color",value:e.color,onChange:function(n){return e.handleColorChange(n.currentTarget.value)}})})}),h=(t(19),function(e){return Object(l.jsx)("div",{className:"ColorPalette",children:e.colors.map((function(n,t){return Object(l.jsx)("div",{className:"ColorPalette-option",style:{backgroundColor:n},onClick:function(){return e.handleColorChange(n)}},t)}))})}),b=(t(20),function(e){return Object(l.jsxs)("div",{className:"SizePicker",children:[Object(l.jsx)("input",{className:"SizePicker-range-input",type:"range",value:e.size,min:e.min,max:e.max,onChange:function(n){return e.handleSizeChange(parseInt(n.currentTarget.value))}}),Object(l.jsx)("input",{className:"SizePicker-number-input",type:"number",value:e.size,min:e.min,max:e.max,onChange:function(n){return e.handleSizeChange(parseInt(n.currentTarget.value))}})]})}),f=function(e){return Object(l.jsxs)("aside",{className:"Toolbar",children:[Object(l.jsxs)("div",{className:"Toolbar-top",children:[Object(l.jsxs)("div",{className:"Toolbar-section",children:[Object(l.jsx)("h1",{className:"Toolbar-title",children:"Pen Preview"}),Object(l.jsx)(s,{color:e.color,penSize:e.penSize})]}),Object(l.jsxs)("div",{className:"Toolbar-section",children:[Object(l.jsx)("h1",{className:"Toolbar-title",children:"Color"}),Object(l.jsx)(d,{color:e.color,handleColorChange:e.handleColorChange}),e.paletteColors.length>0&&Object(l.jsx)(h,{colors:e.paletteColors,handleColorChange:e.handleColorChange})]}),Object(l.jsxs)("div",{className:"Toolbar-section",children:[Object(l.jsx)("h1",{className:"Toolbar-title",children:"Pen Size"}),Object(l.jsx)(b,{min:e.minPenSize,max:e.maxPenSize,size:e.penSize,handleSizeChange:e.handlePenSizeChange})]}),Object(l.jsx)("div",{className:"Toolbar-section",children:Object(l.jsx)("button",{className:"Toolbar-button",onClick:function(){return e.fillCanvas(e.color)},children:"Fill"})})]}),Object(l.jsxs)("div",{className:"Toolbar-bottom",children:[Object(l.jsx)("button",{className:"Toolbar-button ".concat(e.canUndo?"":"disabled"),onClick:e.undo,children:"Undo"}),Object(l.jsx)("button",{className:"Toolbar-button ".concat(e.canRedo?"":"disabled"),onClick:e.redo,children:"Redo"}),Object(l.jsx)("button",{className:"Toolbar-button",onClick:e.clearCanvas,children:"Clear"}),Object(l.jsx)("a",{className:"Toolbar-button",download:"image.png",onClick:e.handleDownload,href:e.dataUrl,children:"Save"}),Object(l.jsx)("a",{className:"Toolbar-link",href:"https://github.com/shio-yaamaa/configurable-paint-app",target:"_blank",rel:"noreferrer",children:"About this page"})]})]})},j=t(5),v=t(6),C=function(){function e(n){Object(j.a)(this,e),this.maxLength=void 0,this.snapshots=[],this.position=-1,this.maxLength=Math.max(n,1)}return Object(v.a)(e,[{key:"push",value:function(e){this.snapshots=this.snapshots.slice(0,this.position+1),this.snapshots.push(e),this.position<this.maxLength?this.position++:this.snapshots.shift()}},{key:"canUndo",value:function(){return void 0!==this.snapshots[this.position-1]}},{key:"canRedo",value:function(){return void 0!==this.snapshots[this.position+1]}},{key:"undo",value:function(){if(!this.canUndo())return null;var e=this.snapshots[this.position-1];return this.position--,e}},{key:"redo",value:function(){if(!this.canRedo())return null;var e=this.snapshots[this.position+1];return this.position++,e}}]),e}(),g=function(e){var n=function(e){var n,t=Object(r.useRef)(),a=Object(r.useRef)(null===t||void 0===t||null===(n=t.current)||void 0===n?void 0:n.getContext("2d")),c=Object(r.useState)(e.initialPenColor),o=Object(i.a)(c,2),l=o[0],u=o[1],s=Object(r.useState)(e.initialPenSize),d=Object(i.a)(s,2),h=d[0],b=d[1],f=Object(r.useRef)(!1),j=Object(r.useRef)(!1),v=Object(r.useRef)(!1),g=Object(r.useRef)(0),p=Object(r.useRef)(0),m=Object(r.useRef)(new C(30)),O=Object(r.useState)(m.current.canUndo()),x=Object(i.a)(O,2),k=x[0],S=x[1],P=Object(r.useState)(m.current.canRedo()),z=Object(i.a)(P,2),w=z[0],N=z[1],R=Object(r.useCallback)((function(){if(a.current){var e=m.current.undo();null!==e&&(a.current.putImageData(e,0,0),S(m.current.canUndo()),N(m.current.canRedo()),j.current=!0)}}),[]),T=Object(r.useCallback)((function(){if(a.current){var e=m.current.redo();null!==e&&(a.current.putImageData(e,0,0),S(m.current.canUndo()),N(m.current.canRedo()),j.current=!0)}}),[]),U=Object(r.useCallback)((function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t&&t.current&&a&&a.current&&(a.current.fillStyle=e,a.current.fillRect(0,0,t.current.width,t.current.height),m.current.push(a.current.getImageData(0,0,t.current.width,t.current.height)),S(m.current.canUndo()),N(m.current.canRedo()),n&&(j.current=!0))}),[]),y=Object(r.useCallback)((function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];U(e.backgroundColor,n)}),[e.backgroundColor,U]),L=Object(r.useCallback)((function(e){if(a&&a.current){v.current=!0,a.current.beginPath(),a.current.moveTo(e.offsetX,e.offsetY),a.current.lineTo(e.offsetX,e.offsetY),a.current.stroke();var n=[e.offsetX,e.offsetY];g.current=n[0],p.current=n[1]}}),[]),E=Object(r.useCallback)((function(e){if(a&&a.current&&v.current){a.current.beginPath(),a.current.moveTo(g.current,p.current),a.current.lineTo(e.offsetX,e.offsetY),a.current.stroke();var n=[e.offsetX,e.offsetY];g.current=n[0],p.current=n[1]}}),[]),D=Object(r.useCallback)((function(){v.current&&(v.current=!1,a.current&&t.current&&(m.current.push(a.current.getImageData(0,0,t.current.width,t.current.height)),S(m.current.canUndo()),N(m.current.canRedo()),j.current=!0))}),[]),I=Object(r.useCallback)((function(e){if(1===(1&e.buttons)){v.current=!0;var n=[e.offsetX,e.offsetY];g.current=n[0],p.current=n[1]}else v.current&&D()}),[D]),_=Object(r.useCallback)((function(){var e;a.current=null===t||void 0===t||null===(e=t.current)||void 0===e?void 0:e.getContext("2d"),!f.current&&t&&t.current&&a&&a.current&&(t.current.addEventListener("mousedown",L),t.current.addEventListener("mousemove",E),t.current.addEventListener("mouseup",D),t.current.addEventListener("mouseout",E),t.current.addEventListener("mouseover",I),a.current.strokeStyle=l,a.current.lineJoin="round",a.current.lineCap="round",a.current.lineWidth=h,y(!1),f.current=!0)}),[l,h,L,E,D,I,y]),X=Object(r.useCallback)((function(e){u(e),a.current&&(a.current.strokeStyle=e)}),[]),Y=Object(r.useCallback)((function(e){e<0||(b(e),a.current&&(a.current.lineWidth=e))}),[]),A=Object(r.useCallback)((function(){j.current=!1}),[]);return[{canvas:t,color:l,penSize:h,canUndo:k,canRedo:w,hasUnsavedChanges:j},{initCanvas:_,clearCanvas:y,fillCanvas:U,handleColorChange:X,handlePenSizeChange:Y,undo:R,redo:T,notifySave:A}]}(e.config),t=Object(i.a)(n,2),a=t[0],c=a.canvas,o=a.color,s=a.penSize,d=a.canUndo,h=a.canRedo,b=a.hasUnsavedChanges,j=t[1],v=j.initCanvas,g=j.clearCanvas,p=j.fillCanvas,m=j.handleColorChange,O=j.handlePenSizeChange,x=j.undo,k=j.redo,S=j.notifySave,P=Object(r.useState)("#"),z=Object(i.a)(P,2),w=z[0],N=z[1],R=Object(r.useCallback)((function(){c&&c.current&&(N(c.current.toDataURL("image/png")),S())}),[c,S]);return Object(r.useEffect)((function(){window.addEventListener("beforeunload",(function(e){if(b.current)return e.preventDefault(),e.returnValue="","Close without saving?";delete e.returnValue}))}),[]),Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(f,{color:o,paletteColors:e.config.paletteColors,penSize:s,minPenSize:1,maxPenSize:100,canUndo:d,canRedo:h,dataUrl:w,clearCanvas:g,fillCanvas:p,handleColorChange:m,handlePenSizeChange:O,undo:x,redo:k,handleDownload:R}),Object(l.jsx)(u,{width:e.config.width,height:e.config.height,canvasRef:c,initCanvas:v})]})},p=/^[0-9a-f]{6}$/,m={width:800,height:600,initialPenColor:"#000000",initialPenSize:10,backgroundColor:"#ffffff",paletteColors:[]},O=function(e,n){var t=e.get(n);if(null===t)return null;var r=parseInt(t);return r>0?r:null},x=function(e,n){var t=e.get(n);return null===t?null:t.match(p)?"#".concat(t):null},k=function(e,n){var t=e.getAll(n);return 0===t.length?null:t.filter((function(e){return e.match(p)})).map((function(e){return"#".concat(e)}))},S=function(e){var n,t,r,a,c,o;return{width:null!==(n=O(e,"width"))&&void 0!==n?n:m.width,height:null!==(t=O(e,"height"))&&void 0!==t?t:m.height,initialPenColor:null!==(r=x(e,"initial_pen_color"))&&void 0!==r?r:m.initialPenColor,initialPenSize:null!==(a=O(e,"initial_pen_size"))&&void 0!==a?a:m.initialPenSize,backgroundColor:null!==(c=x(e,"background_color"))&&void 0!==c?c:m.backgroundColor,paletteColors:null!==(o=k(e,"palette_color"))&&void 0!==o?o:m.paletteColors}}(new URLSearchParams(window.location.search));o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(g,{config:S})}),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.efd4da0e.chunk.js.map