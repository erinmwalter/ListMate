using ListMate.API.ListMate.DB.DbContexts;
using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace ListMate.API.ListMate.DB.Services
{
    public static class ConfigureDbServices
    {
        public static void AddDbServices(this IServiceCollection services, DbConnectionOptions config)
        {
            services.AddDbContext<ListMateDbContext>(options =>
            options.UseNpgsql(config.ConnectionString));

            services
                .AddTransient<IGroupInfoRepo, GroupInfoRepo>()
                .AddTransient<IUserInfoRepo, UserInfoRepo>()
                .AddTransient<IListInfoRepo, ListInfoRepo>()
                ;
        }
    }
}
