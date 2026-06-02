const DashboardCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      className={`${color} text-white p-6 rounded-xl shadow`}
    >
      <h2 className="text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;