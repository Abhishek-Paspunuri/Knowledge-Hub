using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Model;
using Test.Models;
namespace Test.Services
{

    public interface IUserService
    {
        Task<int> GetUsersCountAsync();
        Task<string> GetUserIdByEmailAsync(string email);
    }
    
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetUsersCountAsync()
        {
            return await _context.AspNetUsers.CountAsync();
        }

        public async Task<string> GetUserIdByEmailAsync(string email)
        {
            return await _context.AspNetUsers.Where(u => u.Email == email).Select(u => u.Id).FirstOrDefaultAsync();
        }
    }   

}

