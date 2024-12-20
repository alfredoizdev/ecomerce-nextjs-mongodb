import { useState, useEffect } from "react";
import { Input } from "../ui/input";

type Props = {
  colors?: string[];
  onChange: (color: string[]) => void;
  formValueColors: string; // Cadena que proviene del formulario
};

const ColorSelector = ({ colors = [], onChange, formValueColors }: Props) => {
  const [localSizes, setLocalSizes] = useState<string[]>(colors);

  // Sincronizar `localSizes` con `formValueColors`
  useEffect(() => {
    const parsedSizes = formValueColors ? formValueColors.split(",") : [];
    setLocalSizes(parsedSizes);
  }, [formValueColors]);

  const handleAddSize = (size: string) => {
    if (!localSizes.includes(size)) {
      const updatedSizes = [...localSizes, size];
      setLocalSizes(updatedSizes);
      onChange(updatedSizes); // Notifica al padre
    }
  };

  const handleRemoveSize = (size: string) => {
    const updatedSizes = localSizes.filter((s) => s !== size);
    setLocalSizes(updatedSizes);
    onChange(updatedSizes); // Notifica al padre
  };

  return (
    <>
      {/* Input para ingresar tallas */}
      <div>
        <Input
          placeholder="Enter color and press Enter"
          name="size"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const size = e.currentTarget.value.trim();
              e.currentTarget.value = "";
              if (size) handleAddSize(size);
            }
          }}
        />
      </div>

      {/* Lista de tallas seleccionadas */}
      <div className="flex flex-wrap gap-2 mt-4">
        {localSizes.map((size) => (
          <div
            key={size}
            className="flex items-center px-3 py-1 bg-gray-100 border border-gray-300 rounded-full"
          >
            {size}
            <button
              type="button"
              onClick={() => handleRemoveSize(size)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Input oculto para enviar las tallas como un string separado por comas */}
      <input
        type="hidden"
        name="colors"
        value={localSizes.join(",")} // Convierte las tallas a una cadena separada por comas
      />
    </>
  );
};

export default ColorSelector;
