const SortIcon = ({sort}: {sort: "asc"|"desc"|false}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m3 16 4 4 4-4" opacity={sort === 'asc' ? 1 : 0.5} />
      <path d="M7 20V4" opacity={sort === 'asc' ? 1 : 0.5} />
      <path d="m21 8-4-4-4 4" opacity={sort === 'desc' ? 1 : 0.5} />
      <path d="M17 4v16" opacity={sort === 'desc' ? 1 : 0.5} />
    </svg>
  );
};

export default SortIcon