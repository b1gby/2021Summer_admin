"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

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
      usingComponents: {
        "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"

      }
    }, _this.data = {
      adminIconLogin: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=admin_login.png',
      adminIconNoLogin: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=admin_no_login.png',
      userInfo: null,
      dialogShow: false,
      dialogShowOneButton: false,
      buttons: [{ text: '稍后登录' }, { text: '确定' }],
      oneButton: [{ text: '确定' }],
      orderTeacherList: []
    }, _this.methods = {
      onClickExitLogin: function onClickExitLogin() {
        var self = this;
        wx.showModal({
          title: '退出登录',
          content: '确定要退出登录吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: function success(res) {
            if (res.confirm) {
              // 清除session缓存
              _wepy2.default.removeStorageSync("sessionToken");
              _wepy2.default.removeStorageSync("sessionDate");
              _wepy2.default.removeStorageSync("sessionUserInfo");
              console.log("remove session!");
              _wepy2.default.$instance.onLaunch();
              self.onShow();
              self.$apply();
            }
          }
        });
      },
      onClick: function onClick(e) {
        var self = this;
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
      },
      onClickLogin: function onClickLogin() {
        var self = this;
        if (self.userInfo == null) {
          this.$navigate({ url: "login" });
        }
      },
      onClickOrder: function onClickOrder(e) {
        var self = this;
        var orderId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: "order/order-detail?otid=" + self.orderTeacherList[orderId].OTid

        });
      },
      tapDialogOneButton: function tapDialogOneButton(e) {
        var self = this;
        this.$navigate({ url: "login" });
        self.dialogShowOneButton = false;
      },
      tapDialogButton: function tapDialogButton(e) {
        var self = this;
        if (e.detail.index == 1) {
          this.$navigate({ url: "login" });
        }
        self.dialogShow = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "getOrderTeacherData",
    value: function getOrderTeacherData() {
      var self = this;

      _wepy2.default.request({
        url: _wepy2.default.$instance.globalData.serverUrl + '/app/admin/get_order_teacher_list',
        method: 'GET',
        header: _wepy2.default.$instance.setHeader(),

        success: function success(res) {
          console.log(res);
          if (res.data.Code == 1) {
            self.orderTeacherList = res.data.Data;
            self.$apply();
          }
        }
      });
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      var self = this;
    }
  }, {
    key: "onShow",
    value: function onShow() {

      var self = this;
      if (_wepy2.default.$instance.globalData.userInfo != null) {
        self.userInfo = _wepy2.default.$instance.globalData.userInfo;
        // self.getOrderTeacherData()
      } else {
        self.userInfo = null;
      }
      if (self.userInfo == null && !self.dialogShowOneButton) {
        self.dialogShow = true;
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsImFkbWluSWNvbkxvZ2luIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJhZG1pbkljb25Ob0xvZ2luIiwidXNlckluZm8iLCJkaWFsb2dTaG93IiwiZGlhbG9nU2hvd09uZUJ1dHRvbiIsImJ1dHRvbnMiLCJ0ZXh0Iiwib25lQnV0dG9uIiwib3JkZXJUZWFjaGVyTGlzdCIsIm1ldGhvZHMiLCJvbkNsaWNrRXhpdExvZ2luIiwic2VsZiIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZW1vdmVTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJvbkxhdW5jaCIsIm9uU2hvdyIsIiRhcHBseSIsIm9uQ2xpY2siLCJlIiwibmF2aWdhdGVUbyIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwib25DbGlja0xvZ2luIiwiJG5hdmlnYXRlIiwib25DbGlja09yZGVyIiwib3JkZXJJZCIsImlkIiwiT1RpZCIsInRhcERpYWxvZ09uZUJ1dHRvbiIsInRhcERpYWxvZ0J1dHRvbiIsImRldGFpbCIsImluZGV4IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkNvZGUiLCJEYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ3BCQyxNLEdBQVM7QUFDSkMsdUJBQWdCO0FBQ1oscUJBQWE7O0FBREQ7QUFEWixLLFFBUVRDLEksR0FBTztBQUNOQyxzQkFBZUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywwQ0FEL0M7QUFFTkMsd0JBQWlCSixlQUFLQyxTQUFM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LEdBQXdCVyxJQUFJeEIsSUFBSixDQUFTcUQsSUFBakM7QUFDQXJDLGlCQUFLZSxNQUFMO0FBQ0g7QUFDSjtBQVhJLE9BQWI7QUFhSDs7OzZCQUVLO0FBQ0osVUFBSWYsT0FBTyxJQUFYO0FBRUQ7Ozs2QkFFUTs7QUFFUCxVQUFJQSxPQUFPLElBQVg7QUFDQSxVQUFHZCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJHLFFBQTFCLElBQW9DLElBQXZDLEVBQTRDO0FBQzFDUyxhQUFLVCxRQUFMLEdBQWdCTCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJHLFFBQTFDO0FBQ047QUFDSyxPQUhELE1BR0s7QUFDSFMsYUFBS1QsUUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNELFVBQUdTLEtBQUtULFFBQUwsSUFBZSxJQUFmLElBQXVCLENBQUNTLEtBQUtQLG1CQUFoQyxFQUFvRDtBQUNsRE8sYUFBS1IsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBR0Y7Ozs7RUF2SDhCTixlQUFLb0QsSTs7a0JBQW5CekQsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcblx0Y29uZmlnID0ge1xuICAgICAgdXNpbmdDb21wb25lbnRzOntcbiAgICAgICAgICBcIm1wLWRpYWxvZ1wiOiBcIi9taW5pcHJvZ3JhbV9ucG0vd2V1aS1taW5pcHJvZ3JhbS9kaWFsb2cvZGlhbG9nXCIsXG4gICAgICAgICAgXG4gICAgICBcbiAgICAgIH1cbiAgICB9XG5cblx0ZGF0YSA9IHtcblx0XHRhZG1pbkljb25Mb2dpbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9YWRtaW5fbG9naW4ucG5nJyxcblx0XHRhZG1pbkljb25Ob0xvZ2luOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1hZG1pbl9ub19sb2dpbi5wbmcnLFxuXHRcdHVzZXJJbmZvOiBudWxsLFxuXHRcdGRpYWxvZ1Nob3c6IGZhbHNlLFxuXHRcdGRpYWxvZ1Nob3dPbmVCdXR0b246IGZhbHNlLFxuXHRcdGJ1dHRvbnM6IFt7dGV4dDogJ+eojeWQjueZu+W9lSd9LCB7dGV4dDogJ+ehruWumid9XSxcblx0XHRvbmVCdXR0b246IFt7dGV4dDogJ+ehruWumid9XSxcblx0XHRvcmRlclRlYWNoZXJMaXN0OltdLFxuXHR9XG5cblx0bWV0aG9kcz17XG5cdFx0b25DbGlja0V4aXRMb2dpbigpe1xuXHRcdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0XHR3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6YCA5Ye655m75b2VJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB6YCA5Ye655m75b2V5ZCX77yfJyxcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblx0XHRcdFx0XHRpZiAocmVzLmNvbmZpcm0pIHtcblx0XHRcdFx0XHRcdC8vIOa4hemZpHNlc3Npb27nvJPlrZhcblx0XHRcdFx0XHRcdHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcblx0XHRcdFx0XHRcdHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uRGF0ZVwiKVxuXHRcdFx0XHRcdFx0d2VweS5yZW1vdmVTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJyZW1vdmUgc2Vzc2lvbiFcIilcblx0XHRcdFx0XHRcdHdlcHkuJGluc3RhbmNlLm9uTGF1bmNoKClcblx0XHRcdFx0XHRcdHNlbGYub25TaG93KClcblx0XHRcdFx0XHRcdHNlbGYuJGFwcGx5KClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgb25DbGljayhlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDplLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cblx0XHRvbkNsaWNrTG9naW4oKSB7XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXNcblx0XHRcdGlmKHNlbGYudXNlckluZm89PW51bGwpe1xuXHRcdFx0XHR0aGlzLiRuYXZpZ2F0ZSh7dXJsOlwibG9naW5cIn0pXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9uQ2xpY2tPcmRlcihlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGxldCBvcmRlcklkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDpcIm9yZGVyL29yZGVyLWRldGFpbD9vdGlkPVwiK3NlbGYub3JkZXJUZWFjaGVyTGlzdFtvcmRlcklkXS5PVGlkLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuXG5cdFx0dGFwRGlhbG9nT25lQnV0dG9uKGUpIHtcblx0XHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdFx0dGhpcy4kbmF2aWdhdGUoe3VybDpcImxvZ2luXCJ9KVxuXHRcdFx0c2VsZi5kaWFsb2dTaG93T25lQnV0dG9uID0gZmFsc2Vcblx0XHR9LFxuXG5cdFx0dGFwRGlhbG9nQnV0dG9uKGUpIHtcblx0XHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdFx0aWYgKGUuZGV0YWlsLmluZGV4ID09IDEpIHtcblx0XHRcdHRoaXMuJG5hdmlnYXRlKHt1cmw6XCJsb2dpblwifSlcblx0XHRcdH1cblx0XHRcdHNlbGYuZGlhbG9nU2hvdyA9IGZhbHNlXG5cdFx0fSxcbiAgICB9XG5cblx0Z2V0T3JkZXJUZWFjaGVyRGF0YSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIFxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2FkbWluL2dldF9vcmRlcl90ZWFjaGVyX2xpc3QnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vcmRlclRlYWNoZXJMaXN0ID0gcmVzLmRhdGEuRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cblx0b25Mb2FkKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICBcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYod2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VySW5mbyE9bnVsbCl7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJJbmZvXG5cdFx0Ly8gc2VsZi5nZXRPcmRlclRlYWNoZXJEYXRhKClcbiAgICAgIH1lbHNle1xuICAgICAgICBzZWxmLnVzZXJJbmZvPW51bGxcbiAgICAgIH1cbiAgICAgIGlmKHNlbGYudXNlckluZm89PW51bGwgJiYgIXNlbGYuZGlhbG9nU2hvd09uZUJ1dHRvbil7XG4gICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IHRydWVcbiAgICAgIH1cblxuXG4gICAgfVxufVxuIl19