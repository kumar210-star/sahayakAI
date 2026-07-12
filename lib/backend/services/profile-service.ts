import { ProfileRepository, ProfileEntity } from "../repositories/profile-repo";
import { NotFoundError } from "../errors/app-error";

export class ProfileService {
  private profileRepo: ProfileRepository;

  constructor() {
    this.profileRepo = new ProfileRepository();
  }

  async getUserProfile(userId: string): Promise<ProfileEntity> {
    const profile = await this.profileRepo.findByUserId(userId);
    if (!profile) {
      throw new NotFoundError("Profile matching user id not found.");
    }
    return profile;
  }

  async updateProfile(userId: string, data: Partial<ProfileEntity>): Promise<ProfileEntity> {
    // Business rule checks can be added here
    return this.profileRepo.update(userId, data);
  }
}
