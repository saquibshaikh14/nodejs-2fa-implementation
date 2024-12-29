interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isLoading: boolean;
    textLoading?: string | null;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, textLoading, isLoading = false, onClick, ...rest }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            {...rest}
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    {textLoading}
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default ActionButton;