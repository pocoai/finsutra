import { toast } from 'react-hot-toast';

import { APIURL } from '@/config';

export const getDoc = async (indexName) => {
  try {
    let res = await fetch(
      `${APIURL}/list-documents?account_id=${process.env.NEXT_PUBLIC_ACCOUNTID}&index_name=${indexName}`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_APITOKEN,
        },
      },
    );
    res = await res.json();
    return res;
  } catch (error) {
    toast.error('Internal Server Error');
    return error;
  }
};

export const getFileChat = async (x, y) => {
  try {
    let res = await fetch(`https://favcynavigator.pocoai.repl.co/filechat?x=${x}&y=${y}`, {
      method: 'GET',
      // headers: {
      //   Authorization: process.env.NEXT_PUBLIC_APITOKEN,
      // },
    });
    res = await res.json();
    return res;
  } catch (error) {
    toast.error('Internal Server Error');
    return error;
  }
};

export const getResponse = async (indexName, inputSequence) => {
  try {
    let res = await fetch(
      `${APIURL}/ask?account_id=${process.env.NEXT_PUBLIC_ACCOUNTID}&index_name=${indexName}&input_sequence=${inputSequence}`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_APITOKEN,
        },
      },
    );
    res = await res.json();
    return res;
  } catch (error) {
    toast.error('Internal Server Error');
    return error;
  }
};

export const uploadPDFClient = async (formData) => {
  try {
    let res = await fetch(`${APIURL}/create`, {
      method: 'POST',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_APITOKEN,
      },
      body: formData,
    });
    res = await res.json();
    return res;
  } catch (error) {
    toast.error('Internal Server Error');
    return error;
  }
};
