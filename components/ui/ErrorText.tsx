type Props = {
  message: string;
};

const ErrorText = ({ message }: Props) => {
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

export default ErrorText;
