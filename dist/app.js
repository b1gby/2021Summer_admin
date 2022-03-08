'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/login', 'pages/student/student', 'pages/student/create-student', 'pages/student/student-detail', 'pages/teacher/teacher', 'pages/teacher/create-teacher', 'pages/teacher/teacher-detail', 'pages/campus/campus', 'pages/order/order-detail', 'pages/admin/admin', 'pages/admin/admin-detail', 'pages/admin/create-admin'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      useExtendedLib: {
        weui: true
      },
      usingComponents: {
        "cu-custom": "/colorui/components/cu-custom"
      }
    };
    _this.globalData = {
      userInfo: null,
      serverUrl: "https://www.kaigestudy.top:8080"
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var self = this;
      //检查sessionid是否过期
      self.onCheckSessionTimeout();

      if (_wepy2.default.getStorageSync("sessionUserInfo")) {
        this.globalData.userInfo = _wepy2.default.getStorageSync("sessionUserInfo");
      } else {
        this.globalData.userInfo = null;
      }
    }

    //检查sessionid是否过期的方法

  }, {
    key: 'onCheckSessionTimeout',
    value: function onCheckSessionTimeout() {
      var self = this;
      console.log("checking session");
      var SESSION_TIMEOUT = 3 * 60 * 60 * 1000; //登陆状态有效时间为3小时
      var sessionToken = _wepy2.default.getStorageSync("sessionToken");
      var sessionTime = _wepy2.default.getStorageSync("sessionDate");

      if (sessionToken == null || sessionToken == undefined || sessionToken == "" || sessionTime == null || sessionTime == undefined || sessionTime == "") {
        console.log("session is empty");
        return;
      }

      var aftertimestamp = Date.parse(new Date());
      if (aftertimestamp - sessionTime >= SESSION_TIMEOUT) {
        // 过期后清除session缓存
        _wepy2.default.removeStorageSync("sessionToken");
        _wepy2.default.removeStorageSync("sessionDate");
        _wepy2.default.removeStorageSync("sessionUserInfo");
        console.log("remove session!");
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }

    // 设置带有cookie的request header，每次request都带这个header

  }, {
    key: 'setHeader',
    value: function setHeader() {
      var self = this;
      var header = {
        'Content-type': 'application/json; charset=utf-8',
        'TTToken': _wepy2.default.getStorageSync("sessionToken") //读取本地保存好的上一次cookie
      };
      return header;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2VFeHRlbmRlZExpYiIsIndldWkiLCJ1c2luZ0NvbXBvbmVudHMiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXJ2ZXJVcmwiLCJ1c2UiLCJzZWxmIiwib25DaGVja1Nlc3Npb25UaW1lb3V0Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsIlNFU1NJT05fVElNRU9VVCIsInNlc3Npb25Ub2tlbiIsInNlc3Npb25UaW1lIiwidW5kZWZpbmVkIiwiYWZ0ZXJ0aW1lc3RhbXAiLCJEYXRlIiwicGFyc2UiLCJyZW1vdmVTdG9yYWdlU3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJoZWFkZXIiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUF1Q0Usc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQW5DZkEsTUFtQ2UsR0FuQ047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxhQUZLLEVBR0wsdUJBSEssRUFJTCw4QkFKSyxFQUtMLDhCQUxLLEVBTUwsdUJBTkssRUFPTCw4QkFQSyxFQVFMLDhCQVJLLEVBU0wscUJBVEssRUFVTCwwQkFWSyxFQVdMLG1CQVhLLEVBWUwsMEJBWkssRUFhTCwwQkFiSyxDQURBO0FBZ0JQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BaEJEO0FBc0JQQyxzQkFBZ0I7QUFDZEMsY0FBTTtBQURRLE9BdEJUO0FBeUJQQyx1QkFBZ0I7QUFDZCxxQkFBYTtBQURDO0FBekJULEtBbUNNO0FBQUEsVUFMZkMsVUFLZSxHQUxGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVc7QUFGQSxLQUtFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRmE7QUFHZDs7OzsrQkFFVTtBQUNULFVBQUlDLE9BQU8sSUFBWDtBQUNBO0FBQ0FBLFdBQUtDLHFCQUFMOztBQUVBLFVBQUdDLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQUgsRUFBMEM7QUFDeEMsYUFBS1AsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJLLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQTNCO0FBQ0QsT0FGRCxNQUVLO0FBQ0gsYUFBS1AsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0I7QUFDRDtBQUVGOztBQUdEOzs7OzRDQUN3QjtBQUN0QixVQUFJRyxPQUFPLElBQVg7QUFDQUksY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsVUFBTUMsa0JBQWtCLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxJQUF0QyxDQUhzQixDQUdxQjtBQUMzQyxVQUFJQyxlQUFlTCxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLENBQW5CO0FBQ0EsVUFBSUssY0FBY04sZUFBS0MsY0FBTCxDQUFvQixhQUFwQixDQUFsQjs7QUFFQSxVQUFJSSxnQkFBZ0IsSUFBaEIsSUFBd0JBLGdCQUFnQkUsU0FBeEMsSUFBcURGLGdCQUFnQixFQUFyRSxJQUF5RUMsZUFBZSxJQUF4RixJQUFnR0EsZUFBZUMsU0FBL0csSUFBNEhELGVBQWUsRUFBL0ksRUFBbUo7QUFDakpKLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNEOztBQUVELFVBQUlLLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXLElBQUlELElBQUosRUFBWCxDQUFyQjtBQUNBLFVBQUlELGlCQUFpQkYsV0FBakIsSUFBZ0NGLGVBQXBDLEVBQXFEO0FBQ25EO0FBQ0FKLHVCQUFLVyxpQkFBTCxDQUF1QixjQUF2QjtBQUNBWCx1QkFBS1csaUJBQUwsQ0FBdUIsYUFBdkI7QUFDQVgsdUJBQUtXLGlCQUFMLENBQXVCLGlCQUF2QjtBQUNBVCxnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0Q7QUFDRjs7OzBCQUVNUyxDLEVBQUc7QUFDUixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOztBQUVEOzs7O2dDQUNZO0FBQ1YsVUFBSWQsT0FBTyxJQUFYO0FBQ0EsVUFBSW1CLFNBQVM7QUFDWCx3QkFBZ0IsaUNBREw7QUFFWCxtQkFBV2pCLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsQ0FGQSxDQUVvQztBQUZwQyxPQUFiO0FBSUEsYUFBT2dCLE1BQVA7QUFDRDs7OztFQTlGMEJqQixlQUFLa0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvc3R1ZGVudC9zdHVkZW50JyxcbiAgICAgICdwYWdlcy9zdHVkZW50L2NyZWF0ZS1zdHVkZW50JyxcbiAgICAgICdwYWdlcy9zdHVkZW50L3N0dWRlbnQtZGV0YWlsJyxcbiAgICAgICdwYWdlcy90ZWFjaGVyL3RlYWNoZXInLFxuICAgICAgJ3BhZ2VzL3RlYWNoZXIvY3JlYXRlLXRlYWNoZXInLFxuICAgICAgJ3BhZ2VzL3RlYWNoZXIvdGVhY2hlci1kZXRhaWwnLFxuICAgICAgJ3BhZ2VzL2NhbXB1cy9jYW1wdXMnLFxuICAgICAgJ3BhZ2VzL29yZGVyL29yZGVyLWRldGFpbCcsXG4gICAgICAncGFnZXMvYWRtaW4vYWRtaW4nLFxuICAgICAgJ3BhZ2VzL2FkbWluL2FkbWluLWRldGFpbCcsXG4gICAgICAncGFnZXMvYWRtaW4vY3JlYXRlLWFkbWluJyxcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdXNlRXh0ZW5kZWRMaWI6IHtcbiAgICAgIHdldWk6IHRydWVcbiAgICB9LFxuICAgIHVzaW5nQ29tcG9uZW50czp7XG4gICAgICBcImN1LWN1c3RvbVwiOiBcIi9jb2xvcnVpL2NvbXBvbmVudHMvY3UtY3VzdG9tXCIsXG4gICAgfSxcbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgc2VydmVyVXJsOiBcImh0dHBzOi8vd3d3LmthaWdlc3R1ZHkudG9wOjgwODBcIixcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgLy/mo4Dmn6VzZXNzaW9uaWTmmK/lkKbov4fmnJ9cbiAgICBzZWxmLm9uQ2hlY2tTZXNzaW9uVGltZW91dCgpXG5cbiAgICBpZih3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblVzZXJJbmZvXCIpKXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVXNlckluZm9cIilcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IG51bGxcbiAgICB9XG4gICAgXG4gIH1cblxuXG4gIC8v5qOA5p+lc2Vzc2lvbmlk5piv5ZCm6L+H5pyf55qE5pa55rOVXG4gIG9uQ2hlY2tTZXNzaW9uVGltZW91dCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIHNlc3Npb25cIilcbiAgICBjb25zdCBTRVNTSU9OX1RJTUVPVVQgPSAzICogNjAgKiA2MCAqIDEwMDAgLy/nmbvpmYbnirbmgIHmnInmlYjml7bpl7TkuLoz5bCP5pe2XG4gICAgbGV0IHNlc3Npb25Ub2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcbiAgICBsZXQgc2Vzc2lvblRpbWUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvbkRhdGVcIilcblxuICAgIGlmIChzZXNzaW9uVG9rZW4gPT0gbnVsbCB8fCBzZXNzaW9uVG9rZW4gPT0gdW5kZWZpbmVkIHx8IHNlc3Npb25Ub2tlbiA9PSBcIlwifHxzZXNzaW9uVGltZSA9PSBudWxsIHx8IHNlc3Npb25UaW1lID09IHVuZGVmaW5lZCB8fCBzZXNzaW9uVGltZSA9PSBcIlwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNlc3Npb24gaXMgZW1wdHlcIilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhZnRlcnRpbWVzdGFtcCA9IERhdGUucGFyc2UobmV3IERhdGUoKSlcbiAgICBpZiAoYWZ0ZXJ0aW1lc3RhbXAgLSBzZXNzaW9uVGltZSA+PSBTRVNTSU9OX1RJTUVPVVQpIHtcbiAgICAgIC8vIOi/h+acn+WQjua4hemZpHNlc3Npb27nvJPlrZhcbiAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcbiAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uRGF0ZVwiKVxuICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiKVxuICAgICAgY29uc29sZS5sb2coXCJyZW1vdmUgc2Vzc2lvbiFcIilcbiAgICB9XG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgLy8g6K6+572u5bim5pyJY29va2ll55qEcmVxdWVzdCBoZWFkZXLvvIzmr4/mrKFyZXF1ZXN06YO95bim6L+Z5LiqaGVhZGVyXG4gIHNldEhlYWRlcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBsZXQgaGVhZGVyID0ge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICdUVFRva2VuJzogd2VweS5nZXRTdG9yYWdlU3luYyhcInNlc3Npb25Ub2tlblwiKSAvL+ivu+WPluacrOWcsOS/neWtmOWlveeahOS4iuS4gOasoWNvb2tpZVxuICAgIH07XG4gICAgcmV0dXJuIGhlYWRlclxuICB9XG59XG4iXX0=