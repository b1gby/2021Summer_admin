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

var Teacher = function (_wepy$page) {
    _inherits(Teacher, _wepy$page);

    function Teacher() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Teacher);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Teacher.__proto__ || Object.getPrototypeOf(Teacher)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            OTid: null,
            orderTeacher: {}

        }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'getOrderTeacherData',
        value: function getOrderTeacherData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_order_teacher',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    OTid: self.OTid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.orderTeacher = res.data.Data;

                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.OTid = options.otid;

            self.getOrderTeacherData();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/order/order-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJUZWFjaGVyIiwiZGF0YSIsIk9UaWQiLCJvcmRlclRlYWNoZXIiLCJtZXRob2RzIiwic2VsZiIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiQ29kZSIsIkRhdGEiLCIkYXBwbHkiLCJvcHRpb25zIiwib3RpZCIsImdldE9yZGVyVGVhY2hlckRhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBSztBQUNEQyxrQkFBTSxJQURMO0FBRURDLDBCQUFjOztBQUZiLFMsUUFNTEMsTyxHQUFTLEU7Ozs7OzhDQU1hO0FBQ2xCLGdCQUFJQyxPQUFPLElBQVg7QUFDQUMsMkJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxxQkFBSUYsZUFBS0csU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyw4QkFEakM7QUFFVEMsd0JBQU8sS0FGRTtBQUdUQyx3QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSEM7QUFJVGIsc0JBQUs7QUFDREMsMEJBQUtHLEtBQUtIO0FBRFQsaUJBSkk7QUFPVGEseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkMsNEJBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLHdCQUFJQSxJQUFJZixJQUFKLENBQVNrQixJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CZCw2QkFBS0YsWUFBTCxHQUFvQmEsSUFBSWYsSUFBSixDQUFTbUIsSUFBN0I7O0FBRUFmLDZCQUFLZ0IsTUFBTDtBQUNIO0FBQ0o7QUFkUSxhQUFiO0FBZ0JIOzs7K0JBRU1DLE8sRUFBUztBQUNaLGdCQUFJakIsT0FBTyxJQUFYOztBQUVBQSxpQkFBS0gsSUFBTCxHQUFZb0IsUUFBUUMsSUFBcEI7O0FBRUFsQixpQkFBS21CLG1CQUFMO0FBRUg7Ozs7RUF4Q2dDbEIsZUFBS21CLEk7O2tCQUFyQnpCLE8iLCJmaWxlIjoib3JkZXItZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYWNoZXIgZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBPVGlkOiBudWxsLFxyXG4gICAgICAgIG9yZGVyVGVhY2hlcjoge30sXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGdldE9yZGVyVGVhY2hlckRhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZ2V0X29yZGVyX3RlYWNoZXInLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgT1RpZDpzZWxmLk9UaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9yZGVyVGVhY2hlciA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIHNlbGYuT1RpZCA9IG9wdGlvbnMub3RpZFxyXG5cclxuICAgICAgICBzZWxmLmdldE9yZGVyVGVhY2hlckRhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=