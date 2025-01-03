"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SHA = _interopRequireDefault(require("../src/utils/SHA256"));
var _getDueDateAndTime = _interopRequireDefault(require("../src/utils/getDueDateAndTime"));
var _makeTimeStamp = _interopRequireDefault(require("../src/utils/makeTimeStamp"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const testURL = "https://stgstdpay.inicis.com/stdjs/INIStdPay.js";
const releaseURL = "https://stdpay.inicis.com/stdjs/INIStdPay.js";

// PC 결제수단 반환
const payServerText = index => {
  if (index === 0) {
    return "Card"; // 카드
  } else if (index === 1) {
    return "VBank"; // 무통장
  } else if (index === 2) {
    return "HPP"; // 핸드폰
  } else if (index === 3) {
    return "DirectBank"; // 계좌이체
  }
};

// Mobile 결제수단 반환
const payServerTextMb = index => {
  if (index === 0) {
    return "CARD"; // 카드
  } else if (index === 1) {
    return "VBANK"; // 무통장
  } else if (index === 2) {
    return "MOBILE"; // 핸드폰
  } else if (index === 3) {
    return "BANK"; // 계좌이체
  }
};
const ReactInicis = _ref => {
  let {
    payData,
    isPurchase,
    isTest
  } = _ref;
  const mobilePurchaseRef = (0, _react.useRef)();
  const [timestamp, setTimestamp] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    if (!isPurchase) {
      return;
    }
    onClickPurchase();
  }, [isPurchase]);
  (0, _react.useEffect)(() => {
    if (timestamp === 0) {
      return;
    }
    if (window.innerWidth > 1024) {
      const script = document.createElement("script");
      script.src = isTest ? testURL : releaseURL;
      document.head.appendChild(script);
      script.onload = () => {
        window.INIStdPay.pay("SendPayForm_id");
      };
    } else {
      // MOBILE
      mobilePurchaseRef.current.action = "https://mobile.inicis.com/smart/payment/";
      mobilePurchaseRef.current.target = "_self";
      mobilePurchaseRef.current.submit();
    }
    return () => {
      if (window.innerWidth > 1024) {
        const script = document.querySelector("script[src*='INIStdPay.js']");
        if (script) {
          script.remove();
        }
      }
    };
  }, [timestamp]);

  // 구매하기 버튼 클릭
  const onClickPurchase = () => {
    const _timeStamp = (0, _makeTimeStamp.default)();
    setTimestamp(_timeStamp);
  };
  const {
    P_VBANK_TM,
    P_VBANK_DT
  } = (0, _getDueDateAndTime.default)(payData.depositDueDate);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("form", {
    id: "SendPayForm_id",
    name: "",
    method: "Post"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "version",
    value: "1.0"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "gopaymethod",
    value: payServerText(payData.payStatus)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "mid",
    value: isTest ? "INIpayTest" : payData.mid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "oid",
    value: payData.oid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "price",
    value: payData.productPrice
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "timestamp",
    value: timestamp
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "use_chkfake",
    value: "Y"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "signature",
    value: (0, _SHA.default)(`oid=${payData.oid}&price=${payData.productPrice}&timestamp=${timestamp}`)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "verification",
    value: (0, _SHA.default)(`oid=${payData.oid}&price=${payData.productPrice}&signKey=${payData.mKey}&timestamp=${timestamp}`)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "mKey",
    value: isTest ? "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33" : (0, _SHA.default)(payData.mKey)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "currency",
    value: "WON"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "goodname",
    value: payData.productName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyername",
    value: payData.buyerName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyertel",
    value: payData.buyerTel
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "buyeremail",
    value: payData.buyerEmail
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "returnUrl",
    value: payData.returnUrl
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "closeUrl",
    value: payData.closeUrl
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    readOnly: true,
    name: "acceptmethod",
    value: `centerCd(Y):SKIN(${payData.payPopupSkin || "#C1272C"}):vbank(${P_VBANK_DT}${P_VBANK_TM})`
  })), /*#__PURE__*/_react.default.createElement("form", {
    name: "mobileweb",
    method: "post",
    acceptCharset: "euc-kr",
    ref: mobilePurchaseRef
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_INI_PAYMENT",
    value: payServerTextMb(payData.payStatus)
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_MID",
    value: isTest ? "INIpayTest" : payData.mid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_OID",
    value: payData.oid
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_AMT",
    value: payData.productPrice
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_GOODS",
    value: payData.productName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_UNAME",
    value: payData.buyerName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_NEXT_URL",
    value: payData.returnUrl
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_RESERVED",
    value: "centerCd=Y"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_EMAIL",
    value: payData.buyerEmail
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_NOTI",
    value: payData.mobileCustomData || ""
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_NOTI_URL",
    value: payData.notiURL || ""
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_CHARSET",
    value: "utf8"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_VBANK_DT",
    value: P_VBANK_DT
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    readOnly: true,
    name: "P_VBANK_TM",
    value: P_VBANK_TM
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClickPurchase
  }, "\uAD6C\uB9E4\uD558\uAE30 \uBC84\uD2BC"));
};
var _default = exports.default = ReactInicis;