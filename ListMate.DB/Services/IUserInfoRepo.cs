using ListMate.API.ListMate.DB.Models;

namespace ListMate.API.ListMate.DB.Services
{
    public interface IUserInfoRepo
    {
        Task<UserInfo?> GetUserInfoByEmail(string emailAddress);
        Task<bool> UpdateUserInfo(UserInfo userInfo);
        Task<UserInfo?> AddUserInfo(UserInfo userToAdd);
    }
}
