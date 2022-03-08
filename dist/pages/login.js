'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
    _inherits(Login, _wepy$page);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {}
        }, _this.data = {
            icon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=miniprogram_icon.png'

        }, _this.methods = {
            formSubmit: function formSubmit(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/login/admin_login',
                    method: 'GET',
                    data: {
                        username: e.detail.value.username,
                        password: e.detail.value.password
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {

                            if (res.data.Msg == "Admin login success!") {
                                _wepy2.default.setStorageSync("sessionDate", Date.parse(new Date()));
                                _wepy2.default.setStorageSync("sessionToken", res.data.Data["token"]);
                                _wepy2.default.setStorageSync("sessionUserInfo", res.data.Data["userinfo"]);
                                _wepy2.default.$instance.globalData.userInfo = res.data.Data["userinfo"];
                                console.log("login success");
                                self.$apply();
                                setTimeout(function () {
                                    _wepy2.default.navigateBack({ delta: 1 });
                                }, 1000);
                            }
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not correct!") {
                                wx.showToast({
                                    title: '密码错误', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Name not exist!") {
                                wx.showToast({
                                    title: '用户名不存在', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            }
                        }
                    }
                });
            },
            inputChange: function inputChange(e) {
                var self = this;
                self.userinfo[e.currentTarget.dataset.name] = e.detail.value.trim();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsImljb24iLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidXNlcm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsInBhc3N3b3JkIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiTXNnIiwic2V0U3RvcmFnZVN5bmMiLCJEYXRlIiwicGFyc2UiLCJEYXRhIiwidXNlckluZm8iLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibWFzayIsImlucHV0Q2hhbmdlIiwidXNlcmluZm8iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJ0cmltIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsNkJBQWlCO0FBRFosUyxRQU1UQyxJLEdBQUs7QUFDREMsa0JBQUtDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0M7O0FBRDFDLFMsUUFNTEMsTyxHQUFVO0FBRU5DLHNCQUZNLHNCQUVLQyxDQUZMLEVBRU87QUFDVCxvQkFBSUMsT0FBTyxJQUFYOztBQUVBUCwrQkFBS1EsT0FBTCxDQUFhO0FBQ1RDLHlCQUFJVCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHdCQURqQztBQUVUTyw0QkFBTyxLQUZFO0FBR1RaLDBCQUFLO0FBQ0RhLGtDQUFTTCxFQUFFTSxNQUFGLENBQVNDLEtBQVQsQ0FBZUYsUUFEdkI7QUFFREcsa0NBQVNSLEVBQUVNLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQztBQUZ2QixxQkFISTtBQU9UQyw2QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CQyxnQ0FBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0EsNEJBQUdBLElBQUlsQixJQUFKLENBQVNxQixJQUFULElBQWlCLENBQXBCLEVBQXVCOztBQUVuQixnQ0FBR0gsSUFBSWxCLElBQUosQ0FBU3NCLEdBQVQsSUFBZ0Isc0JBQW5CLEVBQTBDO0FBQ3RDcEIsK0NBQUtxQixjQUFMLENBQW9CLGFBQXBCLEVBQW1DQyxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLENBQW5DO0FBQ0F0QiwrQ0FBS3FCLGNBQUwsQ0FBb0IsY0FBcEIsRUFBbUNMLElBQUlsQixJQUFKLENBQVMwQixJQUFULENBQWMsT0FBZCxDQUFuQztBQUNBeEIsK0NBQUtxQixjQUFMLENBQW9CLGlCQUFwQixFQUFzQ0wsSUFBSWxCLElBQUosQ0FBUzBCLElBQVQsQ0FBYyxVQUFkLENBQXRDO0FBQ0F4QiwrQ0FBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCdUIsUUFBMUIsR0FBcUNULElBQUlsQixJQUFKLENBQVMwQixJQUFULENBQWMsVUFBZCxDQUFyQztBQUNBUCx3Q0FBUUMsR0FBUixDQUFZLGVBQVo7QUFDQVgscUNBQUttQixNQUFMO0FBQ0FDLDJDQUFXLFlBQVk7QUFDbkIzQixtREFBSzRCLFlBQUwsQ0FBa0IsRUFBQ0MsT0FBTSxDQUFQLEVBQWxCO0FBQ0gsaUNBRkQsRUFFRyxJQUZIO0FBSUg7QUFDSix5QkFkRCxNQWNPLElBQUdiLElBQUlsQixJQUFKLENBQVNxQixJQUFULElBQWlCLENBQXBCLEVBQXNCO0FBQ3pCLGdDQUFHSCxJQUFJbEIsSUFBSixDQUFTc0IsR0FBVCxJQUFnQix1QkFBbkIsRUFBMkM7QUFDdkNVLG1DQUFHQyxTQUFILENBQWE7QUFDWEMsMkNBQU8sTUFESSxFQUNJO0FBQ2ZqQywwQ0FBTSxPQUZLLEVBRUk7QUFDZmtDLDBDQUFNLElBSEssRUFHQztBQUNabEIsNkNBQVMsc0JBQU8sQ0FBRTtBQUpQLGlDQUFiO0FBTUgsNkJBUEQsTUFPTyxJQUFHQyxJQUFJbEIsSUFBSixDQUFTc0IsR0FBVCxJQUFnQixpQkFBbkIsRUFBcUM7QUFDeENVLG1DQUFHQyxTQUFILENBQWE7QUFDWEMsMkNBQU8sUUFESSxFQUNNO0FBQ2pCakMsMENBQU0sT0FGSyxFQUVJO0FBQ2ZrQywwQ0FBTSxJQUhLLEVBR0M7QUFDWmxCLDZDQUFTLHNCQUFPLENBQUU7QUFKUCxpQ0FBYjtBQU1IO0FBQ0o7QUFDSjtBQXhDUSxpQkFBYjtBQTBDSCxhQS9DSztBQWtETm1CLHVCQWxETSx1QkFrRE01QixDQWxETixFQWtEUztBQUNYLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUs0QixRQUFMLENBQWM3QixFQUFFOEIsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQXRDLElBQThDaEMsRUFBRU0sTUFBRixDQUFTQyxLQUFULENBQWUwQixJQUFmLEVBQTlDO0FBQ0g7QUFyREssUzs7Ozs7aUNBeURELENBR1I7Ozs7RUF6RThCdkMsZUFBS3dDLEk7O2tCQUFuQjdDLEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhPXtcclxuICAgICAgICBpY29uOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1taW5pcHJvZ3JhbV9pY29uLnBuZycsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuXHJcbiAgICAgICAgZm9ybVN1Ym1pdChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2xvZ2luL2FkbWluX2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOmUuZGV0YWlsLnZhbHVlLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOmUuZGV0YWlsLnZhbHVlLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5Db2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLk1zZyA9PSBcIkFkbWluIGxvZ2luIHN1Y2Nlc3MhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25EYXRlXCIsIERhdGUucGFyc2UobmV3IERhdGUoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIscmVzLmRhdGEuRGF0YVtcInRva2VuXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiLHJlcy5kYXRhLkRhdGFbXCJ1c2VyaW5mb1wiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMuZGF0YS5EYXRhW1widXNlcmluZm9cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLkNvZGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlBhc3N3b3JkIG5vdCBjb3JyZWN0IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5a+G56CB6ZSZ6K+vJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLk1zZyA9PSBcIk5hbWUgbm90IGV4aXN0IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55So5oi35ZCN5LiN5a2Y5ZyoJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi51c2VyaW5mb1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXSA9IGUuZGV0YWlsLnZhbHVlLnRyaW0oKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==