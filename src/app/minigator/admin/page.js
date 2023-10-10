'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import classnames from 'classnames';

import Loader from '@/components/minigator/Loader'
import { getLinks } from '@/firebase/apiRequests';

const Admin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [linkDocs, setLinkDocs] = useState([]);

  const init = async () => {
    setIsLoading(true);
    const links = await getLinks();
    setLinkDocs(links);
    setIsLoading(false);
  };

  useEffect(() => {
    const pass = prompt('Password:');
    if (pass !== 'admin123') {
      router.push('/');
      return;
    }
    setIsAdmin(true);
    init();
  }, []);

  if (!isAdmin) return <div />;

  if (isLoading) {
    return (
      <div className="fixed inset-2/4">
        <Loader size={40} />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Index Name
            </th>
            <th scope="col" className="px-6 py-3">
              File Name
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {linkDocs.map((item, i) => (
            <tr
              key={item.indexName}
              className={classnames('border-b dark:border-gray-700', {
                'bg-white dark:bg-gray-900': i % 2 === 0,
                'bg-gray-50 dark:bg-gray-800': i % 2 !== 0,
              })}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <Link href={`${window.location.origin}/chat/${item.indexName}`}>
                  {`${window.location.origin}/chat/${item.indexName}`}
                </Link>
              </th>
              <td className="px-6 py-4">{item.fileName}</td>
              <td className="px-6 py-4">{item.created.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
