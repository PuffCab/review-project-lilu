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
  // NOTE if you found an API, you could fetch here and get , let's say, an array of coordinates. To be passed as props to the component <AlternativeMap/> below
  return (
    <div>
      <AlternativeMap />
    </div>
  );
}
