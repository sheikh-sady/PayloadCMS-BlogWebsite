export default function PlusIcon({ color }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 6V18" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 12H18" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
