using ListMate.API.ListMate.DB.DbContexts;
using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace ListMate.API.ListMate.DB.Services
{
    public class GroupInfoRepo : IGroupInfoRepo
    {
        private readonly ListMateDbContext _context;

        public GroupInfoRepo(ListMateDbContext context)
        {
            _context = context;
        }
        public Task<GroupInfo> AddUsersToGroupAsync(List<int> userIds)
        {
            throw new NotImplementedException();
        }

        public Task<GroupInfo> CreateGroupAsync(GroupInfo groupInfo)
        {
            throw new NotImplementedException();
        }

        public async Task<List<GroupInfo>> GetGroupsForUserAsync(int userId)
        {
            List<int> groupIds = await _context.UserInfoGroupInfo.Where(x => x.UserId == userId).Select(x => x.GroupId).ToListAsync();
            List<GroupInfo> groups = await _context.GroupInfo.Where(x => groupIds.Contains(x.GroupId)).ToListAsync();

            return groups;
        }

        public Task<GroupInfo> RemoveGroupAsync(int groupId)
        {
            throw new NotImplementedException();
        }
    }
}
