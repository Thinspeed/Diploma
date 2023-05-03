using Diploma.API.Data;
using Diploma.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Diploma.API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ApplicationDbContext _dbContext;

        public UserService(IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        public async Task<int> AddUserAsync(User user)
        {
            if (_dbContext.Users.Any(u => u.Email == user.Email))
            {
                return -1;
            }

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return user.Id;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            User? user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return false;
            }

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public User? GetCurrentUser()
        {
            User? user = null;
            if (_httpContextAccessor.HttpContext != null)
            {
                if (int.TryParse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name), out int id))
                {
                    user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
                }
            }

            return user;
        }
    }
}
