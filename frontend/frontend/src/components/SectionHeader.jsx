export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}) {
  return (
    <div
      className={`text-${align} mb-12 ${
        align === "center" ? "max-w-2xl mx-auto" : ""
      }`}
    >
      {label && (
        <p className="text-orange-500 font-semibold mb-2 tracking-wide uppercase">
          {label}
        </p>
      )}

      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
