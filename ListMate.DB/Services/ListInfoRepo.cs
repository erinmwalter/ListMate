using ListMate.API.ListMate.DB.DbContexts;
using ListMate.API.ListMate.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace ListMate.API.ListMate.DB.Services
{
    public class ListInfoRepo : IListInfoRepo
    {
        private readonly ListMateDbContext _context;

        public ListInfoRepo(ListMateDbContext context)
        {
            _context = context;
        }

        public async Task<List<ListDescription>> GetListsForGroup(int groupId)
        {
            var lists = await _context.ListDescription.Include(l => l.ListItems).Where(x => x.GroupId == groupId).ToListAsync();
            
            return lists;
        }

        public async Task<ListDescription> GetListWithItems(int listId)
        {
            var list = await _context.ListDescription.Include(l => l.ListItems).FirstOrDefaultAsync(x => x.ListId == listId);
            list.ListItems = list.ListItems.ToList();
            return list;
        }

        public async Task<bool> CreateListAsync(ListDescription listToCreate)
        {
            await _context.ListDescription.AddAsync(listToCreate);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteListItem(int listItemId)
        {
            var item = await _context.ListItem.Where(x => x.ItemId == listItemId).FirstOrDefaultAsync();
            if (item != null)
            {
                item.IsDone = true;
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                Console.WriteLine("Could not locate record in Db");
                return false;
            }

        }

        public async Task<bool> UpdateListItem(ListItem itemToUpdate)
        {
            var item = await _context.ListItem.Where(x => x.ItemId == itemToUpdate.ItemId).FirstOrDefaultAsync();
            if (item != null)
            {
                item.ItemName = itemToUpdate.ItemName;
                item.ItemDescription = itemToUpdate.ItemDescription;
                item.IsHighPriority = itemToUpdate.IsHighPriority;
                item.IsDone = itemToUpdate.IsHighPriority;
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                Console.WriteLine("Could not locate record in Db");
                return false;
            }

        }

        public async Task<bool> AddMultipleItemsAsync(List<ListItem> itemsToAdd)
        {
            await _context.ListItem.AddRangeAsync(itemsToAdd);
            return await _context.SaveChangesAsync() > 0;
     
        }

        public async Task<bool> AddOneItemAsync(ListItem itemsToAdd)
        {
            await _context.ListItem.AddAsync(itemsToAdd);
            return await _context.SaveChangesAsync() > 0;

        }
    }
}
