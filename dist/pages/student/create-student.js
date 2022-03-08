'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _WxValidate = require('./../../utils/WxValidate.js');

var _WxValidate2 = _interopRequireDefault(_WxValidate);

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
            imgList: [],
            gradePicker: ['七年级', '八年级', '九年级', '高一', '高二', '高三'],
            gradeIndex: null,
            campusList: [],
            campusNameList: [],
            campusIndex: 0,
            nameUploadPath: "",
            answerUploadPath: "",
            audioUploadPath: "",
            recordingTimeqwe: 0, //录音计时
            setInter: "", //录音名称
            duration: ""
        }, _this.methods = {
            pickerGradeChange: function pickerGradeChange(e) {
                var self = this;
                self.gradeIndex = e.detail.value;
            },
            pickerCampusChange: function pickerCampusChange(e) {
                var self = this;
                self.campusIndex = e.detail.value;
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
            formSubmit: function formSubmit(e) {
                var self = this;

                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张
                var length = self.imgList.length; //总数

                var sendFormData = e.detail.value; // form 表单数据

                if (!self.WxValidate.checkForm(sendFormData)) {

                    //表单元素验证不通过，此处给出相应提示
                    var error = self.WxValidate.errorList[0];
                    wx.showToast({
                        title: error.msg, //提示的内容,
                        icon: 'none', //图标,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: function success(res) {}
                    });
                    return false;
                }

                if (self.imgList.length > 0) {
                    var lastindex = self.imgList[0].lastIndexOf("/");
                    sendFormData['Sicon'] = self.imgList.length == 0 ? "" : "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/insert_student',
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

                            //添加头像
                            if (length > 0) {
                                self.recursionImgUpload(self, self.imgList, successUp, failUp, count, length);
                            }

                            setTimeout(function () {
                                _wepy2.default.navigateBack({
                                    delta: 1
                                });
                            }, 1000);
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

    _createClass(Student, [{
        key: 'initValidate',
        value: function initValidate() {
            var rules = {
                Sname: {
                    required: true,
                    maxlength: 10
                },
                Snickname: {
                    required: true,
                    maxlength: 10
                },
                Sphone: {
                    required: true,
                    tel: true
                }
            };

            var message = {
                Sname: {
                    required: '请输入您的用户名',
                    maxlength: '用户名不能超过10个字'
                },
                Snickname: {
                    required: '请输入您的昵称',
                    maxlength: '昵称不能超过10个字'
                },
                Sphone: {
                    required: '请输入您的手机号',
                    maxlength: '请输入正确的手机号'
                }
                //实例化当前的验证规则和提示消息
            };this.WxValidate = new _WxValidate2.default(rules, message);
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
                        for (var i = 0; i < res.data.Data.length; i++) {
                            self.campusNameList.push(res.data.Data[i].Cname);
                        }
                        self.$apply();
                    }
                }
            });
        }

        // 递归方式上传多张图片

    }, {
        key: 'recursionImgUpload',
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
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var self = this;
            self.getCampusData();
            self.initValidate();
        }
    }]);

    return Student;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Student , 'pages/student/create-student'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1zdHVkZW50LmpzIl0sIm5hbWVzIjpbIlN0dWRlbnQiLCJkYXRhIiwiaW1nTGlzdCIsImdyYWRlUGlja2VyIiwiZ3JhZGVJbmRleCIsImNhbXB1c0xpc3QiLCJjYW1wdXNOYW1lTGlzdCIsImNhbXB1c0luZGV4IiwibmFtZVVwbG9hZFBhdGgiLCJhbnN3ZXJVcGxvYWRQYXRoIiwiYXVkaW9VcGxvYWRQYXRoIiwicmVjb3JkaW5nVGltZXF3ZSIsInNldEludGVyIiwiZHVyYXRpb24iLCJtZXRob2RzIiwicGlja2VyR3JhZGVDaGFuZ2UiLCJlIiwic2VsZiIsImRldGFpbCIsInZhbHVlIiwicGlja2VyQ2FtcHVzQ2hhbmdlIiwiQ2hvb3NlSW1hZ2UiLCJmaWxlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIiRhcHBseSIsIlZpZXdJbWFnZSIsInByZXZpZXdJbWFnZSIsInVybHMiLCJjdXJyZW50IiwidXJsIiwiRGVsSW1nIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0IiwiY29uZmlybSIsInNwbGljZSIsImluZGV4IiwiZm9ybVN1Ym1pdCIsInN1Y2Nlc3NVcCIsImZhaWxVcCIsImxlbmd0aCIsInNlbmRGb3JtRGF0YSIsIld4VmFsaWRhdGUiLCJjaGVja0Zvcm0iLCJlcnJvciIsImVycm9yTGlzdCIsInNob3dUb2FzdCIsIm1zZyIsImljb24iLCJtYXNrIiwibGFzdGluZGV4IiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlcXVlc3QiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInJlY3Vyc2lvbkltZ1VwbG9hZCIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIk1zZyIsInJ1bGVzIiwiU25hbWUiLCJyZXF1aXJlZCIsIm1heGxlbmd0aCIsIlNuaWNrbmFtZSIsIlNwaG9uZSIsInRlbCIsIm1lc3NhZ2UiLCJEYXRhIiwiaSIsInB1c2giLCJDbmFtZSIsImltZ1BhdGhzIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwiZGlyTmFtZSIsImdldENhbXB1c0RhdGEiLCJpbml0VmFsaWRhdGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQUs7QUFDREMscUJBQVMsRUFEUjtBQUVEQyx5QkFBWSxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixFQUFtQixJQUFuQixFQUF3QixJQUF4QixFQUE2QixJQUE3QixDQUZYO0FBR0RDLHdCQUFXLElBSFY7QUFJREMsd0JBQVcsRUFKVjtBQUtEQyw0QkFBZSxFQUxkO0FBTURDLHlCQUFZLENBTlg7QUFPREMsNEJBQWUsRUFQZDtBQVFEQyw4QkFBaUIsRUFSaEI7QUFTREMsNkJBQWdCLEVBVGY7QUFVREMsOEJBQWlCLENBVmhCLEVBVWtCO0FBQ25CQyxzQkFBUyxFQVhSLEVBV1c7QUFDWkMsc0JBQVM7QUFaUixTLFFBZUxDLE8sR0FBUztBQUNMQyw2QkFESyw2QkFDYUMsQ0FEYixFQUNlO0FBQ2hCLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUtiLFVBQUwsR0FBa0JZLEVBQUVFLE1BQUYsQ0FBU0MsS0FBM0I7QUFDSCxhQUpJO0FBTUxDLDhCQU5LLDhCQU1jSixDQU5kLEVBTWdCO0FBQ2pCLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUtWLFdBQUwsR0FBbUJTLEVBQUVFLE1BQUYsQ0FBU0MsS0FBNUI7QUFDSCxhQVRJO0FBV0xFLHVCQVhLLHVCQVdPTCxDQVhQLEVBV1U7QUFDWCxvQkFB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VCxFQWlCVztBQUNIa0MseUJBREcsQ0FDTTtBQUNaLGFBbkJMLG1FQW9CYWxDLENBcEJiLEVBb0JlOztBQUVQVztBQUNBLG9CQUFHQSxTQUFTd0IsTUFBWixFQUFvQjtBQUNoQmEsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsaUJBRkQsTUFFSztBQUNEaEQseUJBQUswRCxrQkFBTCxDQUF3QjFELElBQXhCLEVBQTZCMkUsUUFBN0IsRUFBc0MzQyxTQUF0QyxFQUFpREMsTUFBakQsRUFBeUR2QixLQUF6RCxFQUFnRXdCLE1BQWhFO0FBQ0g7QUFDSixhQTVCTDtBQStCSDs7O2lDQUVRO0FBQ0wsZ0JBQUlsQyxPQUFPLElBQVg7QUFDQUEsaUJBQUtpRixhQUFMO0FBQ0FqRixpQkFBS2tGLFlBQUw7QUFDSDs7OztFQWxQZ0NqQyxlQUFLa0MsSTs7a0JBQXJCcEcsTyIsImZpbGUiOiJjcmVhdGUtc3R1ZGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgV3hWYWxpZGF0ZSBmcm9tIFwiLi4vLi4vdXRpbHMvV3hWYWxpZGF0ZVwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0dWRlbnQgZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBpbWdMaXN0OiBbXSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6pycsJ+WFq+W5tOe6pycsJ+S5neW5tOe6pycsJ+mrmOS4gCcsJ+mrmOS6jCcsJ+mrmOS4iSddLFxyXG4gICAgICAgIGdyYWRlSW5kZXg6bnVsbCxcclxuICAgICAgICBjYW1wdXNMaXN0OltdLFxyXG4gICAgICAgIGNhbXB1c05hbWVMaXN0OltdLFxyXG4gICAgICAgIGNhbXB1c0luZGV4OjAsXHJcbiAgICAgICAgbmFtZVVwbG9hZFBhdGg6XCJcIixcclxuICAgICAgICBhbnN3ZXJVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYXVkaW9VcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgcmVjb3JkaW5nVGltZXF3ZTowLC8v5b2V6Z+z6K6h5pe2XHJcbiAgICAgICAgc2V0SW50ZXI6XCJcIiwvL+W9lemfs+WQjeensFxyXG4gICAgICAgIGR1cmF0aW9uOlwiXCIsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIHBpY2tlckdyYWRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5ncmFkZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJDYW1wdXNDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmNhbXB1c0luZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDaG9vc2VJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsIC8v6buY6K6kOVxyXG4gICAgICAgICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvL+WPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3Q9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltZ0xpc3QsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRGVsSW1nKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTpopjnm67lm77niYcnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOi/meW8oOWbvueJh+WQl++8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdC5zcGxpY2UoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzVXAgPSAwOyAvL+aIkOWKn1xyXG4gICAgICAgICAgICBsZXQgZmFpbFVwID0gMDsgLy/lpLHotKVcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgLy/nrKzlh6DlvKBcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5sZW5ndGg7IC8v5oC75pWwXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuXHJcbiAgICAgICAgICAgIGlmICghc2VsZi5XeFZhbGlkYXRlLmNoZWNrRm9ybShzZW5kRm9ybURhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6KGo5Y2V5YWD57Sg6aqM6K+B5LiN6YCa6L+H77yM5q2k5aSE57uZ5Ye655u45bqU5o+Q56S6XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBzZWxmLld4VmFsaWRhdGUuZXJyb3JMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlcnJvci5tc2csIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW1nTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGluZGV4ID0gc2VsZi5pbWdMaXN0WzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydTaWNvbiddID0gc2VsZi5pbWdMaXN0Lmxlbmd0aCA9PSAwPyBcIlwiIDogXCJ1c2VyX2F2YXRhci9cIiArIHNlbGYuaW1nTGlzdFswXS5zdWJzdHJpbmcobGFzdGluZGV4ICsgMSwgc2VsZi5pbWdMaXN0WzBdLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vaW5zZXJ0X3N0dWRlbnQnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5re75Yqg5oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDlpLTlg49cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixzZWxmLmltZ0xpc3QsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuQ29kZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuTXNnID09IFwiUGFzc3dvcmQgbm90IGNvbnNpc3RlbnQhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuKTmrKHlr4bnoIHkuI3kuIDoh7QnLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuTXNnID09IFwiVXNlcm5hbWUgZXhpc3RlZCFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eUqOaIt+WQjeW3suWtmOWcqCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRWYWxpZGF0ZSgpIHtcclxuICAgICAgICBsZXQgcnVsZXMgPSB7XHJcbiAgICAgICAgICAgIFNuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgU25pY2tuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgU3Bob25lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcclxuICAgICAgICAgICAgU25hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE55So5oi35ZCNJyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+eUqOaIt+WQjeS4jeiDvei2hei/hzEw5Liq5a2XJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBTbmlja25hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE5pi156ewJyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+aYteensOS4jeiDvei2hei/hzEw5Liq5a2XJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBTcGhvbmU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE5omL5py65Y+3JyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WunuS+i+WMluW9k+WJjeeahOmqjOivgeinhOWImeWSjOaPkOekuua2iOaBr1xyXG4gICAgICAgIHRoaXMuV3hWYWxpZGF0ZSA9IG5ldyBXeFZhbGlkYXRlKHJ1bGVzLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYW1wdXNEYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfY2FtcHVzX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbXB1c0xpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwO2k8cmVzLmRhdGEuRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzTmFtZUxpc3QucHVzaChyZXMuZGF0YS5EYXRhW2ldLkNuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCS5b2S5pa55byP5LiK5Lyg5aSa5byg5Zu+54mHXHJcbiAgICByZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpe1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbWdQYXRoc1tjb3VudF0sIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImltYWdlcy91c2VyX2F2YXRhclwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5Db2RlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn+esrFwiICsgY291bnQgKyBcIuW8oFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc1VwKys7Ly/miJDlip8rMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKys7Ly/lpLHotKUrMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZShlKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50ID09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0Q2FtcHVzRGF0YSgpXHJcbiAgICAgICAgc2VsZi5pbml0VmFsaWRhdGUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19