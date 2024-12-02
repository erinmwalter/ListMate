using ListMate.API.ListMate.DB.Models;

namespace ListMate.API.ListMate.DB.Services
{
    public interface IListInfoRepo
    {
        Task<List<ListDescription>> GetListsForGroup(int groupId);
        Task<bool> UpdateListItem(ListItem itemToUpdate);
        Task<bool> DeleteListItem(int listItemId);
        Task<bool> CreateListAsync(ListDescription listToCreate);
        Task<ListDescription> GetListWithItems(int listId);
        Task<bool> AddMultipleItemsAsync(List<ListItem> itemsToAdd);
        Task<bool> AddOneItemAsync(ListItem itemsToAdd);
    }
}
