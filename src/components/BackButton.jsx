import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({
    label = "",
    to = null, 
    onClick = null,
    className = "",
    iconSize = 20
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };
    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium ${className}`}
        >
            {label ? (
                <>
                    <ArrowLeft size={iconSize} />
                    <span>{label}</span>
                </>
            ) : (
                <ArrowLeft size={iconSize} />
            )
            }
        </button>
    );
};

export default BackButton;
