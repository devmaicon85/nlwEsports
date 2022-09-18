import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Props {
    name: string;
    title: string;
    value: string;
    selected: boolean;
}
export function ToggleGroupItem({ name, title, value, selected }: Props) {
    return (
        <ToggleGroup.Item
            value={value}
            className={`h-8 w-8 sm:w-12 sm:mr-4 rounded-lg  ${
                selected ? "bg-violet-500" : "bg-zinc-900"
            }`}
            title={title}
        >
            {name}
        </ToggleGroup.Item>
    );
}
