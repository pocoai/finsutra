import React from 'react';

const PdfViewModal = ({ open, onClose, children, title }) => {
    return (
        <div className=' inset-0 bg-opacity-30 bg-black backdrop:blur-sm flex justify-center items-center fixed z-50 h-[100vh] w-[100vw]'>
            <div className='p-2'>
                {children}
            </div>
        </div>
    )
  };
  
  export default PdfViewModal;
