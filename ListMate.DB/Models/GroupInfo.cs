using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ListMate.API.ListMate.DB.Models
{
    public class GroupInfo
    {
        [Key]
        public int GroupId { get; set; }
        public string GroupName { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;

        [JsonIgnore]
        public List<UserInfoGroupInfo>? UserGroups { get; set; }
    }
}
