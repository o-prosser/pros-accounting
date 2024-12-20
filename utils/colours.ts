export const colours = [
  {
    name: "red",
    // background: "#fee2e2", // 100
    background: "var(--color-red)", // 100
    foreground: "#dc2626", // 600
  },
  {
    name: "orange",
    // background: "#ffedd5",
    background: "var(--color-orange)",
    foreground: "#ea580c",
  },
  {
    name: "amber",
    // background: "#fef3c7",
    background: "var(--color-amber)",
    foreground: "#d97706",
  },
  {
    name: "yellow",
    // background: "#fef9c3",
    background: "var(--color-yellow)",
    foreground: "#ca8a04",
  },
  {
    name: "lime",
    // background: "#ecfccb",
    background: "var(--color-lime)",
    foreground: "#65a30d",
  },
  {
    name: "green",
    // background: "#dcfce7",
    background: "var(--color-green)",
    foreground: "#16a34a",
  },
  {
    name: "emerald",
    // background: "#d1fae5",
    background: "var(--color-emerald)",
    foreground: "#059669",
  },
  {
    name: "teal",
    // background: "#ccfbf1",
    background: "var(--color-teal)",
    foreground: "#0d9488",
  },
  {
    name: "cyan",
    // background: "#cffafe",
    background: "var(--color-cyan)",
    foreground: "#0891b2",
  },
  {
    name: "sky",
    // background: "#e0f2fe",
    background: "var(--color-sky)",
    foreground: "#0284c7",
  },
  {
    name: "blue",
    // background: "#dbeafe",
    background: "var(--color-blue)",
    foreground: "#2563eb",
  },
  {
    name: "indigo",
    // background: "#e0e7ff",
    background: "var(--color-indigo)",
    foreground: "#4f46e5",
  },
  {
    name: "violet",
    // background: "#ede9fe",
    background: "var(--color-violet)",
    foreground: "#7c3aed",
  },
  {
    name: "purple",
    // background: "#f3e8ff",
    background: "var(--color-purple)",
    foreground: "#9333ea",
  },
  {
    name: "fuchsia",
    // background: "#fae8ff",
    background: "var(--color-fuchsia)",
    foreground: "#c026d3",
  },
  {
    name: "pink",
    // background: "#fce7f3",
    background: "var(--color-pink)",
    foreground: "#db2777",
  },
  {
    name: "rose",
    // background: "#ffe4e6",
    background: "var(--color-rose)",
    foreground: "#e11d48",
  },
];

export const getColour = (name: string | null) => {
  const colour = colours.find((c) => c.name === name);
  if (!colour)
    return {
      name: "muted",
      background: "var(--color-muted)",
      foreground: "var(--color-muted-foreground)",
    };

  return colour;
};
