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
            Tid: null,
            teacher: {},
            imgList: [],
            campusCheckList: [],
            isClickEdit: false,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            copyTeacher: {},
            copyImgList: []
        }, _this.methods = {
            onClickEditTeacher: function onClickEditTeacher() {
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
            onClickDeleteTeacher: function onClickDeleteTeacher() {
                var self = this;
                wx.showModal({
                    title: '注销教师账号',
                    content: '确定要注销此教师账号吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/delete_teacher/:id' + '?Tid=' + self.Tid.toString(),
                                method: 'DELETE',
                                header: _wepy2.default.$instance.setHeader(),
                                success: function success(res) {
                                    console.log(res);
                                    if (res.data.Code == 1) {
                                        console.log("Delete Teacher Success!");
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
                sendFormData['Tid'] = Number(self.Tid);

                if (self.imgList.length == 0) {
                    sendFormData['Ticon'] = "";
                } else if (self.imgList[0].indexOf(self.imgUrl) != -1) {
                    sendFormData['Ticon'] = self.imgList[0].replace(self.imgUrl, "");
                } else {
                    var lastindex = self.imgList[0].lastIndexOf("/");
                    sendFormData['Ticon'] = "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                sendFormData['Cnames'] = [];
                for (var i = 0; i < self.campusCheckList.length; i++) {
                    if (self.campusCheckList[i].checked) {
                        sendFormData['Cnames'].push(self.campusCheckList[i].value);
                    }
                }
                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/update_teacher',
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
                                self.getTeacherData();
                            }

                            self.isClickEdit = false;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
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
                    self.getTeacherData();
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }
    }, {
        key: 'getTeacherData',
        value: function getTeacherData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_teacher',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Tid: self.Tid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.teacher = res.data.Data;
                        self.copyTeacher = JSON.parse(JSON.stringify(self.teacher)); //深拷贝

                        self.imgList = [];
                        self.imgList.push(self.imgUrl + res.data.Data.Ticon);
                        self.copyImgList = JSON.parse(JSON.stringify(self.imgList)); //深拷贝
                        self.$apply();

                        self.getCampusData();
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
                        self.campusCheckList = [];
                        for (var i = 0; i < res.data.Data.length; i++) {
                            self.campusCheckList.push({
                                value: res.data.Data[i].Cid.toString(),
                                name: res.data.Data[i].Cname,
                                checked: self.teacher.Cnames.includes(res.data.Data[i].Cname)
                            });
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

            self.Tid = options.tid;

            self.getTeacherData();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/teacher/teacher-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXItZGV0YWlsLmpzIl0sIm5hbWVzIjpbIlRlYWNoZXIiLCJkYXRhIiwiVGlkIiwidGVhY2hlciIsImltZ0xpc3QiLCJjYW1wdXNDaGVja0xpc3QiLCJpc0NsaWNrRWRpdCIsImltZ1VybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiY29weVRlYWNoZXIiLCJjb3B5SW1nTGlzdCIsIm1ldGhvZHMiLCJvbkNsaWNrRWRpdFRlYWNoZXIiLCJzZWxmIiwiY2hlY2tib3hDaGFuZ2UiLCJlIiwidmFsdWVzIiwiZGV0YWlsIiwidmFsdWUiLCJpIiwibGVuSSIsImxlbmd0aCIsImNoZWNrZWQiLCJqIiwibGVuSiIsIkNob29zZUltYWdlIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCIkYXBwbHkiLCJWaWV3SW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsInVybCIsIkRlbEltZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsImNvbmZpcm0iLCJzcGxpY2UiLCJpbmRleCIsIm9uQ2xpY2tEZWxldGVUZWFjaGVyIiwicmVxdWVzdCIsInRvU3RyaW5nIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJtYXNrIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZm9ybVN1Ym1pdCIsInN1Y2Nlc3NVcCIsImZhaWxVcCIsInNlbmRGb3JtRGF0YSIsIk51bWJlciIsImluZGV4T2YiLCJyZXBsYWNlIiwibGFzdGluZGV4IiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJwdXNoIiwicmVjdXJzaW9uSW1nVXBsb2FkIiwiZ2V0VGVhY2hlckRhdGEiLCJpbWdQYXRocyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJmb3JtRGF0YSIsImRpck5hbWUiLCJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiVGljb24iLCJnZXRDYW1wdXNEYXRhIiwiQ2lkIiwiQ25hbWUiLCJDbmFtZXMiLCJpbmNsdWRlcyIsIm9wdGlvbnMiLCJ0aWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFLO0FBQ0RDLGlCQUFLLElBREo7QUFFREMscUJBQVMsRUFGUjtBQUdEQyxxQkFBUyxFQUhSO0FBSURDLDZCQUFpQixFQUpoQjtBQUtEQyx5QkFBYSxLQUxaO0FBTURDLG9CQUFPQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLDJCQU41QztBQU9EQyx5QkFBYSxFQVBaO0FBUURDLHlCQUFhO0FBUlosUyxRQVdMQyxPLEdBQVM7QUFDTEMsOEJBREssZ0NBQ2dCO0FBQ2pCLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUtWLFdBQUwsR0FBbUJVLEtBQUtWLFdBQUwsR0FBaUIsS0FBakIsR0FBdUIsSUFBMUM7QUFDSCxhQUpJO0FBTUxXLDBCQU5LLDBCQU1VQyxDQU5WLEVBTWE7QUFDZCxvQkFBSUYsT0FBTyxJQUFYOztBQUVBLG9CQUFJRyxTQUFTRCxFQUFFRSxNQUFGLENBQVNDLEtBQXRCO0FBQ0EscUJBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE9BQU9QLEtBQUtYLGVBQUwsQ0FBcUJtQixNQUE1QyxFQUFvREYsSUFBSUMsSUFBeEQsRUFBOEQsRUFBRUQsQ0FBaEUsRUFBbUU7QUFDL0ROLHlCQUFLWCxlQUFMLENBQXFCaUIsQ0FBckIsRUFBd0JHLE9BQXhCLEdBQWtDLEtBQWxDOztBQUVBLHlCQUFLLElBQUlDLElBQUksQ0FBUixF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QUFFQUEsaUJBQUtkLEdBQUwsR0FBV2tHLFFBQVFDLEdBQW5COztBQUVBckYsaUJBQUttRSxjQUFMO0FBRUg7Ozs7RUFoUmdDM0UsZUFBSzhGLEk7O2tCQUFyQnRHLE8iLCJmaWxlIjoidGVhY2hlci1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFRpZDogbnVsbCxcclxuICAgICAgICB0ZWFjaGVyOiB7fSxcclxuICAgICAgICBpbWdMaXN0OiBbXSxcclxuICAgICAgICBjYW1wdXNDaGVja0xpc3Q6IFtdLFxyXG4gICAgICAgIGlzQ2xpY2tFZGl0OiBmYWxzZSxcclxuICAgICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgY29weVRlYWNoZXI6IHt9LFxyXG4gICAgICAgIGNvcHlJbWdMaXN0OiBbXSxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzPSB7XHJcbiAgICAgICAgb25DbGlja0VkaXRUZWFjaGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdCA9IHNlbGYuaXNDbGlja0VkaXQ/ZmFsc2U6dHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbkkgPSBzZWxmLmNhbXB1c0NoZWNrTGlzdC5sZW5ndGg7IGkgPCBsZW5JOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzQ2hlY2tMaXN0W2ldLmNoZWNrZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsZW5KID0gdmFsdWVzLmxlbmd0aDsgaiA8IGxlbko7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbXB1c0NoZWNrTGlzdFtpXS52YWx1ZSA9PT0gdmFsdWVzW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FtcHVzQ2hlY2tMaXN0W2ldLmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENob29zZUltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSwgLy/pu5jorqQ5XHJcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8v5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdD0gcmVzLnRlbXBGaWxlUGF0aHNcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZpZXdJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1nTGlzdCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBEZWxJbWcoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOmimOebruWbvueJhycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5Yig6Zmk6L+Z5byg5Zu+54mH5ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0LnNwbGljZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0RlbGV0ZVRlYWNoZXIoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+azqOmUgOaVmeW4iOi0puWPtycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5rOo6ZSA5q2k5pWZ5biI6LSm5Y+35ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2RlbGV0ZV90ZWFjaGVyLzppZCcgKyAnP1RpZD0nICsgc2VsZi5UaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDonREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVsZXRlIFRlYWNoZXIgU3VjY2VzcyFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfms6jplIDmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JtU3VibWl0KGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc1VwID0gMDsgLy/miJDlip9cclxuICAgICAgICAgICAgbGV0IGZhaWxVcCA9IDA7IC8v5aSx6LSlXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7IC8v56ys5Yeg5bygXHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QubGVuZ3RoOyAvL+aAu+aVsFxyXG5cclxuICAgICAgICAgICAgbGV0IHNlbmRGb3JtRGF0YSA9IGUuZGV0YWlsLnZhbHVlIC8vIGZvcm0g6KGo5Y2V5pWw5o2uXHJcbiAgICAgICAgICAgIHNlbmRGb3JtRGF0YVsnVGlkJ10gPSBOdW1iZXIoc2VsZi5UaWQpXHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gXCJcIlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzZWxmLmltZ0xpc3RbMF0uaW5kZXhPZihzZWxmLmltZ1VybCkgIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gc2VsZi5pbWdMaXN0WzBdLnJlcGxhY2Uoc2VsZi5pbWdVcmwsXCJcIilcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGluZGV4ID0gc2VsZi5pbWdMaXN0WzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gXCJ1c2VyX2F2YXRhci9cIiArIHNlbGYuaW1nTGlzdFswXS5zdWJzdHJpbmcobGFzdGluZGV4ICsgMSwgc2VsZi5pbWdMaXN0WzBdLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydDbmFtZXMnXSA9IFtdXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxmLmNhbXB1c0NoZWNrTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNhbXB1c0NoZWNrTGlzdFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbJ0NuYW1lcyddLnB1c2goc2VsZi5jYW1wdXNDaGVja0xpc3RbaV0udmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vdXBkYXRlX3RlYWNoZXInLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDlpLTlg49cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoPjAgJiYgc2VsZi5pbWdMaXN0WzBdLmluZGV4T2Yoc2VsZi5pbWdVcmwpID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0LCBzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFRlYWNoZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g6YCS5b2S5pa55byP5LiK5Lyg5aSa5byg5Zu+54mHXHJcbiAgICByZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpe1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbWdQYXRoc1tjb3VudF0sIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImltYWdlcy91c2VyX2F2YXRhclwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5Db2RlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn+esrFwiICsgY291bnQgKyBcIuW8oFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc1VwKys7Ly/miJDlip8rMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKys7Ly/lpLHotKUrMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZShlKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50ID09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRUZWFjaGVyRGF0YSgpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVhY2hlckRhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvYWRtaW4vZ2V0X3RlYWNoZXInLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgVGlkOnNlbGYuVGlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50ZWFjaGVyID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weVRlYWNoZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYudGVhY2hlcikpIC8v5rex5ou36LSdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0LnB1c2goc2VsZi5pbWdVcmwgKyByZXMuZGF0YS5EYXRhLlRpY29uKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUltZ0xpc3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYuaW1nTGlzdCkpIC8v5rex5ou36LSdXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENhbXB1c0RhdGEoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYW1wdXNEYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9hZG1pbi9nZXRfY2FtcHVzX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbXB1c0NoZWNrTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPHJlcy5kYXRhLkRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbXB1c0NoZWNrTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLmRhdGEuRGF0YVtpXS5DaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXMuZGF0YS5EYXRhW2ldLkNuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHNlbGYudGVhY2hlci5DbmFtZXMuaW5jbHVkZXMocmVzLmRhdGEuRGF0YVtpXS5DbmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLlRpZCA9IG9wdGlvbnMudGlkXHJcblxyXG4gICAgICAgIHNlbGYuZ2V0VGVhY2hlckRhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=