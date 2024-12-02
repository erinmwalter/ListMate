using ListMate.API.ListMate.DB.Models;
using ListMate.API.ListMate.DB.Services;
using System.Reflection;

namespace ListMate.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile($"appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{EnvironmentName}.json", optional: false, reloadOnChange: true)
                .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
                .AddEnvironmentVariables();

            var dbConnectionOptions = builder.Configuration.GetSection(DbConnectionOptions.Key).Get<DbConnectionOptions>();
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbServices(dbConnectionOptions);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseDefaultFiles();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
            app.MapFallbackToFile("index.html");
        }

        private static string EnvironmentName =>
          Environment
               .GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
               ?.ToLowerInvariant()
          ?? "Development";
    }
}