namespace ListMate.API.ListMate.DB.Models
{
    public class ListDescription
    {
        public int ListId { get; set; }
        public int GroupId { get; set; }
        public string ListName { get; set; } = String.Empty;
        public ListCategory ListCategory { get; set; }

    }
}
