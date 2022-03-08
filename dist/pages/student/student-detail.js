'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
            Sid: null,
            student: {},
            imgList: [],
            gradePicker: ['小学', '七年级', '八年级', '九年级', '高一', '高二', '高三', '大学'],
            gradeIndex: null,
            campusList: [],
            campusNameList: [],
            campusIndex: null,
            isClickEdit: false,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            copyStudent: {},
            copyImgList: []
        }, _this.methods = {
            pickerGradeChange: function pickerGradeChange(e) {
                var self = this;
                self.gradeIndex = e.detail.value;
            },
            pickerCampusChange: function pickerCampusChange(e) {
                var self = this;
                self.campusIndex = e.detail.value;
            },
            onClickEditStudent: function onClickEditStudent() {
                var self = this;
                self.isClickEdit = self.isClickEdit ? false : true;
            },
            checkboxChange: function checkboxChange(e) {
                var self = this;

                var values = e.detail.value;
                for (var i = 0, lenI = self.campusCheckList.length; i < lenI; ++i) {
                    self.campusCheckList[i].checked = false;

                    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (self.campusCheckList[i].value === values[j]) {
                            self.campusCheckList[i].checked = true;
                            break;
                        }
                    }
                }
            },
            ChooseImage: function ChooseImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                        self.imgList = res.tempFilePaths;
                        self.$apply();
                    }
                });
            },
            ViewImage: function ViewImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.previewImage({
                    urls: self.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelImg: function DelImg(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.showModal({
                    title: '删除题目图片',
                    content: '确定要删除这张图片吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            self.imgList.splice(e.currentTarget.dataset.index, 1);
                            self.$apply();
                        }
                    }
                });
            },
            onClickDeleteStudent: function onClickDeleteStudent() {
                var self = this;
                wx.showModal({
                    title: '注销学生账号',
                    content: '确定要注销此学生账号？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/delete_student/:id' + '?Sid=' + self.Sid.toString(),
                                method: 'DELETE',
                                header: _wepy2.default.$instance.setHeader(),
                                success: function success(res) {
                                    console.log(res);
                                    if (res.data.Code == 1) {
                                        console.log("Delete Student Success!");
                                        _wepy2.default.showToast({
                                            title: '注销成功', //提示的内容,
                                            icon: 'success', //图标,
                                            duration: 2000, //延迟时间,
                                            mask: true, //显示透明蒙层，防止触摸穿透,
                                            success: function success() {
                                                setTimeout(function () {
                                                    _wepy2.default.navigateBack({
                                                        delta: 1
                                                    });
                                                }, 1000);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张
                var length = self.imgList.length; //总数

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData['Sid'] = Number(self.Sid);

                if (self.imgList.length == 0) {
                    sendFormData['Sicon'] = "";
                } else if (self.imgList[0].indexOf(self.imgUrl) != -1) {
                    sendFormData['Sicon'] = self.imgList[0].replace(self.imgUrl, "");
                } else {
                    var lastindex = self.imgList[0].lastIndexOf("/");
                    sendFormData['Sicon'] = "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/update_student',
                    method: 'POST',
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

                            //添加头像
                            if (length > 0 && self.imgList[0].indexOf(self.imgUrl) == -1) {
                                self.recursionImgUpload(self, self.imgList, successUp, failUp, count, length);
                            } else {
                                self.getStudentData();
                            }

                            self.isClickEdit = false;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Student, [{
        key: 'recursionImgUpload',


        // 递归方式上传多张图片
        value: function recursionImgUpload(self, imgPaths, successUp, failUp, count, length) {
            var _wepy$uploadFile;

            _wepy2.default.uploadFile((_wepy$uploadFile = {
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/file/upload_file', //开发者服务器 url
                header: _wepy2.default.$instance.setHeader(),
                filePath: imgPaths[count], //要上传文件资源的路径
                name: 'uploadFile', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: {
                    dirName: "images/user_avatar"
                }
            }, _defineProperty(_wepy$uploadFile, 'header', {
                'content-type': 'multipart/form-data'
            }), _defineProperty(_wepy$uploadFile, 'success', function success(e) {
                if (e.data.Code == 1) {
                    console.log("上传成功第" + count + "张");
                }
                successUp++; //成功+1
            }), _defineProperty(_wepy$uploadFile, 'fail', function fail(e) {
                failUp++; //失败+1
            }), _defineProperty(_wepy$uploadFile, 'complete', function complete(e) {

                count++;
                if (count == length) {
                    console.log("上传成功");
                    self.getStudentData();
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }
    }, {
        key: 'getStudentData',
        value: function getStudentData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_student',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.student = res.data.Data;
                        self.copyStudent = JSON.parse(JSON.stringify(self.student)); //深拷贝

                        self.imgList = [];
                        self.imgList.push(self.imgUrl + res.data.Data.Sicon);
                        self.copyImgList = JSON.parse(JSON.stringify(self.imgList)); //深拷贝

                        self.$apply();

                        self.getCampusData();
                        for (var i = 0; i < self.gradePicker.length; i++) {
                            if (self.gradePicker[i] == res.data.Data.SgradeName) {
                                self.gradeIndex = i;
                            }
                        }
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
                        self.campusList = res.data.Data;
                        self.campusNameList = [];
                        for (var i = 0; i < res.data.Data.length; i++) {
                            if (res.data.Data[i].Cname == self.student.Cname) {
                                self.campusIndex = i;
                            }
                            self.campusNameList.push(res.data.Data[i].Cname);
                        }
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Sid = options.sid;

            self.getStudentData();
        }
    }]);

    return Student;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Student , 'pages/student/student-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQtZGV0YWlsLmpzIl0sIm5hbWVzIjpbIlN0dWRlbnQiLCJkYXRhIiwiU2lkIiwic3R1ZGVudCIsImltZ0xpc3QiLCJncmFkZVBpY2tlciIsImdyYWRlSW5kZXgiLCJjYW1wdXNMaXN0IiwiY2FtcHVzTmFtZUxpc3QiLCJjYW1wdXNJbmRleCIsImlzQ2xpY2tFZGl0IiwiaW1nVXJsIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJjb3B5U3R1ZGVudCIsImNvcHlJbWdMaXN0IiwibWV0aG9kcyIsInBpY2tlckdyYWRlQ2hhbmdlIiwiZSIsInNlbGYiLCJkZXRhaWwiLCJ2YWx1ZSIsInBpY2tlckNhbXB1c0NoYW5nZSIsIm9uQ2xpY2tFZGl0U3R1ZGVudCIsImNoZWNrYm94Q2hhbmdlIiwidmFsdWVzIiwiaSIsImxlbkkiLCJjYW1wdXNDaGVja0xpc3QiLCJsZW5ndGgiLCJjaGVja2VkIiwiaiIsImxlbkoiLCJDaG9vc2VJbWFnZSIsImZpbGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5IiwiVmlld0ltYWdlIiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJ1cmwiLCJEZWxJbWciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJjb25maXJtIiwic3BsaWNlIiwiaW5kZXgiLCJvbkNsaWNrRGVsZXRlU3R1ZGVudCIsInJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImZvcm1TdWJtaXQiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJzZW5kRm9ybURhdGEiLCJOdW1iZXIiLCJpbmRleE9mIiwicmVwbGFjZSIsImxhc3RpbmRleCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicmVjdXJzaW9uSW1nVXBsb2FkIiwiZ2V0U3R1ZGVudERhdGEiLCJpbWdQYXRocyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsImRpck5hbWUiLCJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHVzaCIsIlNpY29uIiwiZ2V0Q2FtcHVzRGF0YSIsIlNncmFkZU5hbWUiLCJDbmFtZSIsIm9wdGlvbnMiLCJzaWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFLO0FBQ0RDLGlCQUFLLElBREo7QUFFREMscUJBQVMsRUFGUjtBQUdEQyxxQkFBUyxFQUhSO0FBSURDLHlCQUFZLENBQUMsSUFBRCxFQUFNLEtBQU4sRUFBWSxLQUFaLEVBQWtCLEtBQWxCLEVBQXdCLElBQXhCLEVBQTZCLElBQTdCLEVBQWtDLElBQWxDLEVBQXVDLElBQXZDLENBSlg7QUFLREMsd0JBQVcsSUFMVjtBQU1EQyx3QkFBVyxFQU5WO0FBT0RDLDRCQUFlLEVBUGQ7QUFRREMseUJBQVksSUFSWDtBQVNEQyx5QkFBYSxLQVRaO0FBVURDLG9CQUFPQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLDJCQVY1QztBQVdEQyx5QkFBYSxFQVhaO0FBWURDLHlCQUFhO0FBWlosUyxRQWVMQyxPLEdBQVM7QUFDTEMsNkJBREssNkJBQ2FDLENBRGIsRUFDZTtBQUNoQixvQkFBSUMsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLZixVQUFMLEdBQWtCYyxFQUFFRSxNQUFGLENBQVNDLEtBQTNCO0FBQ0gsYUFKSTtBQU1MQyw4QkFOSyw4QkFNY0osQ0FOZCxFQU1nQjtBQUNq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QUtiLGNBQUwsR0FBc0IsRUFBdEI7QUFDQSw2QkFBSyxJQUFJb0IsSUFBSSxDQUFiLEVBQWVBLElBQUVpQixJQUFJNUMsSUFBSixDQUFTK0YsSUFBVCxDQUFjakUsTUFBL0IsRUFBc0NILEdBQXRDLEVBQTBDO0FBQ3RDLGdDQUFHaUIsSUFBSTVDLElBQUosQ0FBUytGLElBQVQsQ0FBY3BFLENBQWQsRUFBaUI0RSxLQUFqQixJQUEwQm5GLEtBQUtsQixPQUFMLENBQWFxRyxLQUExQyxFQUFnRDtBQUM1Q25GLHFDQUFLWixXQUFMLEdBQW1CbUIsQ0FBbkI7QUFDSDtBQUNEUCxpQ0FBS2IsY0FBTCxDQUFvQjRGLElBQXBCLENBQXlCdkQsSUFBSTVDLElBQUosQ0FBUytGLElBQVQsQ0FBY3BFLENBQWQsRUFBaUI0RSxLQUExQztBQUNIO0FBQ0RuRiw2QkFBSzBCLE1BQUw7QUFDSDtBQUNKO0FBbEJJLGFBQWI7QUFvQkg7OzsrQkFFTTBELE8sRUFBUztBQUNaLGdCQUFJcEYsT0FBTyxJQUFYOztBQUVBQSxpQkFBS25CLEdBQUwsR0FBV3VHLFFBQVFDLEdBQW5COztBQUVBckYsaUJBQUtvRSxjQUFMO0FBRUg7Ozs7RUE1UmdDN0UsZUFBSytGLEk7O2tCQUFyQjNHLE8iLCJmaWxlIjoic3R1ZGVudC1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R1ZGVudCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFNpZDogbnVsbCxcclxuICAgICAgICBzdHVkZW50OiB7fSxcclxuICAgICAgICBpbWdMaXN0OiBbXSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+Wwj+WtpicsJ+S4g+W5tOe6pycsJ+WFq+W5tOe6pycsJ+S5neW5tOe6pycsJ+mrmOS4gCcsJ+mrmOS6jCcsJ+mrmOS4iScsJ+Wkp+WtpiddLFxyXG4gICAgICAgIGdyYWRlSW5kZXg6bnVsbCxcclxuICAgICAgICBjYW1wdXNMaXN0OltdLFxyXG4gICAgICAgIGNhbXB1c05hbWVMaXN0OltdLFxyXG4gICAgICAgIGNhbXB1c0luZGV4Om51bGwsXHJcbiAgICAgICAgaXNDbGlja0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgIGltZ1VybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9JyxcclxuICAgICAgICBjb3B5U3R1ZGVudDoge30sXHJcbiAgICAgICAgY29weUltZ0xpc3Q6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9IHtcclxuICAgICAgICBwaWNrZXJHcmFkZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZ3JhZGVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyQ2FtcHVzQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5jYW1wdXNJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0VkaXRTdHVkZW50KCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdCA9IHNlbGYuaXNDbGlja0VkaXQ/ZmFsc2U6dHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbkkgPSBzZWxmLmNhbXB1c0NoZWNrTGlzdC5sZW5ndGg7IGkgPCBsZW5JOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzQ2hlY2tMaXN0W2ldLmNoZWNrZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsZW5KID0gdmFsdWVzLmxlbmd0aDsgaiA8IGxlbko7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbXB1c0NoZWNrTGlzdFtpXS52YWx1ZSA9PT0gdmFsdWVzW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzQ2hlY2tMaXN0W2ldLmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENob29zZUltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSwgLy/pu5jorqQ5XHJcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8v5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdD0gcmVzLnRlbXBGaWxlUGF0aHNcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZpZXdJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1nTGlzdCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBEZWxJbWcoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOmimOebruWbvueJhycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5Yig6Zmk6L+Z5byg5Zu+54mH5ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0LnNwbGljZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBvbkNsaWNrRGVsZXRlU3R1ZGVudCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5rOo6ZSA5a2m55Sf6LSm5Y+3JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHms6jplIDmraTlrabnlJ/otKblj7fvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZGVsZXRlX3N0dWRlbnQvOmlkJyArICc/U2lkPScgKyBzZWxmLlNpZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWxldGUgU3R1ZGVudCBTdWNjZXNzIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+azqOmUgOaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzVXAgPSAwOyAvL+aIkOWKn1xyXG4gICAgICAgICAgICBsZXQgZmFpbFVwID0gMDsgLy/lpLHotKVcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgLy/nrKzlh6DlvKBcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5sZW5ndGg7IC8v5oC75pWwXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydTaWQnXSA9IE51bWJlcihzZWxmLlNpZClcclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW1nTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBcIlwiXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHNlbGYuaW1nTGlzdFswXS5pbmRleE9mKHNlbGYuaW1nVXJsKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBzZWxmLmltZ0xpc3RbMF0ucmVwbGFjZShzZWxmLmltZ1VybCxcIlwiKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXggPSBzZWxmLmltZ0xpc3RbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ1NpY29uJ10gPSBcInVzZXJfYXZhdGFyL1wiICsgc2VsZi5pbWdMaXN0WzBdLnN1YnN0cmluZyhsYXN0aW5kZXggKyAxLCBzZWxmLmltZ0xpc3RbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZW5kRm9ybURhdGEpXHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi91cGRhdGVfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogc2VuZEZvcm1EYXRhLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+a3u+WKoOWktOWDj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsZW5ndGg+MCAmJiBzZWxmLmltZ0xpc3RbMF0uaW5kZXhPZihzZWxmLmltZ1VybCkgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixzZWxmLmltZ0xpc3QsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzQ2xpY2tFZGl0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDpgJLlvZLmlrnlvI/kuIrkvKDlpJrlvKDlm77niYdcclxuICAgIHJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLCBzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aCl7XHJcbiAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvdXBsb2FkX2ZpbGUnLCAvL+W8gOWPkeiAheacjeWKoeWZqCB1cmxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZmlsZVBhdGg6IGltZ1BhdGhzW2NvdW50XSwgLy/opoHkuIrkvKDmlofku7botYTmupDnmoTot6/lvoRcclxuICAgICAgICAgICAgbmFtZTogJ3VwbG9hZEZpbGUnLCAvL+aWh+S7tuWvueW6lOeahCBrZXkgLCDlvIDlj5HogIXlnKjmnI3liqHlmajnq6/pgJrov4fov5nkuKoga2V5IOWPr+S7peiOt+WPluWIsOaWh+S7tuS6jOi/m+WItuWGheWuuVxyXG4gICAgICAgICAgICBmb3JtRGF0YTp7XHJcbiAgICAgICAgICAgICAgICBkaXJOYW1lOlwiaW1hZ2VzL3VzZXJfYXZhdGFyXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5kYXRhLkNvZGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5Yqf56ysXCIgKyBjb3VudCArIFwi5bygXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzVXArKzsvL+aIkOWKnysxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZSl7XHJcbiAgICAgICAgICAgICAgICBmYWlsVXArKzsvL+Wksei0pSsxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKGUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFN0dWRlbnREYXRhKClcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnQgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5U3R1ZGVudCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VsZi5zdHVkZW50KSkgLy/mt7Hmi7fotJ1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3QgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdC5wdXNoKHNlbGYuaW1nVXJsICsgcmVzLmRhdGEuRGF0YS5TaWNvbilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvcHlJbWdMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZWxmLmltZ0xpc3QpKSAvL+a3seaLt+i0nVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0Q2FtcHVzRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmdyYWRlUGlja2VyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmdyYWRlUGlja2VyW2ldID09IHJlcy5kYXRhLkRhdGEuU2dyYWRlTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdyYWRlSW5kZXggPSBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldENhbXB1c0RhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2dldF9jYW1wdXNfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW1wdXNOYW1lTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwO2k8cmVzLmRhdGEuRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGFbaV0uQ25hbWUgPT0gc2VsZi5zdHVkZW50LkNuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbXB1c0luZGV4ID0gaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW1wdXNOYW1lTGlzdC5wdXNoKHJlcy5kYXRhLkRhdGFbaV0uQ25hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLlNpZCA9IG9wdGlvbnMuc2lkXHJcblxyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=