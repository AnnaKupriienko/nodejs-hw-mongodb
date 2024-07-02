import { typeList } from "../constants/contact-constants.js";
const parseBoolean = (value) => {
    if (typeof value !== "string") return;
    if (!["true", "false"].includes(value)) return;
    return value === "true";
};
const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => typeList.includes(type);

  if (isType(type)) return type;
};
export const parseFilterParams = ({ contactType,isFavourite }) => {
    const parsedType = parseType(contactType);
    const parsedFavourite = parseBoolean(isFavourite);
    return {
        contactType: parsedType,
        isFavourite: parsedFavourite,
    }
};
