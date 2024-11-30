using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace ListMate.API.ListMate.DB.DbContexts
{
    public class ListMateDbContext : DbContext
    {
        public DbSet<GroupInfo>? GroupInfo { get; set; }
        public DbSet<ListDescription>? ListDescription { get; set; }

        public DbSet<ListItem>? ListItem { get; set; }
        public DbSet<UserInfo>? UserInfo { get; set; }
        public DbSet<UserInfoGroupInfo>? UserInfoGroupInfo { get; set; }

        public ListMateDbContext(DbContextOptions<ListMateDbContext> options) : base(options) { }


    }
}
