using ListMate.API.ListMate.DB.Models;
using ListMate.API.ListMate.DB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace ListMate.API.Controllers
{
    [Route("api/group")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupInfoRepo _groupInfoRepo;
        public GroupController(IGroupInfoRepo groupRepo)
        {
            _groupInfoRepo = groupRepo;
        }

        [HttpGet("byuser/{id}")]
        public async Task<IActionResult> GetGroupsForUser(int id)
        {
            var result = await _groupInfoRepo.GetGroupsForUserAsync(id);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupInfo(int id)
        {
            var result = await _groupInfoRepo.GetGroupInfoAsync(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroupAsync([FromBody] GroupInfoCreatedBy group)
        {
            var result = await _groupInfoRepo.AddGroupAsync(group);
            return Ok(result);
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUsersToGroup([FromBody] GroupIdUserIdList addList)
        {
            var result = await _groupInfoRepo.AddUsersToGroupAsync(addList.UserIds, addList.GroupId);
            return Ok(result);
        }

    }

    public class GroupIdUserIdList
    {
        public int GroupId { get; set; }
        public List<int> UserIds { get; set; }
    }

    public class GroupInfoCreatedBy
    {
        public int groupId { get; set; }
        public string groupName { get; set; } = String.Empty;
        public string description { get; set; } = String.Empty;
        public int createdBy { get; set; }
    }
}
