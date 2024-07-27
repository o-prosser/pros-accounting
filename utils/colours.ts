export const colours = [
  {
    name: "red",
    background: "#fee2e2", // 100
    foreground: "#dc2626", // 600
  },
  {
    name: "orange",
    background: "#ffedd5",
    foreground: "#ea580c",
  },
  {
    name: "amber",
    background: "#fef3c7",
    foreground: "#d97706",
  },
  {
    name: "yellow",
    background: "#fef9c3",
    foreground: "#ca8a04",
  },
  {
    name: "lime",
    background: "#ecfccb",
    foreground: "#65a30d",
  },
  {
    name: "green",
    background: "#dcfce7",
    foreground: "#16a34a",
  },
  {
    name: "emerald",
    background: "#d1fae5",
    foreground: "#059669",
  },
  {
    name: "teal",
    background: "#ccfbf1",
    foreground: "#0d9488",
  },
  {
    name: "cyan",
    background: "#cffafe",
    foreground: "#0891b2",
  },
  {
    name: "sky",
    background: "#e0f2fe",
    foreground: "#0284c7",
  },
  {
    name: "blue",
    background: "#dbeafe",
    foreground: "#2563eb",
  },
  {
    name: "indigo",
    background: "#e0e7ff",
    foreground: "#4f46e5",
  },
  {
    name: "violet",
    background: "#ede9fe",
    foreground: "#7c3aed",
  },
  {
    name: "purple",
    background: "#f3e8ff",
    foreground: "#9333ea",
  },
  {
    name: "fuchsia",
    background: "#fae8ff",
    foreground: "#c026d3",
  },
  {
    name: "pink",
    background: "#fce7f3",
    foreground: "#db2777",
  },
  {
    name: "rose",
    background: "#ffe4e6",
    foreground: "#e11d48",
  },
];

export const getColour = (name: string | null) => {
  const colour = colours.find((c) => c.name === name);
  if (!colour)
    return {
      name: "muted",
      background: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    };

  return colour;
};
