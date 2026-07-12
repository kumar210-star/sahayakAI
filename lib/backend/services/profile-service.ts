import { Profile } from "@/lib/supabase/types";
import { ProfileRepository } from "../repositories/profile-repo";
import { NotFoundError } from "../errors/app-error";

export class ProfileService {
  private profileRepo: ProfileRepository;

  constructor() {
    this.profileRepo = new ProfileRepository();
  }

  async getUserProfile(userId: string): Promise<Profile> {
    const profile = await this.profileRepo.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError("Profile not found for this user.");
    }
    return profile;
  }

  async updateProfile(userId: string, data: Partial<Profile>): Promise<Profile> {
    return this.profileRepo.update(userId, data);
  }

  async upsertProfile(data: Partial<Profile> & { id: string }): Promise<Profile> {
    return this.profileRepo.upsert(data);
  }
}
