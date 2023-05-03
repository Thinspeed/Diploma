using Diploma.API.Models;

namespace Diploma.API.Services.UserService
{
    public interface IUserService
    {
        Task<int> AddUserAsync(User user);

        Task<bool> DeleteUserAsync(int id);

        Task<User?> GetUserByIdAsync(int id);

        Task<User?> GetUserByEmailAsync(string email);

        User? GetCurrentUser();
    }
}
