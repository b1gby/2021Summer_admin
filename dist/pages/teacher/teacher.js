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
            teacherList: [],
            activeTab: 0,
            tabbar: [],
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            noUserIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
            teacherField: ['姓名', '管理校区'],
            fieldCur: 0,
            sortImg: [_wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sortup.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png']

        }, _this.methods = {
            onClickTeacher: function onClickTeacher(e) {
                var self = this;
                var teacherId = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "teacher-detail?tid=" + self.teacherList[teacherId].Tid

                });
            },
            onClickCreateTeacher: function onClickCreateTeacher() {
                this.$navigate({ url: "create-teacher" });
            },
            tabSelect: function tabSelect(e) {
                var self = this;
                self.activeTab = e.currentTarget.dataset.id;
                var sortName = "校区";
                var sortDir = self.tabbar[e.currentTarget.dataset.id];
                self.getSortedTeacherList(sortName, sortDir);
            },
            tabSelectIndex: function tabSelectIndex(e) {
                //目前不对管理校区排序
                if (e.currentTarget.dataset.id == 1) {
                    return;
                }

                var self = this;
                self.activeTab = 0;
                var sortName = self.teacherField[e.currentTarget.dataset.id];
                var sortDir = "";
                if (self.fieldCur == e.currentTarget.dataset.id) {
                    var curDir = self.sortImg[self.fieldCur].indexOf("sortup");
                    if (curDir != -1) {
                        self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("up", "down");
                        sortDir = "desc";
                    } else {
                        self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("down", "up");
                        sortDir = "asc";
                    }
                } else {
                    // 首先替换为sort
                    self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("down", "").replace("up", "");

                    self.fieldCur = e.currentTarget.dataset.id;

                    // 再把选中的替换为sortup
                    self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("sort", "sortup");
                    sortDir = "asc";
                }

                self.getSortedTeacherList(sortName, sortDir);
            },
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_teacher',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.teacherList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'getTeacherData',
        value: function getTeacherData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_teacher_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.teacherList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'getSortedTeacherList',
        value: function getSortedTeacherList(sortName, sortDir) {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_teacher_sorted_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    sortName: sortName,
                    sortDir: sortDir
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.teacherList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'getCampusData',
        value: function getCampusData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_campus_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.tabbar.push('不限');
                        for (var i = 0; i < res.data.Data.length; i++) {
                            self.tabbar.push(res.data.Data[i].Cname);
                        }

                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var self = this;
            self.getCampusData();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getTeacherData();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/teacher/teacher'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXIuanMiXSwibmFtZXMiOlsiVGVhY2hlciIsImRhdGEiLCJ0ZWFjaGVyTGlzdCIsImFjdGl2ZVRhYiIsInRhYmJhciIsImltZ1VybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibm9Vc2VySWNvbiIsInRlYWNoZXJGaWVsZCIsImZpZWxkQ3VyIiwic29ydEltZyIsIm1ldGhvZHMiLCJvbkNsaWNrVGVhY2hlciIsImUiLCJzZWxmIiwidGVhY2hlcklkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIlRpZCIsIm9uQ2xpY2tDcmVhdGVUZWFjaGVyIiwiJG5hdmlnYXRlIiwidGFiU2VsZWN0Iiwic29ydE5hbWUiLCJzb3J0RGlyIiwiZ2V0U29ydGVkVGVhY2hlckxpc3QiLCJ0YWJTZWxlY3RJbmRleCIsImN1ckRpciIsImluZGV4T2YiLCJyZXBsYWNlIiwiaW5wdXRDaGFuZ2VTZWFyY2giLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwid29yZCIsImRldGFpbCIsInZhbHVlIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiRGF0YSIsIiRhcHBseSIsInB1c2giLCJpIiwibGVuZ3RoIiwiQ25hbWUiLCJnZXRDYW1wdXNEYXRhIiwiZ2V0VGVhY2hlckRhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLEksR0FBTztBQUNIQyx5QkFBWSxFQURUO0FBRUhDLHVCQUFXLENBRlI7QUFHSEMsb0JBQVEsRUFITDtBQUlIQyxvQkFBT0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywyQkFKMUM7QUFLSEMsd0JBQWFKLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNENB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LENBQXJCLEVBQXVCO0FBQ25CL0IsNkJBQUtiLE1BQUwsQ0FBWStDLElBQVosQ0FBaUIsSUFBakI7QUFDQSw2QkFBSSxJQUFJQyxJQUFFLENBQVYsRUFBWUEsSUFBRVAsSUFBSTVDLElBQUosQ0FBU2dELElBQVQsQ0FBY0ksTUFBNUIsRUFBbUNELEdBQW5DLEVBQXVDO0FBQ25DbkMsaUNBQUtiLE1BQUwsQ0FBWStDLElBQVosQ0FBaUJOLElBQUk1QyxJQUFKLENBQVNnRCxJQUFULENBQWNHLENBQWQsRUFBaUJFLEtBQWxDO0FBQ0g7O0FBRURyQyw2QkFBS2lDLE1BQUw7QUFDSDtBQUNKO0FBZkksYUFBYjtBQWlCSDs7O2lDQUVPO0FBQ0osZ0JBQUlqQyxPQUFPLElBQVg7QUFDQUEsaUJBQUtzQyxhQUFMO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJdEMsT0FBTyxJQUFYO0FBQ0FBLGlCQUFLdUMsY0FBTDtBQUVIOzs7O0VBcEtnQ2xELGVBQUttRCxJOztrQkFBckJ6RCxPIiwiZmlsZSI6InRlYWNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdGVhY2hlckxpc3Q6W10sXHJcbiAgICAgICAgYWN0aXZlVGFiOiAwLFxyXG4gICAgICAgIHRhYmJhcjogW10sXHJcbiAgICAgICAgaW1nVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIG5vVXNlckljb24gOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9bm9uZV91c2VyaW5mby5wbmcnLFxyXG4gICAgICAgIHRlYWNoZXJGaWVsZDogWyflp5PlkI0nLCfnrqHnkIbmoKHljLonXSxcclxuICAgICAgICBmaWVsZEN1cjogMCxcclxuICAgICAgICBzb3J0SW1nOltcclxuICAgICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc29ydHVwLnBuZycsXHJcbiAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL3NvcnQucG5nJyxcclxuICAgICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc29ydC5wbmcnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgb25DbGlja1RlYWNoZXIoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IHRlYWNoZXJJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOlwidGVhY2hlci1kZXRhaWw/dGlkPVwiK3NlbGYudGVhY2hlckxpc3RbdGVhY2hlcklkXS5UaWQsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrQ3JlYXRlVGVhY2hlcigpe1xyXG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSh7dXJsOlwiY3JlYXRlLXRlYWNoZXJcIn0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGFiU2VsZWN0KGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWIgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICBsZXQgc29ydE5hbWUgPSBcIuagoeWMulwiXHJcbiAgICAgICAgICAgIGxldCBzb3J0RGlyID0gc2VsZi50YWJiYXJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRdXHJcbiAgICAgICAgICAgIHNlbGYuZ2V0U29ydGVkVGVhY2hlckxpc3Qoc29ydE5hbWUsc29ydERpcilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YWJTZWxlY3RJbmRleChlKXtcclxuICAgICAgICAgICAgLy/nm67liY3kuI3lr7nnrqHnkIbmoKHljLrmjpLluo9cclxuICAgICAgICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5hY3RpdmVUYWIgPSAwXHJcbiAgICAgICAgICAgIGxldCBzb3J0TmFtZSA9IHNlbGYudGVhY2hlckZpZWxkW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXVxyXG4gICAgICAgICAgICBsZXQgc29ydERpciA9IFwiXCJcclxuICAgICAgICAgICAgaWYoc2VsZi5maWVsZEN1cj09IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJEaXIgPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0uaW5kZXhPZihcInNvcnR1cFwiKVxyXG4gICAgICAgICAgICAgICAgaWYoY3VyRGlyIT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJ1cFwiLFwiZG93blwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXIgPSBcImRlc2NcIlxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJkb3duXCIsXCJ1cFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXIgPSBcImFzY1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDpppblhYjmm7/mjaLkuLpzb3J0XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0gPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0ucmVwbGFjZShcImRvd25cIixcIlwiKS5yZXBsYWNlKFwidXBcIixcIlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZmllbGRDdXI9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5YaN5oqK6YCJ5Lit55qE5pu/5o2i5Li6c29ydHVwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0gPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0ucmVwbGFjZShcInNvcnRcIixcInNvcnR1cFwiKVxyXG4gICAgICAgICAgICAgICAgc29ydERpciA9IFwiYXNjXCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5nZXRTb3J0ZWRUZWFjaGVyTGlzdChzb3J0TmFtZSxzb3J0RGlyKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0Q2hhbmdlU2VhcmNoKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9zZWFyY2hfdGVhY2hlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQ6ZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGVhY2hlckxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUZWFjaGVyRGF0YSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZ2V0X3RlYWNoZXJfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGVhY2hlckxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U29ydGVkVGVhY2hlckxpc3Qoc29ydE5hbWUsc29ydERpcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfdGVhY2hlcl9zb3J0ZWRfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydE5hbWU6c29ydE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydERpcjpzb3J0RGlyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRlYWNoZXJMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldENhbXB1c0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2dldF9jYW1wdXNfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGFiYmFyLnB1c2goJ+S4jemZkCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8cmVzLmRhdGEuRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGFiYmFyLnB1c2gocmVzLmRhdGEuRGF0YVtpXS5DbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0Q2FtcHVzRGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0VGVhY2hlckRhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==