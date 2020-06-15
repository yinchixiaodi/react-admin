import React from "react";
import { Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";

import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";

import history from "@utils/history";

//
// import zh from "react-intl/locale-data/zh";
// import en from "react-intl/locale-data/en";
//

import Layout from "./layouts";
import { zh, en } from "./locales";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

//
// let messages = {};
// messages["zh"] = zh;
// messages["en"] = en;
//

function App({ language }) {
  const messages = language === "en" ? en : zh; // 加载要使用的语音包
  const locale = language === "en" ? enUS : zhCN; // 加载要使用的语音包

  return (
    <Router history={history}>
      <ConfigProvider locale={locale}>
        <IntlProvider locale={language} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect((state) => ({ language: state.language }))(App);
