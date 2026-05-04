import DMSansRegular from "./DMSans-Regular.ttf";

export type FontFamily = keyof typeof fonts;

const fonts = {
  DMSans: DMSansRegular,
} as const;

export default fonts;
