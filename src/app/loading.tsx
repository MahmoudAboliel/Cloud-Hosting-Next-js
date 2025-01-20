
const Loading = () => {
  return (
    <section className="container m-auto p-10 flex justify-center items-center h-[calc(100vh-150px)] w-screen">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-[10px] border-gray-300" />
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-[10px] border-b-transparent border-t-transparent border-green-500 animate-spin" />
        </div>
    </section>
  );
}

export default Loading;