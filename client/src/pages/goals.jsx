import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { apiFetch } from "@/services/apiClient";
import GoalCard from "../components/goals/goalCard.jsx";
import CreateGoalForm from "../components/goals/createGoalForm";
import OverdueGoalsWidget from "../components/goals/overdueGoalsWidget"
import { toast } from 'sonner';
import { Input } from "@/components/ui/input"
import { getActiveGoals, getArchivedGoals, getOverdueGoals, getGoalsDueThisWeek } from "@/lib/goals";


function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState("");


  const activeGoals = getActiveGoals(goals);
  const archivedGoals = getArchivedGoals(goals);

const overdueGoals = getOverdueGoals(activeGoals);
const dueThisWeek = getGoalsDueThisWeek(activeGoals);

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

  const filteredGoals = activeGoals.filter(goal =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );


  const visibleGoals = search.trim()
    ? filteredGoals
    : activeGoals;

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

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Goals 🚀</h1>
        </div>

        {loading && <p>Loading goals...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Active Goals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT COLUMN (everything except overdue) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Active Goals Heading */}
            <h2 className="text-xl font-semibold">Active Goals</h2>

            {/* Search + Add */}
            <div className="flex items-center gap-4">
              <div className="w-[220px]">
                <Input
                  placeholder="Search Goals…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <CreateGoalForm onGoalCreated={handleGoalCreated} />
            </div>



            {/* Empty States */}
            {!loading && activeGoals.length === 0 && (
              <p className="text-muted-foreground">
                No Active Goals Right Now 🎉
              </p>
            )}

            {!loading &&
              activeGoals.length > 0 &&
              visibleGoals.length === 0 && (
                <p className="text-muted-foreground">
                  No Matching Goals Found ✨
                </p>
              )}



            {/* Active Goals Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {visibleGoals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onDelete={handleDelete}
                  onGoalUpdated={handleGoalUpdated}
                  onComplete={handleCompleteGoal}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (Overdue) */}

          <div className="self-start">
            <OverdueGoalsWidget goals={overdueGoals} onDelete={handleDelete} onComplete={handleCompleteGoal} onGoalUpdated={handleGoalUpdated} />
          </div>


        </div>

        {/* Due This Week */}
        <div>
          <h3 className="text-lg font-semibold mt-8">
            Due This Week
          </h3>

          {dueThisWeek.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-2">
              No Goals Due in the Next 7 Days 🎉
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {dueThisWeek.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  variant="highlight"
                />
              ))}
            </div>
          )}
        </div>

        {/* Archived Goals */}
        {archivedGoals.length > 0 && (
          <div className="mt-10">
            <button
              onClick={() => setShowArchived(prev => !prev)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <span className="text-lg">
                {showArchived ? "▾" : "▸"}
              </span>
              Completed Goals ({archivedGoals.length})
            </button>

            {showArchived && (
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {archivedGoals.map(goal => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Goals;