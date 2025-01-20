import PlanCard from "./PlanCard";

const WebHostingPlan = () => {
  return (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">Choose Your Web Hosting Plan</h2>
        <div>
            <div className="container m-auto flex flex-wrap justify-center items-center gap-3 my-5">
                <PlanCard />
                <PlanCard />
                <PlanCard />
            </div>
        </div>
    </section>
  );
}

export default WebHostingPlan;