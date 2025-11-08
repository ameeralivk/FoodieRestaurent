interface TextProp {
  Text?: string;
}

const ErrorPTag: React.FC<TextProp> = ({ Text }) => {
  return <p className="text-red-600 mt-2">{Text}</p>;
};

export default ErrorPTag