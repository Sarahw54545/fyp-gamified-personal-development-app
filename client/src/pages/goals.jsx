import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import GoalCard from "../components/goals/goalCard.jsx";
import CreateGoalForm from "../components/goals/CreateGoalForm";
import { toast } from 'sonner';

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

    toast.custom(() => (
    <div className="p-4">
    <strong>Goal Created 🚀</strong>
    <p>{newGoal.title} has been added successfully.</p>
    </div>
    ));
  };

  const handleDelete = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/goals/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete goal");
    }

    const deletedGoal = goals.find((goal) => goal.id === id);

    setGoals((prev) => prev.filter((goal) => goal.id !== id));

    toast.custom(() => (
    <div className="p-4">
    <strong>Goal Deleted 🗑️</strong>
    <p>{deletedGoal?.title} has been removed.</p>
    </div>
    ));

  } catch (err) {
    console.error(err);
    
    toast.custom(() => (
    <div className="p-4">
    <strong>Error</strong>
    <p>Failed to delete goal.</p>
    </div>
    ));
  }
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
            <GoalCard key={goal.id} goal={goal} onDelete={handleDelete}/>
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