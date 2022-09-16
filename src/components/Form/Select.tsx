import * as Select from "@radix-ui/react-select";

export function SelectRadix({}) {
    return (
        <Select.Root>
            <Select.Trigger>
                <Select.Value />
                <Select.Icon />
            </Select.Trigger>

            <Select.Portal>
                <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        <Select.Item value="">
                            <Select.ItemText />
                            <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Separator />
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
