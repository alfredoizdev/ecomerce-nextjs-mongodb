type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
};

const CountDown = ({ countdown }: Props) => {
  return (
    <div className="w-full">
      <h2>Deal Ends</h2>
      {countdown && (
        <div className="mt-4 flex flex-row justify-between items-center text-lg font-semibold ">
          <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
            {countdown.days}d
          </div>
          <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
            {countdown.hours}h
          </div>
          <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
            {countdown.minutes}m
          </div>
          <div className="p-3 border-2 rounded-md border-gray-200 min-h-20 min-w-20 text-center flex items-center justify-center">
            {countdown.seconds}s
          </div>
        </div>
      )}
    </div>
  );
};

export default CountDown;
