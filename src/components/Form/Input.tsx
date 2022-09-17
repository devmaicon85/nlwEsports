import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: Props) {
    return (
        <input
            {...props}
            className="w-full px-4 py-3 text-sm rounded bg-zinc-900 placeholder:text-zinc-500"
        />
    );
}
