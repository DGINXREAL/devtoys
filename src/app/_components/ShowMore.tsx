import React, { useState } from "react";

const ShowMore = ({ children, maxLines = 5 }: {children: React.ReactNode; maxLines?: number}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="relative">
            <div
                className={`overflow-hidden ${
                    !isExpanded ? `line-clamp-${maxLines}` : ""
                }`}
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: !isExpanded ? maxLines : "unset",
                    overflow: !isExpanded ? "hidden" : "visible",
                }}
            >
                {children}
            </div>
            {!isExpanded && (
                <div
                    className="absolute bottom-0 z-20 left-0 w-full bg-gradient-to-t bg-opacity-80 backdrop-blur-sm from-black/90 to-transparent h-14 flex justify-center">
                    <button
                        onClick={handleToggle}
                        className="mt-2 z-10 px-4 py-2 text-buttercup-400 hover:underline"
                    >
                        Show More
                    </button>
                </div>
            )}

            {isExpanded && (
                <button
                    onClick={handleToggle}
                    className="mt-2 z-10 px-4 py-2 text-buttercup-400 hover:underline w-full text-center"
                >
                    Show Less
                </button>
            )}

        </div>
    );
};

export default ShowMore;
