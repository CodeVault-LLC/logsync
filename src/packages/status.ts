export const StatusPalettes = {
  error: {
    text: "#FF3838",
    background: "#ffd7d7",
  },
  info: {
    text: "#2DCCFF",
    background: "#D9F0FF",
  },
  debug: {
    text: "#A4ABB6",
    background: "#F0F1F3",
  },
  warn: {
    text: "#FFB302",
    background: "#FFF6D9",
  },
  fatal: {
    text: "purple",
    background: "#F3F0FF",
  },
  default: {
    text: "#A4ABB6",
    background: "#F0F1F3",
  },
};

export const findStatusPalette = (status: string) => {
  return (
    StatusPalettes[status as keyof typeof StatusPalettes] ||
    StatusPalettes.default
  );
};
