using ListMate.API.ListMate.DB.DbContexts;
using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ListMate.API.ListMate.DB.Services
{
    public class UserInfoRepo : IUserInfoRepo
    {
        private readonly ListMateDbContext _context;

        public UserInfoRepo(ListMateDbContext context)
        {
            _context = context;
        }

        public async Task<UserInfo?> GetUserInfoByEmail(string emailAddress)
        {
            return await _context.UserInfo.Where(x => x.EmailAddress == emailAddress).FirstOrDefaultAsync();
                
        }

        public async Task<bool> UpdateUserInfo(UserInfo userInfo)
        {
            var userInfoRecord = await _context.UserInfo.FirstOrDefaultAsync(x => x.UserId == userInfo.UserId);
            if (userInfoRecord != null)
            {
                userInfoRecord.FirstName = userInfo.FirstName;
                userInfoRecord.LastName = userInfo.LastName;
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                Console.WriteLine("Could not locate record in Db");
                return false;
            }
        }

        public async Task<UserInfo?> AddUserInfo(UserInfo userToAdd)
        {
            await _context.UserInfo.AddAsync(userToAdd);
            await _context.SaveChangesAsync();
            var userInfo = await GetUserInfoByEmail(userToAdd.EmailAddress);

            return userInfo;
        }

        public async Task<List<UserInfo>?> GetAllUsersForGroup(int groupId)
        {
            return await _context.UserInfoGroupInfo
                    .Where(ug => ug.GroupId == groupId)
                    .Include(ug => ug.User)
                    .Select(ug => ug.User)
                    .ToListAsync();
        }
    }
}
