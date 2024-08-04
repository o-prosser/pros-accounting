export const colours = [
  {
    name: "red",
    // background: "#fee2e2", // 100
    background: "hsl(var(--red))", // 100
    foreground: "#dc2626", // 600
  },
  {
    name: "orange",
    // background: "#ffedd5",
    background: "hsl(var(--orange))",
    foreground: "#ea580c",
  },
  {
    name: "amber",
    // background: "#fef3c7",
    background: "hsl(var(--amber))",
    foreground: "#d97706",
  },
  {
    name: "yellow",
    // background: "#fef9c3",
    background: "hsl(var(--yellow))",
    foreground: "#ca8a04",
  },
  {
    name: "lime",
    // background: "#ecfccb",
    background: "hsl(var(--lime))",
    foreground: "#65a30d",
  },
  {
    name: "green",
    // background: "#dcfce7",
    background: "hsl(var(--green))",
    foreground: "#16a34a",
  },
  {
    name: "emerald",
    // background: "#d1fae5",
    background: "hsl(var(--emerald))",
    foreground: "#059669",
  },
  {
    name: "teal",
    // background: "#ccfbf1",
    background: "hsl(var(--teal))",
    foreground: "#0d9488",
  },
  {
    name: "cyan",
    // background: "#cffafe",
    background: "hsl(var(--cyan))",
    foreground: "#0891b2",
  },
  {
    name: "sky",
    // background: "#e0f2fe",
    background: "hsl(var(--sky))",
    foreground: "#0284c7",
  },
  {
    name: "blue",
    // background: "#dbeafe",
    background: "hsl(var(--blue))",
    foreground: "#2563eb",
  },
  {
    name: "indigo",
    // background: "#e0e7ff",
    background: "hsl(var(--indigo))",
    foreground: "#4f46e5",
  },
  {
    name: "violet",
    // background: "#ede9fe",
    background: "hsl(var(--violet))",
    foreground: "#7c3aed",
  },
  {
    name: "purple",
    // background: "#f3e8ff",
    background: "hsl(var(--purple))",
    foreground: "#9333ea",
  },
  {
    name: "fuchsia",
    // background: "#fae8ff",
    background: "hsl(var(--fuchsia))",
    foreground: "#c026d3",
  },
  {
    name: "pink",
    // background: "#fce7f3",
    background: "hsl(var(--pink))",
    foreground: "#db2777",
  },
  {
    name: "rose",
    // background: "#ffe4e6",
    background: "hsl(var(--rose))",
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
