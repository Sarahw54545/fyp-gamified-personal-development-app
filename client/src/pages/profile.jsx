import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/mainLayout";
import { apiFetch } from "@/services/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

import { XPWidget } from "@/components/profile/XPWidget";
import { AchievementGrid } from "@/components/profile/AchievementGrid";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiFetch("/api/profile");
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">

        <h1 className="text-3xl font-bold">Your Profile ✨</h1>

        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && profile && (
          <>
            <XPWidget gamification={profile.gamification} />
            <AchievementGrid achievements={profile.gamification.achievements} />
          </>
        )}

      </div>
    </MainLayout>
  );
}

export default Profile;