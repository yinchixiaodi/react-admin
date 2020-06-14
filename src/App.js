import React from "react";
import { Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
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

function App() {
  const local = "zh"; // 当前使用的语言环境
  const messages = local === "en" ? en : zh; // 加载要使用的语音包

  return (
    <Router history={history}>
      <IntlProvider local={local} messages={messages}>
        <Layout />
      </IntlProvider>
    </Router>
  );
}

export default App;
