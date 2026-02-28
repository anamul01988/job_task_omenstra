import { DropdownShell } from "./DropdownShell";

export default function SimpleDropdown({ isOpen, links }) {
  return (
    <DropdownShell isOpen={isOpen} className="p-[0.5rem]">
      {links.map((label) => (
        <a
          key={label}
          href="#"
          className="block px-[1rem] py-[0.625rem] text-[0.8125rem] font-medium text-[#97a3b6]
                     rounded-[0.75rem] whitespace-nowrap transition-all duration-300
                     hover:bg-white/[0.05] hover:text-white"
        >
          {label}
        </a>
      ))}
    </DropdownShell>
  );
}
