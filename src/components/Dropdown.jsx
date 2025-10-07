import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const Dropdown = ({
    options = [],
    value,
    onChange,
    label,
    placeholder = "Select an option",
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Pass only value (never label/object) to onChange for universal usage
    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={`space-y-2 ${className}`} ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-400 transition-all duration-200"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className={`block truncate ${selectedOption ? "text-gray-900" : "text-gray-500"}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                        {options.map((opt, idx) => (
                            <div
                                key={opt.value}
                                role="option"
                                aria-selected={value === opt.value}
                                tabIndex={0}
                                className={`relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors duration-150
                                ${value === opt.value
                                        ? "bg-blue-50 text-blue-900"
                                        : "text-gray-900 hover:bg-blue-50 hover:text-blue-900"
                                    }`}
                                onClick={() => handleSelect(opt)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleSelect(opt);
                                    }
                                }}
                            >
                                <span className="block truncate font-normal">{opt.label}</span>
                                {value === opt.value && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <Check className="h-4 w-4" />
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
