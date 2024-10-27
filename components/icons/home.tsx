const HomeIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 21"
      version="1.1"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="matrix(1,0,0,1,-2,-1.00249)">
        <path
          d="M12.282,2.265L20.669,8.843L20.959,20.071L15.378,20.822L14.922,11.97L8.964,12.038L8.957,21.021L3.687,20.702L3.182,9.316L12.282,2.265Z"
          className="fill-red-500"
          strokeWidth={0}
        />
        <path
          d="M15,21L15,13C15,12.451 14.549,12 14,12L10,12C9.451,12 9,12.451 9,13L9,21"
          fill="none"
          fillRule="nonzero"
          stroke="currentColor"
          strokeWidth={2}
        />
        <path
          d="M3,10C3,9.411 3.26,8.852 3.709,8.472L10.709,2.473C11.451,1.846 12.549,1.846 13.291,2.473L20.291,8.472C20.74,8.852 21,9.411 21,10L21,19C21,20.097 20.097,21 19,21L5,21C3.903,21 3,20.097 3,19L3,10Z"
          fill="none"
          fillRule="nonzero"
          stroke="currentColor"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
}

export default HomeIcon;