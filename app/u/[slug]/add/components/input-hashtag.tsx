"use client";

export default function InputHashtag({
  value,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const splitValue = value.split(" ");
  const currentHashtagList = splitValue.filter((v) => v.startsWith("#"));

  return <input type="text" value={value} />;
}
