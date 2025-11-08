export default function Color({ color }: { color: string }) {
  return (
    <span
      className={`flex-row gap-1 m-0 p-0 h-fit justify-center items-center font-semibold align-baseline w-fit inline-flex`}
    >
      <span
        className={`w-4 h-4 rounded-sm`}
        style={{
          background: color,
        }}
      ></span>
      <span
        style={{
          color: color,
        }}
      >
        {color}
      </span>
    </span>
  );
}
