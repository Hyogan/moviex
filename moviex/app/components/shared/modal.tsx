import React, { ReactNode } from 'react'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-40">
            <div className="p-8 w-full max-w-lg bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-lg transition-transform transform scale-95 hover:scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-lg font-bold text-gray-600 hover:text-gray-800"
                >
                    ×
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal