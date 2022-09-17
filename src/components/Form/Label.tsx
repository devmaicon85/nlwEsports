import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: Props) {
    return (
        <label
            {...props}
            className="text-xs md:text-base"
        ></label>
    );
}
