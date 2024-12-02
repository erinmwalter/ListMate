using ListMate.API.ListMate.DB.Models;
using ListMate.API.ListMate.DB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListMate.API.Controllers
{
    [Route("api/list")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly IListInfoRepo _listInfoRepo;
        public ListController(IListInfoRepo listRepo)
        {
            _listInfoRepo = listRepo;
        }

        [HttpGet("bygroup/{id}")]
        public async Task<IActionResult> GetListsForGroup(int id)
        {
            var results = await _listInfoRepo.GetListsForGroup(id);
            return Ok(results);
        }

        [HttpPut("updateItem")]
        public async Task<IActionResult> UpdateItem([FromBody] ListItem itemToUpdate)
        {
            var results = await _listInfoRepo.UpdateListItem(itemToUpdate);
            return Ok(results);
        }

        [HttpDelete("delete/{itemId}")]
        public async Task<IActionResult> DeleteListItem(int itemId)
        {
            var results = await _listInfoRepo.DeleteListItem(itemId);
            return Ok(results);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateList([FromBody] ListDescription listToCreate)
        {
            var results = await _listInfoRepo.CreateListAsync(listToCreate);
            return Ok(results);
        }

        [HttpGet("getWithItems/{listId}")]
        public async Task<IActionResult> GetWithItems(int listId)
        {
            var results = await _listInfoRepo.GetListWithItems(listId);
            return Ok(results);
        }

        [HttpPost("addbulk")]
        public async Task<IActionResult> AddBulkItems([FromBody] List<ListItem> itemsToAdd)
        {
            var results = await _listInfoRepo.AddMultipleItemsAsync(itemsToAdd);
            return Ok(results);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddOneItem([FromBody] ListItem itemsToAdd)
        {
            var results = await _listInfoRepo.AddOneItemAsync(itemsToAdd);
            return Ok(results);
        }
    }
}
