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
            imgList: []
        }, _this.methods = {
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
                    sendFormData['Ticon'] = self.imgList.length == 0 ? "" : "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/insert_teacher',
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

    _createClass(Teacher, [{
        key: 'initValidate',
        value: function initValidate() {
            var rules = {
                Tname: {
                    required: true,
                    maxlength: 10
                },
                Tnickname: {
                    required: true,
                    maxlength: 10
                },
                Tphone: {
                    required: true,
                    tel: true
                }
            };

            var message = {
                Tname: {
                    required: '请输入您的用户名',
                    maxlength: '用户名不能超过10个字'
                },
                Tnickname: {
                    required: '请输入您的昵称',
                    maxlength: '昵称不能超过10个字'
                },
                Tphone: {
                    required: '请输入您的手机号',
                    maxlength: '请输入正确的手机号'
                }
                //实例化当前的验证规则和提示消息
            };this.WxValidate = new _WxValidate2.default(rules, message);
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
            self.initValidate();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/teacher/create-teacher'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS10ZWFjaGVyLmpzIl0sIm5hbWVzIjpbIlRlYWNoZXIiLCJkYXRhIiwiaW1nTGlzdCIsIm1ldGhvZHMiLCJDaG9vc2VJbWFnZSIsImUiLCJzZWxmIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCIkYXBwbHkiLCJWaWV3SW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsInVybCIsIkRlbEltZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsImNvbmZpcm0iLCJzcGxpY2UiLCJpbmRleCIsImZvcm1TdWJtaXQiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJsZW5ndGgiLCJzZW5kRm9ybURhdGEiLCJkZXRhaWwiLCJ2YWx1ZSIsIld4VmFsaWRhdGUiLCJjaGVja0Zvcm0iLCJlcnJvciIsImVycm9yTGlzdCIsInNob3dUb2FzdCIsIm1zZyIsImljb24iLCJtYXNrIiwibGFzdGluZGV4IiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlcXVlc3QiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInJlY3Vyc2lvbkltZ1VwbG9hZCIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIk1zZyIsInJ1bGVzIiwiVG5hbWUiLCJyZXF1aXJlZCIsIm1heGxlbmd0aCIsIlRuaWNrbmFtZSIsIlRwaG9uZSIsInRlbCIsIm1lc3NhZ2UiLCJpbWdQYXRocyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsImRpck5hbWUiLCJpbml0VmFsaWRhdGUiLCJw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RUFBVXpDLFMsRUFBV0MsTSxFQUFRdkIsSyxFQUFPd0IsTSxFQUFPO0FBQUE7O0FBQy9EaUIsMkJBQUt1QixVQUFMO0FBQ0lyRCxxQkFBSzhCLGVBQUtFLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsdUJBRC9DLEVBQ3dFO0FBQ3BFRSx3QkFBUU4sZUFBS0UsU0FBTCxDQUFlSyxTQUFmLEVBRlo7QUFHSWlCLDBCQUFVRixTQUFTL0QsS0FBVCxDQUhkLEVBRytCO0FBQzNCa0Usc0JBQU0sWUFKVixFQUl3QjtBQUNwQkMsMEJBQVM7QUFDTEMsNkJBQVE7QUFESDtBQUxiLDJEQVFZO0FBQ0osZ0NBQWdCO0FBRFosYUFSWixpRUFXWTNFLENBWFosRUFXYztBQUNOLG9CQUFJQSxFQUFFSixJQUFGLENBQU80RCxJQUFQLElBQWEsQ0FBakIsRUFBbUI7QUFDZlYsNEJBQVFDLEdBQVIsQ0FBWSxVQUFVeEMsS0FBVixHQUFrQixHQUE5QjtBQUNIO0FBQ0RzQiw0QkFKTSxDQUlNO0FBQ2YsYUFoQkwsMkRBaUJTN0IsQ0FqQlQsRUFpQlc7QUFDSDhCLHlCQURHLENBQ007QUFDWixhQW5CTCxtRUFvQmE5QixDQXBCYixFQW9CZTs7QUFFUE87QUFDQSxvQkFBR0EsU0FBU3dCLE1BQVosRUFBb0I7QUFDaEJlLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILGlCQUZELE1BRUs7QUFDRDlDLHlCQUFLd0Qsa0JBQUwsQ0FBd0J4RCxJQUF4QixFQUE2QnFFLFFBQTdCLEVBQXNDekMsU0FBdEMsRUFBaURDLE1BQWpELEVBQXlEdkIsS0FBekQsRUFBZ0V3QixNQUFoRTtBQUNIO0FBQ0osYUE1Qkw7QUErQkg7OztpQ0FFUTtBQUNMLGdCQUFJOUIsT0FBTyxJQUFYO0FBQ0FBLGlCQUFLMkUsWUFBTDtBQUNIOzs7O0VBeE1nQzVCLGVBQUs2QixJOztrQkFBckJsRixPIiwiZmlsZSI6ImNyZWF0ZS10ZWFjaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBXeFZhbGlkYXRlIGZyb20gXCIuLi8uLi91dGlscy9XeFZhbGlkYXRlXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGltZ0xpc3Q6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9IHtcclxuICAgICAgICBDaG9vc2VJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsIC8v6buY6K6kOVxyXG4gICAgICAgICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvL+WPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3Q9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltZ0xpc3QsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRGVsSW1nKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTpopjnm67lm77niYcnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOi/meW8oOWbvueJh+WQl++8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdC5zcGxpY2UoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzVXAgPSAwOyAvL+aIkOWKn1xyXG4gICAgICAgICAgICBsZXQgZmFpbFVwID0gMDsgLy/lpLHotKVcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgLy/nrKzlh6DlvKBcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5sZW5ndGg7IC8v5oC75pWwXHJcblxyXG4gICAgICAgICAgICBsZXQgc2VuZEZvcm1EYXRhID0gZS5kZXRhaWwudmFsdWUgLy8gZm9ybSDooajljZXmlbDmja5cclxuXHJcbiAgICAgICAgICAgIGlmICghc2VsZi5XeFZhbGlkYXRlLmNoZWNrRm9ybShzZW5kRm9ybURhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6KGo5Y2V5YWD57Sg6aqM6K+B5LiN6YCa6L+H77yM5q2k5aSE57uZ5Ye655u45bqU5o+Q56S6XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBzZWxmLld4VmFsaWRhdGUuZXJyb3JMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBlcnJvci5tc2csIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW1nTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGluZGV4ID0gc2VsZi5pbWdMaXN0WzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gc2VsZi5pbWdMaXN0Lmxlbmd0aCA9PSAwPyBcIlwiIDogXCJ1c2VyX2F2YXRhci9cIiArIHNlbGYuaW1nTGlzdFswXS5zdWJzdHJpbmcobGFzdGluZGV4ICsgMSwgc2VsZi5pbWdMaXN0WzBdLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vaW5zZXJ0X3RlYWNoZXInLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5re75Yqg5oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDlpLTlg49cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixzZWxmLmltZ0xpc3QsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuQ29kZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuTXNnID09IFwiUGFzc3dvcmQgbm90IGNvbnNpc3RlbnQhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuKTmrKHlr4bnoIHkuI3kuIDoh7QnLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuTXNnID09IFwiVXNlcm5hbWUgZXhpc3RlZCFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+eUqOaIt+WQjeW3suWtmOWcqCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRWYWxpZGF0ZSgpIHtcclxuICAgICAgICBsZXQgcnVsZXMgPSB7XHJcbiAgICAgICAgICAgIFRuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVG5pY2tuYW1lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogMTBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVHBob25lOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcclxuICAgICAgICAgICAgVG5hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE55So5oi35ZCNJyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+eUqOaIt+WQjeS4jeiDvei2hei/hzEw5Liq5a2XJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBUbmlja25hbWU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE5pi156ewJyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+aYteensOS4jeiDvei2hei/hzEw5Liq5a2XJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBUcGhvbmU6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAn6K+36L6T5YWl5oKo55qE5omL5py65Y+3JyxcclxuICAgICAgICAgICAgICAgIG1heGxlbmd0aDogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WunuS+i+WMluW9k+WJjeeahOmqjOivgeinhOWImeWSjOaPkOekuua2iOaBr1xyXG4gICAgICAgIHRoaXMuV3hWYWxpZGF0ZSA9IG5ldyBXeFZhbGlkYXRlKHJ1bGVzLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6YCS5b2S5pa55byP5LiK5Lyg5aSa5byg5Zu+54mHXHJcbiAgICByZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpe1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbWdQYXRoc1tjb3VudF0sIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImltYWdlcy91c2VyX2F2YXRhclwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5Db2RlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn+esrFwiICsgY291bnQgKyBcIuW8oFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc1VwKys7Ly/miJDlip8rMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKys7Ly/lpLHotKUrMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZShlKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50ID09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuaW5pdFZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==