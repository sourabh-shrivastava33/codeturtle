import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
interface CustomDropDownProps {
  type: number;
  title: string;
  value: string;
}
const CustomDropDown = ({
  data,
  value,
  setValue,
}: {
  data: CustomDropDownProps[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const selectedTitle = data.find((d) => d.value === value)?.title;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-4 justify-between border border-border bg-card rounded-sm px-3 py-1 min-w-10">
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={15} />
          <span className="text-sm font-light text-foreground">
            {selectedTitle}
          </span>
        </span>
        <ChevronDown className="text-muted-foreground" size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border border-border text-foreground">
        <DropdownMenuLabel>Filter By review status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((d) => (
          <DropdownMenuItem
            key={d.title}
            onSelect={() => setValue(d.value)}
            className="hover:bg-secondary hover:text-secondary-foreground"
          >
            {d.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropDown;
