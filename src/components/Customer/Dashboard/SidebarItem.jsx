export default function SidebarItem({ icon, text, isExpanded, isActive, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full p-3 mb-2 rounded-md transition-colors
        ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
      `}
    >
      <span className="mr-3">{icon}</span>
      {isExpanded && (
        <div className="flex flex-1 items-center justify-between">
          <span>{text}</span>
          {badge && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
      {!isExpanded && badge && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}