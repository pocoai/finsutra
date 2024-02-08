import React from "react";
import PropTypes from "prop-types";

import { noop } from "@/utils";
import Loader from "./Loader";

const InputFields = ({ searchQuery, setSearchQuery, handleClick, fileName, searchLoader }) => (
  <div className="flex items-center justify-around w-full ">
    <div className=" w-full gap-2 mx-3 flex items-center justify-start rounded-md focus:shadow ">
      <img
        src={searchQuery.length === 0 ? "/icons/search.png" : "/icons/searchactive.png"}
        alt=""
        className="h-5 w-5 transition-all duration-150"
      />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick(e.target.value);
        }}
        id="search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        disabled={!fileName || searchLoader}
        autoComplete="off"
        type="text"
        className="h-14 w-full rounded-lg border-none z-0 focus:outline-none"
        placeholder="Search anything..."
      />
    </div>

    <div className="">
      <button
        type="button"
        onClick={() => handleClick(searchQuery)}
        disabled={!fileName}
        className="h-10 w-20 mr-4 disabled:text-white hover:text-white rounded-lg bg-brandlight border-brand text-brand hover:bg-brand disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-all duration-150"
      >
        {searchLoader ? <Loader size={20} /> : "Search"}
      </button>
    </div>
  </div>
);

InputFields.propTypes = {
  searchQuery: PropTypes.string,
  fetchResponse: PropTypes.func,
  fileName: PropTypes.string,
  searchLoader: PropTypes.bool,
  textRef: PropTypes.instanceOf(Object),
};

InputFields.defaultProps = {
  searchQuery: "",
  fetchResponse: noop,
  fileName: "",
  searchLoader: false,
  textRef: {},
};

export default InputFields;
