interface YouTubeModalProps {
    videoDate: any;
    isOpen: boolean;
    onClose: () => void;
}

const YouTubeModal = ({ videoDate, isOpen, onClose }: YouTubeModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative bg-grey max-w-4xl w-full h-[500px]">
                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-[-30px] right-0 text-xl opacity-50 hover:opacity-100 transition"
                >
                    CLOSE
                </button>

                {/* IFRAME CONTAINER */}
                <div className="h-full w-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoDate.key}`}
                        title={videoDate.name}
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default YouTubeModal;
