'use client'

import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '@/utils';
import Loader from './Loader';

const InputFields = ({
  searchQuery, fetchResponse, fileName, searchLoader, textRef,
}) => (
  <div className="relative w-full">
    <div className="absolute top-1/2 left-3  -translate-y-1/2">
      <img
        src={searchQuery.length === 0 ? '/icons/search.png' : '/icons/searchactive.png'}
        alt=""
        className="h-5 w-5 transition-all duration-150"
      />
    </div>
    <input
      onKeyDown={(e) => {
        if (e.key === 'Enter') fetchResponse();
      }}
      id="search"
      ref={textRef}
      type="text"
      className="h-14 w-full pl-10 pr-20 rounded-lg border z-0 focus:shadow focus:outline-none"
      placeholder="Search anything..."
    />
    <div className="absolute top-2 right-2">
      <button
        type="button"
        onClick={() => fetchResponse()}
        disabled={fileName === null}
        className="h-10 w-20 text-white rounded-lg bg-red-400 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-all duration-150"
      >
        {searchLoader ? <Loader size={20} /> : 'Search'}
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
  searchQuery: '',
  fetchResponse: noop,
  fileName: '',
  searchLoader: false,
  textRef: {},
};

export default InputFields;
