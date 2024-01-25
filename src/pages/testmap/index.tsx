import dynamic from "next/dynamic";
import { useMemo } from "react";

// const MyMap = dynamic(() => import("@/components/MyMap"), { ssr: false });

// function TestMap() {
//   return (
//     <>
//       <h1>Test Map</h1>
//       <MyMap />
//     </>
//   );
// }

// export default TestMap;

export default function MyPage() {
  //   const Map = useMemo(
  //     () =>
  //       dynamic(() => import("@/components/MyMap"), {
  //         loading: () => <p>A map is loading</p>,
  //         ssr: false,
  //       }),
  //     []
  //   );
  const MapWithNoSSR = dynamic(() => import("@/components/MyMap"), {
    ssr: false,
  });

  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
