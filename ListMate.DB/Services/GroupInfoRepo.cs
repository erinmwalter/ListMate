using ListMate.API.Controllers;
using ListMate.API.ListMate.DB.DbContexts;
using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Text.RegularExpressions;

namespace ListMate.API.ListMate.DB.Services
{
    public class GroupInfoRepo : IGroupInfoRepo
    {
        private readonly ListMateDbContext _context;

        public GroupInfoRepo(ListMateDbContext context)
        {
            _context = context;
        }
        public async Task<bool> AddUsersToGroupAsync(List<int> userIds, int groupId)
        {
            foreach(var id in userIds)
            {
                var uIGI = new UserInfoGroupInfo() { UserId = id, GroupId = groupId};
                await _context.UserInfoGroupInfo.AddAsync(uIGI);
            }
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddGroupAsync(GroupInfoCreatedBy groupInfo)
        {
            var group = new GroupInfo() { GroupId = groupInfo.groupId, Description = groupInfo.description, GroupName = groupInfo.groupName };
            group.UserGroups = new List<UserInfoGroupInfo>() { new UserInfoGroupInfo() { UserId = groupInfo.createdBy } };
            await _context.GroupInfo.AddAsync(group);
            return await _context.SaveChangesAsync() > 0;
 
        }

        public async Task<GroupInfo?> GetGroupInfoAsync(int groupId)
        {
            var group = await _context.GroupInfo.Where(x => x.GroupId == groupId).FirstOrDefaultAsync();
            return group;
        }

        public async Task<List<GroupInfo>> GetGroupsForUserAsync(int userId)
        {
            return await _context.UserInfoGroupInfo
                .Where(ug => ug.UserId == userId)
                .Include(ug => ug.Group)
                .Select(ug => ug.Group)
                .ToListAsync();
        }

        public Task<GroupInfo> RemoveGroupAsync(int groupId)
        {
            throw new NotImplementedException();
        }

    }
}
