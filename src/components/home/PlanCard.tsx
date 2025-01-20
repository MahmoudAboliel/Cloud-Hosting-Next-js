import TopFeature from "./TopFeature";

const PlanCard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 rounded-3xl p-4 w-3/4 md:w-2/5 lg:w-1/4">
        <h3 className="text-2xl font-semibold text-purple-800">Premium</h3>
        <strong className="text-2xl">$4.99/mo</strong>
        <p className="bg-red-300 text-orange-800 font-semibold py-1 px-2 rounded-full">19% OFF</p>
        <div className="my-2">
            <h3 className="text-purple-800 text-xl font-medium">Top Features</h3>
            <TopFeature>100 Website</TopFeature>
            <TopFeature>100 GB SSD Storage</TopFeature>
            <TopFeature>Weekly Backups</TopFeature>
            <TopFeature>Unlimited Bandwidth</TopFeature>
            <TopFeature>Free SSL</TopFeature>
            <TopFeature>Free Email</TopFeature>
        </div>
        <button className="w-full text-2xl font-bold text-gray-900 border-2 border-gray-900 rounded-full px-2 py-1 hover:bg-gray-900 hover:text-white duration-500">
            BUY NOW
        </button>
    </div>
  );
}

export default PlanCard;