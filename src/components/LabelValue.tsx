interface Props {
    label: string;
    children: React.ReactNode;
}
export function LabelValue({ label, children }: Props) {
    return (
        <div className="m-2">
            <div className="text-zinc-500 text-sm">{label}</div>
            <div className="font-semibold">{children}</div>
        </div>
    );
}
