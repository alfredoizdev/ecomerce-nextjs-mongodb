type Prop = {
  text: string;
};

const NotFoundText = ({ text }: Prop) => {
  return (
    <div className="flex flex-wrap justify-center">
      <p className="text-2xl text-gray-500 mt-10">{text}</p>
    </div>
  );
};

export default NotFoundText;
