import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import GoalCard from "../components/goals/goalCard.jsx";
import CreateGoalForm from "../components/goals/CreateGoalForm";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/goals`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch goals");
        }
        return res.json();
      })
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add goal to state immediately after creation
  const handleGoalCreated = (newGoal) => {
    setGoals((prev) => [newGoal, ...prev]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Goals 🚀</h1>
          <CreateGoalForm onGoalCreated={handleGoalCreated} />
        </div>
        
        {loading && <p>Loading goals...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>

        {!loading && goals.length === 0 && (
          <p className="text-muted-foreground">
            No goals yet. Create your first one 🌟
          </p>
        )}
      </div>
    </MainLayout>
  );
}

export default Goals;