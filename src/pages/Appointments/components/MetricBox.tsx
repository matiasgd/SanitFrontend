interface MetricBoxProps {
  title: string;
  metric: number;
  currency?: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({ title, metric, currency }) => {
  return (
    <div className="bg-white shadow-md shadow-gray-400 p-2 flex flex-col rounded-lg text-center min-w-[175px]">
      <h2 className="text-gray-500 font-semibold">{title}</h2>
      <p className="font-bold text-3xl">{`${currency} ${metric}`}</p>
    </div>
  );
};

export default MetricBox;
