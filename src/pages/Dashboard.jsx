import BackBtn from "../components/BackBtn";

const Dashboard = () => {
  return (
    <section className="container mx-auto mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <BackBtn />
      </div>
    </section>
  );
};

export default Dashboard;
