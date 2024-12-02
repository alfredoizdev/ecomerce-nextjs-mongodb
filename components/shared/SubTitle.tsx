type Props = {
  text: string;
};

const SubTitle = ({ text }: Props) => {
  return (
    <div className="w-full">
      <p className="text-gray-600 font-normal">{text}</p>
    </div>
  );
};

export default SubTitle;
