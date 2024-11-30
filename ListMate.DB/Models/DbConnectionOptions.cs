namespace ListMate.API.ListMate.DB.Models
{
    public class DbConnectionOptions
    {
        public const string Key = "DBConfiguration";
        public string ConnectionString { get; set; } = String.Empty;    
    }
}
