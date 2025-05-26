'use client';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/misc';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
    data: Array<{
        label: string;
        value: string;
    }>;
    emptyText?: string;
    onSelect?: (value: string) => void;
    placeholder?: string;
    value?: string;
};

const Combobox = ({
    data,
    emptyText,
    onSelect,
    placeholder,
    value = '',
}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between py-[26px]">
                    {value
                        ? data.find(framework => framework.value === value)
                              ?.label
                        : placeholder || 'Select value...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder || 'Select value...'}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {emptyText || 'No data found.'}
                        </CommandEmpty>
                        <CommandGroup>
                            {data.map(_listItem => (
                                <CommandItem
                                    key={_listItem.value}
                                    value={_listItem.value}
                                    onSelect={currentValue => {
                                        onSelect?.(currentValue);
                                        setOpen(false);
                                    }}>
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === _listItem.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {_listItem.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
export { Combobox };
