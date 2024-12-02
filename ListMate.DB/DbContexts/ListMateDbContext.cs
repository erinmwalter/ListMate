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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ListItem>()
                .HasOne<ListDescription>()
                .WithMany(l => l.ListItems)
                .HasForeignKey(li => li.ListId);

            modelBuilder.Entity<UserInfoGroupInfo>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ug => ug.UserId);

            modelBuilder.Entity<UserInfoGroupInfo>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(ug => ug.GroupId);
        }
    }
}
