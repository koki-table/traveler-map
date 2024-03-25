import JapanMap from '@/components/JapanMap';

export default async function Page() {
  const list = [
    { name: "tokyo", count: 20 },
    { name: "osaka", count: 15 },
    { name: "aichi", count: 12 },
  ];
  return (
    <JapanMap list={list} />
  )
}