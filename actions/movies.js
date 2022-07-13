import { types } from "../types/index";

export const MouseEnterHover = () => {
    return {
        type: types.onMouseEnterHover,
    };
};

export const MouseLeaveHover = () => {
    return {
        type: types.onMouseLeaveHover,
    };
};