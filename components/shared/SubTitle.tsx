import { THEME_DEFAULT } from "@/constants/theme";

type Props = {
  text: string;
  textColor?: string;
};

const SubTitle = ({ text, textColor }: Props) => {
  return (
    <div className="w-full">
      <p
        className="font-normal"
        style={{ color: `${textColor || THEME_DEFAULT.text}` }}
      >
        {text}
      </p>
    </div>
  );
};

export default SubTitle;
