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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Admin.__proto__ || Object.getPrototypeOf(Admin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            adminList: [],
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
        }, _this.methods = {
            onClickAdmin: function onClickAdmin(e) {
                var self = this;
                var adminId = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "admin-detail?aid=" + self.adminList[adminId].Aid

                });
            },
            onClickCreateAdmin: function onClickCreateAdmin() {
                this.$navigate({ url: "create-admin" });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Admin, [{
        key: 'getAdminData',
        value: function getAdminData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_admin_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.adminList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getAdminData();
        }
    }]);

    return Admin;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Admin , 'pages/admin/admin'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLmpzIl0sIm5hbWVzIjpbIkFkbWluIiwiZGF0YSIsImFkbWluTGlzdCIsImltZ1VybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kcyIsIm9uQ2xpY2tBZG1pbiIsImUiLCJzZWxmIiwiYWRtaW5JZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJBaWQiLCJvbkNsaWNrQ3JlYXRlQWRtaW4iLCIkbmF2aWdhdGUiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiRGF0YSIsIiRhcHBseSIsImdldEFkbWluRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLHVCQUFVLEVBRFA7QUFFSEMsb0JBQU9DLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0M7QUFGMUMsUyxRQUtQQyxPLEdBQVU7QUFDTkMsd0JBRE0sd0JBQ09DLENBRFAsRUFDVTtBQUNaLG9CQUFJQyxPQUFPLElBQVg7QUFDQSxvQkFBSUMsVUFBVUYsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQXRDO0FBQ0FDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQUksc0JBQW9CUCxLQUFLVCxTQUFMLENBQWVVLE9BQWYsRUFBd0JPOztBQUR0QyxpQkFBZDtBQUlILGFBUks7QUFVTkMsOEJBVk0sZ0NBVWM7QUFDaEIscUJBQUtDLFNBQUwsQ0FBZSxFQUFDSCxLQUFJLGNBQUwsRUFBZjtBQUNIO0FBWkssUzs7Ozs7dUNBZUs7QUFDWCxnQkFBSVAsT0FBTyxJQUFYOztBQUVBUCwyQkFBS2tCLE9BQUwsQ0FBYTtBQUNMSixxQkFBSWQsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywyQkFEckM7QUFFTGdCLHdCQUFPLEtBRkY7QUFHTEMsd0JBQVFwQixlQUFLQyxTQUFMLENBQWVvQixTQUFmLEVBSEg7O0FBS0xDLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLDRCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSx3QkFBSUEsSUFBSTFCLElBQUosQ0FBUzZCLElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkJuQiw2QkFBS1QsU0FBTCxHQUFpQnlCLElBQUkxQixJQUFKLENBQVM4QixJQUExQjtBQUNBcEIsNkJBQUtxQixNQUFMO0FBQ0g7QUFDSjtBQVhJLGFBQWI7QUFhSDs7O2lDQUdRO0FBQ0wsZ0JBQUlyQixPQUFPLElBQVg7QUFDQUEsaUJBQUtzQixZQUFMO0FBQ0g7Ozs7RUEzQzhCN0IsZUFBSzhCLEk7O2tCQUFuQmxDLEsiLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW4gZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGFkbWluTGlzdDpbXSxcclxuICAgICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgb25DbGlja0FkbWluKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBhZG1pbklkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6XCJhZG1pbi1kZXRhaWw/YWlkPVwiK3NlbGYuYWRtaW5MaXN0W2FkbWluSWRdLkFpZCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tDcmVhdGVBZG1pbigpe1xyXG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOlwiY3JlYXRlLWFkbWluXCJ9KVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWRtaW5EYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfYWRtaW5fbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRtaW5MaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblNob3coKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgc2VsZi5nZXRBZG1pbkRhdGEoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==