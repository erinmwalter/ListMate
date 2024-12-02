using ListMate.API.Controllers;
using ListMate.API.ListMate.DB.Models;

namespace ListMate.API.ListMate.DB.Services
{
    public interface IGroupInfoRepo
    {
        Task<List<GroupInfo>> GetGroupsForUserAsync(int userId);
        Task<bool> AddGroupAsync(GroupInfoCreatedBy groupInfo);
        Task<bool> AddUsersToGroupAsync(List<int> userIds, int groupId);
        Task<GroupInfo> RemoveGroupAsync(int groupId);
        Task<GroupInfo?> GetGroupInfoAsync(int groupId);

    }
}
