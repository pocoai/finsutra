'use client'

import React, { useState } from 'react';

import UploadAndChat from '@/components/minigator/UploadAndChat';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import MinigatorHeader from '@/components/minigator/MinigatorHeader';
const IndexName = () => {
    const pathname = usePathname()
    const parts = pathname.split('/');
    const indexnameQuery = parts[parts.length - 1];

    // const indexnameQuery = router.query.indexname
    const [ fileName, setFileName ] = useState('')
    return (
        <div className="flex flex-col items-start justify-start gap-10 space-y-4">
        <MinigatorHeader name = {fileName}/> 
        <UploadAndChat setFileName = {setFileName} indexnameQuery={indexnameQuery}/>
      </div>
        
    )
}

export default IndexName;
