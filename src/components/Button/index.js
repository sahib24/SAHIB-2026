"use client";

export default function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  className = "",
}) {
  const baseStyle =
    "font-medium rounded transition duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        cursor-pointer
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
