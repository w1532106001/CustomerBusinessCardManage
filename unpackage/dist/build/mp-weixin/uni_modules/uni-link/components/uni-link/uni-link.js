(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-link/components/uni-link/uni-link"],{"0d25":function(t,n,e){"use strict";var i=e("a922"),u=e.n(i);u.a},1262:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var u=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"25f2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA:function(){return!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created:function(){this._isH5=null},methods:{isMail:function(){return this.href.startsWith("mailto:")},isTel:function(){return this.href.startsWith("tel:")},openURL:function(){t.setClipboardData({data:this.href}),t.showModal({content:this.copyTips,showCancel:!1})},makePhoneCall:function(n){t.makePhoneCall({phoneNumber:n})}}};n.default=e}).call(this,e("543d")["default"])},"2bb2":function(t,n,e){"use strict";e.r(n);var i=e("1262"),u=e("b6e9");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("0d25");var r,o=e("f0c5"),l=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);n["default"]=l.exports},a922:function(t,n,e){},b6e9:function(t,n,e){"use strict";e.r(n);var i=e("25f2"),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-link/components/uni-link/uni-link-create-component',
    {
        'uni_modules/uni-link/components/uni-link/uni-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2bb2"))
        })
    },
    [['uni_modules/uni-link/components/uni-link/uni-link-create-component']]
]);