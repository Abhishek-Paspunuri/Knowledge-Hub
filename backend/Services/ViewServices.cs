using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;
using Test.Data;
using Test.Model;
using Test.Models;
namespace Test.Services
{

    public interface IViewService
    {
        Task<string> AddViewAsync(ViewDto view);
        Task<int> GetViewCountAsync(int queId);
    }

    public class ViewService : IViewService
    {
        private readonly ApplicationDbContext _context;

        public ViewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<string> AddViewAsync(ViewDto view)
        {
            var newViewData = new View
            {
                QueId = view.QueId,
                UserId = view.UserId
            };

            var existingView = _context.Views.FirstOrDefault(v => v.QueId == view.QueId && v.UserId == view.UserId);
            if (existingView != null)
            {
                // System.Console.WriteLine("View already exists for the user.");
                return Task.FromResult("View already exists for the user.");
            }

            _context.Views.Add(newViewData);
            _context.SaveChanges();
            return Task.FromResult("View added successfully.");
        }

        public Task<int> GetViewCountAsync(int queId)
        {
            return _context.Views.CountAsync(v => v.QueId == queId);
        }

    }

}

