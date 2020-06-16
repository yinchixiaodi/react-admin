import React from "react";
import Visits from "./components/Visits";
import Sales from "./components/Sales";
import Search from "./components/Search";
import SearchRight from "./components/SearchRight";
import Static from "./components/Static";

import "./index.less";
export default function Admin() {
  return (
    <div>
      <Visits />
      <Sales />
      <div className="search-warp">
        <Search />
        <SearchRight />
      </div>
      <Static />
    </div>
  );
}
