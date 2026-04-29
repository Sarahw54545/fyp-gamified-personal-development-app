import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { apiFetch } from "@/services/apiClient";
import GoalCard from "../components/goals/goalCard.jsx";
import CreateGoalForm from "../components/goals/createGoalForm";
import { toast } from 'sonner';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGoals() {
      try {
        const data = await apiFetch("/api/goals");
        setGoals(data);
      } catch (err) {
        setError(err.message || "Failed to fetch goals");
      } finally {
        setLoading(false);
      }
    }

    loadGoals();
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
      await apiFetch(`/api/goals/${id}`, {
        method: "DELETE"
      });

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

  const handleGoalUpdated = (updatedGoal) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ));

    toast.custom(() => (
      <div className="p-4">
        <strong>Goal Updated ✏️</strong>
        <p>Your Changes Have Been Saved.</p>
      </div>
    ));
  }

  const handleCompleteGoal = async (id) => {
    try {
      const res = await apiFetch(`/api/goals/${id}/complete`, {
        method: "POST",
      });

      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === id ? res.goal : goal
        )
      );


      res.gamification.unlockedAchievements.forEach((achievement) => {
        toast.custom(() => (
          <div className="p-4">
            <strong>
              {achievement.type === "daily"
                ? "Daily Achievement 🌟"
                : "Achievement Unlocked 🏆"}
            </strong>

            <p>
              {achievement.label
                ? `${achievement.label} (+${achievement.xp} XP)`
                : `+${achievement.xp} XP`}
            </p>
          </div>
        ));
      });

      } catch (err) {
        console.error(err);
        toast.custom(() => (
          <div className="p-4">
            <strong>Error</strong>
            <p>Failed to complete goal.</p>
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
              <GoalCard key={goal.id} goal={goal} onDelete={handleDelete} onGoalUpdated={handleGoalUpdated} onComplete={handleCompleteGoal} />
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