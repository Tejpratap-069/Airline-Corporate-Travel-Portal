import { Bell } from "lucide-react";

const NotificationBell = ({
  count = 0,
}) => {
  return (
    <div className="relative">

      <Bell size={24} />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}

    </div>
  );
};

export default NotificationBell;