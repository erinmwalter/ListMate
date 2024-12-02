using ListMate.API.ListMate.DB.Models;
using ListMate.API.ListMate.DB.Services;
using Microsoft.AspNetCore.Mvc;

namespace ListMate.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserInfoRepo _userInfoRepo;
        public UserController(IUserInfoRepo userRepo)
        {
            _userInfoRepo = userRepo;
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _userInfoRepo.GetUserInfoByEmail(email);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserInfo user)
        {
            var result = await _userInfoRepo.AddUserInfo(user);
            return Ok(result);;
        }

        [HttpGet("bygroup/{groupId}")]
        public async Task<IActionResult> GetAllUsersForGroup(int groupId)
        {
            var user = await _userInfoRepo.GetAllUsersForGroup(groupId);
            return Ok(user);
        }
    }
}
