'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_wepy$page) {
    _inherits(Admin, _wepy$page);

    function Admin() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Admin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Admin.__proto__ || Object.getPrototypeOf(Admin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.methods = {
            formSubmit: function formSubmit(e) {
                var self = this;

                var sendFormData = e.detail.value; // form 表单数据

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/insert_admin',
                    method: 'POST',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '添加成功', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not consistent!") {
                                wx.showToast({
                                    title: '两次密码不一致', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Username existed!") {
                                wx.showToast({
                                    title: '用户名已存在', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            }
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Admin, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Admin;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Admin , 'pages/admin/create-admin'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1hZG1pbi5qcyJdLCJuYW1lcyI6WyJBZG1pbiIsImRhdGEiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJzZWxmIiwic2VuZEZvcm1EYXRhIiwiZGV0YWlsIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJNc2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBSyxFLFFBSUxDLE8sR0FBUztBQUNMQyxzQkFESyxzQkFDTUMsQ0FETixFQUNTO0FBQ1Ysb0JBQUlDLE9BQU8sSUFBWDs7QUFFQSxvQkFBSUMsZUFBZUYsRUFBRUcsTUFBRixDQUFTQyxLQUE1QixDQUhVLENBR3dCOztBQUVsQ0Msd0JBQVFDLEdBQVIsQ0FBWUosWUFBWjtBQUNBSywrQkFBS0MsT0FBTCxDQUFhO0FBQ1RDLHlCQUFJRixlQUFLRyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHlCQURqQztBQUVUQyw0QkFBTyxNQUZFO0FBR1RoQiwwQkFBTUssWUFIRztBQUlUWSw0QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSkM7QUFLVEMsNkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQlosZ0NBQVFDLEdBQVIsQ0FBWVcsR0FBWjtBQUNBLDRCQUFJQSxJQUFJcEIsSUFBSixDQUFTcUIsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQkMsK0JBQUdDLFNBQUgsQ0FBYTtBQUNQQyx1Q0FBTyxNQURBLEVBQ1E7QUFDZkMsc0NBQU0sU0FGQyxFQUVVO0FBQ2pCQyxzQ0FBTSxJQUhDLEVBR0s7QUFDWlAseUNBQVMsc0JBQU8sQ0FBRTtBQUpYLDZCQUFiO0FBT0gseUJBUkQsTUFRTyxJQUFHQyxJQUFJcEIsSUFBSixDQUFTcUIsSUFBVCxJQUFpQixDQUFwQixFQUFzQjtBQUN6QixnQ0FBR0QsSUFBSXBCLElBQUosQ0FBUzJCLEdBQVQsSUFBZ0IsMEJBQW5CLEVBQThDO0FBQzFDTCxtQ0FBR0MsU0FBSCxDQUFhO0FBQ1hDLDJDQUFPLFNBREksRUFDTztBQUNsQkMsMENBQU0sT0FGSyxFQUVJO0FBQ2ZDLDBDQUFNLElBSEssRUFHQztBQUNaUCw2Q0FBUyxzQkFBTyxDQUFFO0FBSlAsaUNBQWI7QUFNSCw2QkFQRCxNQU9PLElBQUdDLElBQUlwQixJQUFKLENBQVMyQixHQUFULElBQWdCLG1CQUFuQixFQUF1QztBQUMxQ0wsbUNBQUdDLFNBQUgsQ0FBYTtBQUNYQywyQ0FBTyxRQURJLEVBQ007QUFDakJDLDBDQUFNLE9BRkssRUFFSTtBQUNmQywwQ0FBTSxJQUhLLEVBR0M7QUFDWlAsNkNBQVMsc0JBQU8sQ0FBRTtBQUpQLGlDQUFiO0FBTUg7QUFDSjtBQUNKO0FBaENRLGlCQUFiO0FBbUNIO0FBMUNJLFM7Ozs7O2lDQWdEQSxDQUNSOzs7O0VBdEQ4QlQsZUFBS2tCLEk7O2tCQUFuQjdCLEsiLCJmaWxlIjoiY3JlYXRlLWFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkbWluIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YT17XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzZW5kRm9ybURhdGEgPSBlLmRldGFpbC52YWx1ZSAvLyBmb3JtIOihqOWNleaVsOaNrlxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vaW5zZXJ0X2FkbWluJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzZW5kRm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+a3u+WKoOaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLkNvZGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlBhc3N3b3JkIG5vdCBjb25zaXN0ZW50IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Lik5qyh5a+G56CB5LiN5LiA6Ie0JywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlVzZXJuYW1lIGV4aXN0ZWQhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnlKjmiLflkI3lt7LlrZjlnKgnLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=