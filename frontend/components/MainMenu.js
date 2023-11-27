import React from 'react';
import Link from 'next/link';
import { FaHome, FaUpload, FaDownload, FaPaperPlane } from 'react-icons/fa';

const MainMenu = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            {children}
            <nav className="fixed bottom-0 w-full bg-primary-50 p-2 flex justify-around border-t-2 border-gray-200">
                <Link href="/">
                    <div className="flex flex-col items-center p-2">
                        <FaHome className="h-6 w-6 text-white" />
                        <span className="text-xs text-white">Home</span>
                    </div>
                </Link>
                <Link href="/withdraw">
                    <div className="flex flex-col items-center p-2">
                        <FaUpload className="h-6 w-6 text-white" />
                        <span className="text-xs text-white">Withdraw</span>
                    </div>
                </Link>
                <Link href="/deposit">
                    <div className="flex flex-col items-center p-2">
                        <FaDownload className="h-6 w-6 text-white" />
                        <span className="text-xs text-white">Deposit</span>
                    </div>
                </Link>
                <Link href="/send">
                    <div className="flex flex-col items-center p-2">
                        <FaPaperPlane className="h-6 w-6 text-white" />
                        <span className="text-xs text-white">Send</span>
                    </div>
                </Link>
            </nav>
        </div>
    );
};

export default MainMenu;
