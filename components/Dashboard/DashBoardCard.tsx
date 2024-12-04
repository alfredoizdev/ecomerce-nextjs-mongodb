import React from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: React.ReactNode; // Para incluir un icono si es necesario
  bgColor?: string; // Color de fondo opcional
}

const DashboardCard = ({ title, value, icon, bgColor = "bg-white" }: Props) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md flex items-center justify-between ${bgColor}`}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-5xl font-bold text-gray-900">{value}</p>
      </div>
      {icon && <div className="text-gray-500">{icon}</div>}
    </div>
  );
};

export default DashboardCard;
