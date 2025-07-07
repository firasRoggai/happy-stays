const Modal = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <div className="rounded fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
            <div className="flex items-center justify center h-[50vh] w-[50vh] bg-white rounded">
                {children}
            </div>
        </div>
    );
}

export default Modal;