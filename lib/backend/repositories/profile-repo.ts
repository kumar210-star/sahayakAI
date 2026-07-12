export interface ProfileEntity {
  userId: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  aadhaarNumber?: string;
  state?: string;
  district?: string;
  occupation?: string;
  annualIncome?: string;
  education?: string;
}

// In-Memory mock datastore simulator
const mockProfilesDb = new Map<string, ProfileEntity>([
  [
    "user-123-mock",
    {
      userId: "user-123-mock",
      fullName: "Rajesh Kumar",
      mobileNumber: "9876543210",
      email: "rajesh.kumar@email.com",
      aadhaarNumber: "123456789012",
      state: "Maharashtra",
      district: "Pune",
      occupation: "Farmer",
      annualIncome: "₹50,000 - ₹1,000,000",
      education: "Graduate",
    },
  ],
]);

export class ProfileRepository {
  async findByUserId(userId: string): Promise<ProfileEntity | null> {
    const profile = mockProfilesDb.get(userId);
    return profile ? { ...profile } : null;
  }

  async update(userId: string, data: Partial<ProfileEntity>): Promise<ProfileEntity> {
    const existing = mockProfilesDb.get(userId) || {
      userId,
      fullName: "New User",
      mobileNumber: "9999999999",
      email: "user@example.com",
    };

    const updated = { ...existing, ...data };
    mockProfilesDb.set(userId, updated);
    return { ...updated };
  }
}
