/**
 * DEMO USER & PROFILE SETTINGS
 * Default mock profile matching the proposed backend schema.
 * Managed dynamically via GET/PUT /api/users/profile
 */

export const DEFAULT_USER = {
  id: "usr_101",
  email: "maya.sharma@example.com",
  fullName: "Maya Sharma",
  displayName: "Maya S.",
  communityPseudonym: "SunflowerGlow22",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  dateOfBirth: "1997-04-14",
  age: 29,
  preferredLanguage: "en",
  timezone: "America/New_York",
  privacySettings: {
    shareSymptomsWithBookedDoctor: true,
    showInCommunityMemberCount: true,
    allowAnonymousResearchAggregation: false,
    pseudonymVisibleInCommunity: true
  },
  notificationPreferences: {
    appointmentReminders: true,
    communityReplies: true,
    weeklyHealthSummary: false,
    newRelevantResearchAlerts: true
  },
  savedResearchPaperIds: ["res_001", "res_002", "res_004"],
  savedCommunityPostIds: ["post_101", "post_102"],
  createdAt: "2026-08-15T10:00:00Z"
};
