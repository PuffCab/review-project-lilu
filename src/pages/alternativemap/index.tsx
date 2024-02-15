import dynamic from "next/dynamic";

const AlternativeMap = dynamic(
  () => import("@/components/AlternativeMapComponent"),
  {
    loading: () => {
      return <h1>...Loading Map...</h1>;
    },
    ssr: false,
  }
);

export default function Home() {
  return (
    <div>
      <AlternativeMap />
    </div>
  );
}
