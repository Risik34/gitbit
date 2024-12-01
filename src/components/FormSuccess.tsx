import { CircleCheck } from "lucide-react";

export default function FormSuccess({message}:{message:string}) {
  return (
    <div className="rounded-lg border border-emerald-400/60 px-4 py-3 text-emerald-400">
      <p className="text-sm">
        <CircleCheck
          className="-mt-0.5 me-3 inline-flex opacity-80"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        {message}
      </p>
    </div>
  );
}

