namespace ListMate.API.ListMate.DB.Models
{
    public class UserInfo
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string EmailAddress { get; set; } = String.Empty;

    }
}
