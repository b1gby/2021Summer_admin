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
            Aid: null,
            admin: {},
            isClickEdit: false
        }, _this.methods = {
            onClickEditAdmin: function onClickEditAdmin() {
                var self = this;
                self.isClickEdit = self.isClickEdit ? false : true;
            },


            // onClickDeleteAdmin(){
            //     let self = this

            //     wepy.request({
            //             url:wepy.$instance.globalData.serverUrl + '/app/admin/delete_admin/:id' + '?Sid=' + self.Sid.toString(),
            //             method:'DELETE',
            //             header: wepy.$instance.setHeader(),
            //             success: function(res) {
            //                 console.log(res)
            //                 if (res.data.Code == 1){
            //                     console.log("Delete Admin Success!")
            //                     wepy.showToast({
            //                         title: '注销成功', //提示的内容,
            //                         icon: 'success', //图标,
            //                         duration: 2000, //延迟时间,
            //                         mask: true, //显示透明蒙层，防止触摸穿透,
            //                         success: function(){
            //                                 wepy.navigateBack({
            //                                 delta: 1
            //                             })
            //                         },
            //                     });
            //                 }
            //             }
            //         })
            // },

            formSubmit: function formSubmit(e) {
                var self = this;

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData['Aid'] = Number(self.Aid);

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/update_admin',
                    method: 'PUT',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '修改成功', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });

                            self.isClickEdit = false;
                            self.$apply();
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not consistent!") {
                                wx.showToast({
                                    title: '两次密码不一致', //提示的内容,
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
        key: 'getAdminData',
        value: function getAdminData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_admin',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Aid: self.Aid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.admin = res.data.Data;

                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Aid = options.aid;

            self.getAdminData();
        }
    }]);

    return Admin;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Admin , 'pages/admin/admin-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJBZG1pbiIsImRhdGEiLCJBaWQiLCJhZG1pbiIsImlzQ2xpY2tFZGl0IiwibWV0aG9kcyIsIm9uQ2xpY2tFZGl0QWRtaW4iLCJzZWxmIiwiZm9ybVN1Ym1pdCIsImUiLCJzZW5kRm9ybURhdGEiLCJkZXRhaWwiLCJ2YWx1ZSIsIk51bWJlciIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiQ29kZSIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwibWFzayIsIiRhcHBseSIsIk1zZyIsIkRhdGEiLCJvcHRpb25zIiwiYWlkIiwiZ2V0QWRtaW5EYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQUs7QUFDREMsaUJBQUssSUFESjtBQUVEQyxtQkFBTyxFQUZOO0FBR0RDLHlCQUFhO0FBSFosUyxRQU1MQyxPLEdBQVM7QUFFTEMsNEJBRkssOEJBRWM7QUFDZixvQkFBSUMsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLSCxXQUFMLEdBQW1CRyxLQUFLSCxXQUFMLEdBQWlCLEtBQWpCLEdBQXVCLElBQTFDO0FBQ0gsYUFMSTs7O0FBT0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBSSxzQkFsQ0ssc0JBa0NNQyxDQWxDTixFQWtDUztBQUNWLG9CQUFJRixPQUFPLElBQVg7O0FBRUEsb0JBQUlHLGVBQWVELEVBQUVFLE1BQUYsQ0FBU0MsS0FBNUIsQ0FIVSxDQUd3QjtBQUNsQ0YsNkJBQWEsS0FBYixJQUFzQkcsT0FBT04sS0FBS0wsR0FBWixDQUF0Qjs7QUFFQVksd0JBQVFDLEdBQVIsQ0FBWUwsWUFBWjtBQUNBTSwrQkFBS0MsT0FBTCxDQUFhO0FBQ1RDLHlCQUFJRixlQUFLRyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHlCQURqQztBQUVUQyw0QkFBTyxLQUZFO0FBR1RyQiwwQkFBTVMsWUFIRztBQUlUYSw0QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSkM7QUFLVEMsNkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQlosZ0NBQVFDLEdBQVIsQ0FBWVcsR0FBWjtBQUNBLDRCQUFJQSxJQUFJekIsSUFBSixDQUFTMEIsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQkMsK0JBQUdDLFNBQUgsQ0FBYTtBQUNQQyx1Q0FBTyxNQURBLEVBQ1E7QUFDZkMsc0NBQU0sU0FGQyxFQUVVO0FBQ2pCQyxzQ0FBTSxJQUhDLEVBR0s7QUFDWlAseUNBQVMsc0JBQU8sQ0FBRTtBQUpYLDZCQUFiOztBQU9BbEIsaUNBQUtILFdBQUwsR0FBbUIsS0FBbkI7QUFDQUcsaUNBQUswQixNQUFMO0FBQ0gseUJBVkQsTUFVTyxJQUFHUCxJQUFJekIsSUFBSixDQUFTMEIsSUFBVCxJQUFpQixDQUFwQixFQUFzQjtBQUN6QixnQ0FBR0QsSUFBSXpCLElBQUosQ0FBU2lDLEdBQVQsSUFBZ0IsMEJBQW5CLEVBQThDO0FBQzFDTixtQ0FBR0MsU0FBSCxDQUFhO0FBQ1hDLDJDQUFPLFNBREksRUFDTztBQUNsQkMsMENBQU0sT0FGSyxFQUVJO0FBQ2ZDLDBDQUFNLElBSEssRUFHQztBQUNaUCw2Q0FBUyxzQkFBTyxDQUFFO0FBSlAsaUNBQWI7QUFNSDtBQUNKO0FBQ0o7QUEzQlEsaUJBQWI7QUE4Qkg7QUF2RUksUzs7Ozs7dUNBOEVNO0FBQ1gsZ0JBQUlsQixPQUFPLElBQVg7QUFDQVMsMkJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxxQkFBSUYsZUFBS0csU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyxzQkFEakM7QUFFVEMsd0JBQU8sS0FGRTtBQUdUQyx3QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSEM7QUFJVHZCLHNCQUFLO0FBQ0RDLHlCQUFJSyxLQUFLTDtBQURSLGlCQUpJO0FBT1R1Qix5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CWiw0QkFBUUMsR0FBUixDQUFZVyxHQUFaO0FBQ0Esd0JBQUlBLElBQUl6QixJQUFKLENBQVMwQixJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CcEIsNkJBQUtKLEtBQUwsR0FBYXVCLElBQUl6QixJQUFKLENBQVNrQyxJQUF0Qjs7QUFFQTVCLDZCQUFLMEIsTUFBTDtBQUNIO0FBQ0o7QUFkUSxhQUFiO0FBZ0JIOzs7K0JBSU1HLE8sRUFBUztBQUNaLGdCQUFJN0IsT0FBTyxJQUFYOztBQUVBQSxpQkFBS0wsR0FBTCxHQUFXa0MsUUFBUUMsR0FBbkI7O0FBRUE5QixpQkFBSytCLFlBQUw7QUFFSDs7OztFQWxIOEJ0QixlQUFLdUIsSTs7a0JBQW5CdkMsSyIsImZpbGUiOiJhZG1pbi1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaW4gZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBBaWQ6IG51bGwsXHJcbiAgICAgICAgYWRtaW46IHt9LFxyXG4gICAgICAgIGlzQ2xpY2tFZGl0OiBmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzPSB7XHJcblxyXG4gICAgICAgIG9uQ2xpY2tFZGl0QWRtaW4oKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tFZGl0ID0gc2VsZi5pc0NsaWNrRWRpdD9mYWxzZTp0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICAvLyBvbkNsaWNrRGVsZXRlQWRtaW4oKXtcclxuICAgICAgICAvLyAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIC8vICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2RlbGV0ZV9hZG1pbi86aWQnICsgJz9TaWQ9JyArIHNlbGYuU2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSBBZG1pbiBTdWNjZXNzIVwiKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5rOo6ZSA5oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICBmb3JtU3VibWl0KGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydBaWQnXSA9IE51bWJlcihzZWxmLkFpZClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbmRGb3JtRGF0YSlcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL3VwZGF0ZV9hZG1pbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BVVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzZW5kRm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0VkaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLkNvZGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlBhc3N3b3JkIG5vdCBjb25zaXN0ZW50IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Lik5qyh5a+G56CB5LiN5LiA6Ie0JywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRBZG1pbkRhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZ2V0X2FkbWluJyxcclxuICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIEFpZDpzZWxmLkFpZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWRtaW4gPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLkFpZCA9IG9wdGlvbnMuYWlkXHJcblxyXG4gICAgICAgIHNlbGYuZ2V0QWRtaW5EYXRhKClcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19