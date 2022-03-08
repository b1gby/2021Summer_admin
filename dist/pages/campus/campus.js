"use strict";

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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            "usingComponents": {
                "mp-slideview": "weui-miniprogram/slideview/slideview",
                "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"
            }
        }, _this.data = {
            campusList: [],
            campusId: -1,
            isClickCreateCampus: false,
            isClickEditCampus: false,
            slideButtons: [{
                type: 'warn',
                text: '删除',
                extClass: 'DeleteButton'
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                extClass: 'DeleteButton'
            }],
            dialogShow: false,
            deleteIndex: -1,
            insertCampusData: null,
            copyCampusList: []
        }, _this.methods = {
            onClickCreateCampus: function onClickCreateCampus() {
                var self = this;
                self.isClickCreateCampus = true;
            },
            onClickEditCampus: function onClickEditCampus() {
                var self = this;
                self.isClickEditCampus = true;
            },
            inputChange: function inputChange(e) {
                var self = this;
                self.copyCampusList[e.currentTarget.dataset.id].Cname = e.detail.value.trim();
            },
            inputChangeCreateCampus: function inputChangeCreateCampus(e) {
                var self = this;
                self.insertCampusData = e.detail.value.trim();
            },
            onClickCancel: function onClickCancel() {
                var self = this;
                self.isClickEditCampus = false;
                self.isClickCreateCampus = false;
            },
            onClickSubmit: function onClickSubmit() {
                var self = this;
                if (self.isClickCreateCampus) {
                    self.createCampus(self.insertCampusData);
                    self.isClickCreateCampus = false;
                }
                if (self.isClickEditCampus) {
                    var _self = this;
                    _self.editCampus();
                    _self.isClickEditCampus = false;
                }
            },
            slideButtonTap: function slideButtonTap(e) {
                var self = this;
                self.deleteIndex = e.currentTarget.dataset.id;
                self.dialogShow = true;
            },
            tapDeleteDialogButton: function tapDeleteDialogButton(e) {
                var self = this;
                self.dialogShow = false;
                if (e.detail.index == 1) {
                    self.deleteCampus();
                    self.getCampusData();
                }
            },
            dialogClose: function dialogClose(e) {
                var self = this;
                self.dialogShow = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: "createCampus",
        value: function createCampus(cname) {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/insert_campus',
                method: 'POST',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    'Cname': cname
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Insert Campus Success!");
                        _wepy2.default.showToast({
                            title: '添加成功', //提示的内容,
                            icon: 'success', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });

                        self.getCampusData();
                    } else if (res.data.Code == 2) {
                        if (res.data.Msg == "Campus exist!") {
                            _wepy2.default.showToast({
                                title: '不能添加相同校区', //提示的内容,
                                icon: 'none', //图标,
                                duration: 2000, //延迟时间,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });
                        }
                    }
                }
            });
        }
    }, {
        key: "editCampus",
        value: function editCampus(cid, cname) {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/update_campus',
                method: 'PUT',
                header: _wepy2.default.$instance.setHeader(),
                data: self.copyCampusList,
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Edit Campus Success!");
                        _wepy2.default.showToast({
                            title: '修改成功', //提示的内容,
                            icon: 'success', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });

                        self.getCampusData();
                    }
                }
            });
        }
    }, {
        key: "deleteCampus",
        value: function deleteCampus() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/delete_campus/:id' + '?Cid=' + self.campusList[self.deleteIndex].Cid.toString(),
                method: 'DELETE',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Delete Campus Success!");
                        _wepy2.default.showToast({
                            title: '删除成功', //提示的内容,
                            icon: 'success', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });
                    }
                }
            });
        }
    }, {
        key: "getCampusData",
        value: function getCampusData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_campus_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.campusList = res.data.Data;
                        self.copyCampusList = JSON.parse(JSON.stringify(self.campusList)); //深拷贝
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var self = this;
            self.getCampusData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/campus/campus'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbXB1cy5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsImRhdGEiLCJjYW1wdXNMaXN0IiwiY2FtcHVzSWQiLCJpc0NsaWNrQ3JlYXRlQ2FtcHVzIiwiaXNDbGlja0VkaXRDYW1wdXMiLCJzbGlkZUJ1dHRvbnMiLCJ0eXBlIiwidGV4dCIsImV4dENsYXNzIiwiYnV0dG9ucyIsImRpYWxvZ1Nob3ciLCJkZWxldGVJbmRleCIsImluc2VydENhbXB1c0RhdGEiLCJjb3B5Q2FtcHVzTGlzdCIsIm1ldGhvZHMiLCJvbkNsaWNrQ3JlYXRlQ2FtcHVzIiwic2VsZiIsIm9uQ2xpY2tFZGl0Q2FtcHVzIiwiaW5wdXRDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIkNuYW1lIiwiZGV0YWlsIiwidmFsdWUiLCJ0cmltIiwiaW5wdXRDaGFuZ2VDcmVhdGVDYW1wdXMiLCJvbkNsaWNrQ2FuY2VsIiwib25DbGlja1N1Ym1pdCIsImNyZWF0ZUNhbXB1cyIsImVkaXRDYW1wdXMiLCJzbGlkZUJ1dHRvblRhcCIsInRhcERlbGV0ZURpYWxvZ0J1dHRvbiIsImluZGV4IiwiZGVsZXRlQ2FtcHVzIiwiZ2V0Q2FtcHVzRGF0YSIsImRpYWxvZ0Nsb3NlIiwiY25hbWUiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJNc2ciLCJjaWQiLCJDaWQiLCJ0b1N0cmluZyIsIkRhdGEiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0s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QkMsc0NBQVUsSUFIRyxFQUdHO0FBQ2hCQyxrQ0FBTSxJQUpPLEVBSUQ7QUFDWlQscUNBQVMsc0JBQU8sQ0FBRTtBQUxMLHlCQUFmO0FBUUg7QUFDSjtBQWpCSSxhQUFiO0FBbUJIOzs7d0NBRWU7QUFDWixnQkFBSWhDLE9BQU8sSUFBWDs7QUFFQXVCLDJCQUFLQyxPQUFMLENBQWE7QUFDTEMscUJBQUlGLGVBQUtHLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNEJBRHJDO0FBRUxDLHdCQUFPLEtBRkY7QUFHTEMsd0JBQVFQLGVBQUtHLFNBQUwsQ0FBZUssU0FBZixFQUhIOztBQUtMQyx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CQyw0QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0Esd0JBQUlBLElBQUlqRCxJQUFKLENBQVNvRCxJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CcEMsNkJBQUtmLFVBQUwsR0FBa0JnRCxJQUFJakQsSUFBSixDQUFTOEQsSUFBM0I7QUFDQTlDLDZCQUFLSCxjQUFMLEdBQXNCa0QsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWVqRCxLQUFLZixVQUFwQixDQUFYLENBQXRCLENBRm1CLENBRStDO0FBQ2xFZSw2QkFBS2tELE1BQUw7QUFDSDtBQUNKO0FBWkksYUFBYjtBQWNIOzs7aUNBRVE7QUFDTCxnQkFBSWxELE9BQU8sSUFBWDtBQUNBQSxpQkFBS29CLGFBQUw7QUFDSDs7OztFQTVNOEJHLGVBQUs0QixJOztrQkFBbkJyRSxLIiwiZmlsZSI6ImNhbXB1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgICAgIFwibXAtc2xpZGV2aWV3XCI6IFwid2V1aS1taW5pcHJvZ3JhbS9zbGlkZXZpZXcvc2xpZGV2aWV3XCIsXHJcbiAgICAgICAgICAgIFwibXAtZGlhbG9nXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL2RpYWxvZy9kaWFsb2dcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjYW1wdXNMaXN0OltdLFxyXG4gICAgICAgIGNhbXB1c0lkOiAtMSxcclxuICAgICAgICBpc0NsaWNrQ3JlYXRlQ2FtcHVzOiBmYWxzZSxcclxuICAgICAgICBpc0NsaWNrRWRpdENhbXB1czogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WIoOmZpCcsXHJcbiAgICAgICAgICAgICAgICBleHRDbGFzczogJ0RlbGV0ZUJ1dHRvbicsXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIGJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIGV4dENsYXNzOiAnRGVsZXRlQnV0dG9uJyxcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgZGlhbG9nU2hvdzogZmFsc2UsXHJcbiAgICAgICAgZGVsZXRlSW5kZXg6LTEsXHJcbiAgICAgICAgaW5zZXJ0Q2FtcHVzRGF0YTpudWxsLFxyXG4gICAgICAgIGNvcHlDYW1wdXNMaXN0OltdXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgb25DbGlja0NyZWF0ZUNhbXB1cygpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrQ3JlYXRlQ2FtcHVzID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tFZGl0Q2FtcHVzKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tFZGl0Q2FtcHVzID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0Q2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuY29weUNhbXB1c0xpc3RbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRdLkNuYW1lID0gZS5kZXRhaWwudmFsdWUudHJpbSgpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2VDcmVhdGVDYW1wdXMoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmluc2VydENhbXB1c0RhdGEgPSBlLmRldGFpbC52YWx1ZS50cmltKClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrQ2FuY2VsKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tFZGl0Q2FtcHVzID0gZmFsc2VcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrQ3JlYXRlQ2FtcHVzID0gZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrU3VibWl0KCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpZihzZWxmLmlzQ2xpY2tDcmVhdGVDYW1wdXMpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVDYW1wdXMoc2VsZi5pbnNlcnRDYW1wdXNEYXRhKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrQ3JlYXRlQ2FtcHVzID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNDbGlja0VkaXRDYW1wdXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgICAgICBzZWxmLmVkaXRDYW1wdXMoKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdENhbXB1cyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNsaWRlQnV0dG9uVGFwKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGVsZXRlSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGFwRGVsZXRlRGlhbG9nQnV0dG9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5pbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRlbGV0ZUNhbXB1cygpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmdldENhbXB1c0RhdGEoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlhbG9nQ2xvc2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2FtcHVzKGNuYW1lKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9pbnNlcnRfY2FtcHVzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICdDbmFtZSc6Y25hbWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5zZXJ0IENhbXB1cyBTdWNjZXNzIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmt7vliqDmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENhbXB1c0RhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXMuZGF0YS5Db2RlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5Nc2cgPT0gXCJDYW1wdXMgZXhpc3QhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiN6IO95re75Yqg55u45ZCM5qCh5Yy6JywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZWRpdENhbXB1cyhjaWQsY25hbWUpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL3VwZGF0ZV9jYW1wdXMnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQVVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbGYuY29weUNhbXB1c0xpc3QsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWRpdCBDYW1wdXMgU3VjY2VzcyFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRDYW1wdXNEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQ2FtcHVzKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZGVsZXRlX2NhbXB1cy86aWQnICsgJz9DaWQ9JyArIHNlbGYuY2FtcHVzTGlzdFtzZWxmLmRlbGV0ZUluZGV4XS5DaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIENhbXB1cyBTdWNjZXNzIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYW1wdXNEYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfY2FtcHVzX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbXB1c0xpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUNhbXB1c0xpc3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYuY2FtcHVzTGlzdCkpIC8v5rex5ou36LSdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0Q2FtcHVzRGF0YSgpXHJcbiAgICB9XHJcbn1cclxuIl19