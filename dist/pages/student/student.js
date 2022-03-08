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

var Student = function (_wepy$page) {
    _inherits(Student, _wepy$page);

    function Student() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Student);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Student.__proto__ || Object.getPrototypeOf(Student)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            studentList: [],
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            noUserIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
            studentField: ['姓名', '年级', '校区'],
            fieldCur: 0,
            sortImg: [_wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sortup.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png']

        }, _this.methods = {
            onClickStudent: function onClickStudent(e) {
                var self = this;
                var studentId = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "student-detail?sid=" + self.studentList[studentId].Sid

                });
            },
            onClickCreateStudent: function onClickCreateStudent() {
                this.$navigate({ url: "create-student" });
            },
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                var sortName = self.studentField[e.currentTarget.dataset.id];
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

                self.getSortedStudentList(sortName, sortDir);
            },
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_student_from_admin',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.studentList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Student, [{
        key: 'getStudentData',
        value: function getStudentData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_student_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.studentList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'getSortedStudentList',
        value: function getSortedStudentList(sortName, sortDir) {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_student_sorted_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    sortName: sortName,
                    sortDir: sortDir
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.studentList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getStudentData();
        }
    }]);

    return Student;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Student , 'pages/student/student'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQuanMiXSwibmFtZXMiOlsiU3R1ZGVudCIsImRhdGEiLCJzdHVkZW50TGlzdCIsImltZ1VybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibm9Vc2VySWNvbiIsInN0dWRlbnRGaWVsZCIsImZpZWxkQ3VyIiwic29ydEltZyIsIm1ldGhvZHMiLCJvbkNsaWNrU3R1ZGVudCIsImUiLCJzZWxmIiwic3R1ZGVudElkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIlNpZCIsIm9uQ2xpY2tDcmVhdGVTdHVkZW50IiwiJG5hdmlnYXRlIiwidGFiU2VsZWN0SW5kZXgiLCJzb3J0TmFtZSIsInNvcnREaXIiLCJjdXJEaXIiLCJpbmRleE9mIiwicmVwbGFjZSIsImdldFNvcnRlZFN0dWRlbnRMaXN0IiwiaW5wdXRDaGFuZ2VTZWFyY2giLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwid29yZCIsImRldGFpbCIsInZhbHVlIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiRGF0YSIsIiRhcHBseSIsImdldFN0dWRlbnREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMseUJBQVksRUFEVDtBQUVIQyxvQkFBT0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywyQkFGMUM7QUFHSEMsd0JBQWFKLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNENBSGhEO0FBSUhFLDBCQUFjLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLENBSlg7QUFLSEMsc0JBQVUsQ0FMUDtBQU1IQyxxQkFBUSxDQUNKUCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FB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QUFTNEMsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQjlCLDZCQUFLYixXQUFMLEdBQW1Cd0MsSUFBSXpDLElBQUosQ0FBUzZDLElBQTVCO0FBQ0EvQiw2QkFBS2dDLE1BQUw7QUFDSDtBQUNKO0FBZEksYUFBYjtBQWdCSDs7O2lDQUVRO0FBQ0wsZ0JBQUloQyxPQUFPLElBQVg7QUFDQUEsaUJBQUtpQyxjQUFMO0FBQ0g7Ozs7RUF2SGdDNUMsZUFBSzZDLEk7O2tCQUFyQmpELE8iLCJmaWxlIjoic3R1ZGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHVkZW50IGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBzdHVkZW50TGlzdDpbXSxcclxuICAgICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgbm9Vc2VySWNvbiA6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1ub25lX3VzZXJpbmZvLnBuZycsXHJcbiAgICAgICAgc3R1ZGVudEZpZWxkOiBbJ+Wnk+WQjScsJ+W5tOe6pycsJ+agoeWMuiddLFxyXG4gICAgICAgIGZpZWxkQ3VyOiAwLFxyXG4gICAgICAgIHNvcnRJbWc6W1xyXG4gICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9zb3J0dXAucG5nJyxcclxuICAgICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc29ydC5wbmcnLFxyXG4gICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9zb3J0LnBuZycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBvbkNsaWNrU3R1ZGVudChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgc3R1ZGVudElkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6XCJzdHVkZW50LWRldGFpbD9zaWQ9XCIrc2VsZi5zdHVkZW50TGlzdFtzdHVkZW50SWRdLlNpZCxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tDcmVhdGVTdHVkZW50KCl7XHJcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlKHt1cmw6XCJjcmVhdGUtc3R1ZGVudFwifSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YWJTZWxlY3RJbmRleChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBzb3J0TmFtZSA9IHNlbGYuc3R1ZGVudEZpZWxkW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXVxyXG4gICAgICAgICAgICBsZXQgc29ydERpciA9IFwiXCJcclxuICAgICAgICAgICAgaWYoc2VsZi5maWVsZEN1cj09IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJEaXIgPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0uaW5kZXhPZihcInNvcnR1cFwiKVxyXG4gICAgICAgICAgICAgICAgaWYoY3VyRGlyIT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJ1cFwiLFwiZG93blwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXIgPSBcImRlc2NcIlxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJkb3duXCIsXCJ1cFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXIgPSBcImFzY1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDpppblhYjmm7/mjaLkuLpzb3J0XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0gPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0ucmVwbGFjZShcImRvd25cIixcIlwiKS5yZXBsYWNlKFwidXBcIixcIlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuZmllbGRDdXI9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5YaN5oqK6YCJ5Lit55qE5pu/5o2i5Li6c29ydHVwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0gPSBzZWxmLnNvcnRJbWdbc2VsZi5maWVsZEN1cl0ucmVwbGFjZShcInNvcnRcIixcInNvcnR1cFwiKVxyXG4gICAgICAgICAgICAgICAgc29ydERpciA9IFwiYXNjXCJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5nZXRTb3J0ZWRTdHVkZW50TGlzdChzb3J0TmFtZSxzb3J0RGlyKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0Q2hhbmdlU2VhcmNoKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9zZWFyY2hfc3R1ZGVudF9mcm9tX2FkbWluJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZDplLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHVkZW50TGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0dWRlbnREYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfc3R1ZGVudF9saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHVkZW50TGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRTb3J0ZWRTdHVkZW50TGlzdChzb3J0TmFtZSxzb3J0RGlyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2dldF9zdHVkZW50X3NvcnRlZF9saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBzb3J0TmFtZTpzb3J0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyOnNvcnREaXJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R1ZGVudExpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==