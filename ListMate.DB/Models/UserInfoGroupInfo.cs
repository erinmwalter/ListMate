using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ListMate.API.ListMate.DB.Models
{
    public class UserInfoGroupInfo
    {
        [Key]
        public int UserInfoGroupInfoId { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }

        [JsonIgnore]
        public UserInfo User { get; set; }
        [JsonIgnore]
        public GroupInfo Group { get; set; }
    }
}
