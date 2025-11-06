import { CircleCheck } from "lucide-react";

const ConnectedFlag = () => {
  return (
    <div className="px-2  border border-green-600/10 bg-green-400/5 rounded-xl flex items-center gap-2 flex-nowrap">
      <CircleCheck className="inline w-3.5 h-3.5 mr-1 text-green-500" />
      <span className="text-green-500 text-xs font-light">Connected</span>
    </div>
  );
};

export default ConnectedFlag;
