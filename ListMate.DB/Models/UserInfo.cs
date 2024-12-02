using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ListMate.API.ListMate.DB.Models
{
    public class UserInfo
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string EmailAddress { get; set; } = String.Empty;

        [JsonIgnore]
        public List<UserInfoGroupInfo> UserGroups { get; set; }
    }
}
