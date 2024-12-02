using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ListMate.API.ListMate.DB.Models
{
    public class ListDescription
    {
        [Key]
        public int ListId { get; set; }
        public int GroupId { get; set; }
        public string ListName { get; set; } = String.Empty;
        public string ListCategory { get; set; } = String.Empty;
        public List<ListItem> ListItems { get; set; } = new List<ListItem>();

    }
}
