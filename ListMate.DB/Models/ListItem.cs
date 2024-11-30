namespace ListMate.API.ListMate.DB.Models
{
    public class ListItem
    {
        public int ItemId { get; set; }
        public int ListId { get; set; }
        public string ItemName { get; set; } = String.Empty;
        public string ItemDescription { get;set; } = String.Empty;
        public bool IsDone { get; set; }
        public bool IsHighPriority { get; set; }

    }
}
