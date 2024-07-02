export default function PreviewNameCard({ name }: { name: string }) {
  return (
    <>
      <div className="card w-128 h-40 bg-neutral text-white text-center items-center justify-center hover:bg-base-300 ">
        <h1 className="text-2xl">{name}</h1>
      </div>
    </>
  );
}
