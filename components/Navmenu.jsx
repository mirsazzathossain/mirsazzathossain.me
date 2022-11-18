import { tooltip, Typography } from "@material-tailwind/react";
import { Tooltip } from "flowbite-react";

export default function Navmenu({ href, icon, label, ...props }) {
    const item = (
        <Typography
            as="li"
            variant="small"
            className="font-normal hover:text-white"
        >
            <Typography
                as="a"
                href={href}
                variant="small"
                className="flex items-center align-middle px-1 py-2 transition-all duration-250 text-current font-light lg:px-2"
            >
                {icon}
                <span className="ml-2 text-gray-800">{label}</span>
            </Typography>
        </Typography>
    )

    if ('tooltip' in props) {
        return (
            <Tooltip content={props.tooltip} placement='bottom'>
                {item}
            </Tooltip>
        )
    }

    return item
}