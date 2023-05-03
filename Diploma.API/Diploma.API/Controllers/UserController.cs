using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Diploma.API.Models;
using Diploma.API.Services.UserService;

namespace Diploma.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getById")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            return Ok(await _userService.GetUserByIdAsync(id));
        }
    }
}
