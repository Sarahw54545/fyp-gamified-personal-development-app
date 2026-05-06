import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { apiFetch } from "@/services/apiClient";

import { ProfileHero } from "../components/profile/profileHero";
import { GoalsStats } from "../components/profile/goalsStats";
import { AchievementsStats } from "../components/profile/achievementsStats";
import { ActivityStats } from "../components/profile/activityStats";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const data = await apiFetch("/api/profile");
      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading profile...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold p-mt">Your Profile ✨</h1>

        <ProfileHero user={profile.user} gamification={profile.gamification} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <GoalsStats goals={profile.stats.goals} />
          <AchievementsStats achievements={profile.stats.achievements} />
          <ActivityStats activity={profile.stats.activity} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;