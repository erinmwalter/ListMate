using ListMate.API.ListMate.DB.Models;

namespace ListMate.API.ListMate.DB.Services
{
    public interface IGroupInfoRepo
    {
        Task<List<GroupInfo>> GetGroupsForUserAsync(int userId);
        Task<GroupInfo> CreateGroupAsync(GroupInfo groupInfo);
        Task<GroupInfo> AddUsersToGroupAsync(List<int> userIds);
        Task<GroupInfo> RemoveGroupAsync(int groupId);

    }
}
