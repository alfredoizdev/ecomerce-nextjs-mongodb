import { GithubPicker } from "react-color";
import { useState } from "react";
import { COLOR_PICKER } from "@/constants/theme";

type ColorPickerProps = {
  color: string;
  onChange: (newColor: string) => void;
};

export default function ColorPickerField({
  color,
  onChange,
}: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      {/* Botón para abrir el color picker */}
      <div
        className="w-10 h-10 border rounded-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      ></div>

      {/* Color Picker */}
      {showPicker && (
        <div
          className="absolute z-10 mt-2"
          style={{ left: "50px", top: "-50px" }}
        >
          <div
            className="fixed inset-0 bg-black opacity-0"
            onClick={() => setShowPicker(false)}
          ></div>
          <GithubPicker
            triangle="hide"
            color={color}
            colors={COLOR_PICKER}
            onChangeComplete={(newColor) => onChange(newColor.hex)}
          />
        </div>
      )}
    </div>
  );
}
