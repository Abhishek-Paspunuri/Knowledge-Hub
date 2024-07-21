using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Model;
using Test.Models;
namespace Test.Services
{

    public interface IApprovalService
    {
        public Task<IEnumerable<bool>> GetApprovalsAsync(string userId);
        public Task AddUserForApprovalAsync(string id, string role, bool isApproved);

        public Task<List<object>> GetAllApprovalsAsync();

        public void GrantApproval(string userId, string adminId);

        public Task RevokeApproval(string userId);
    }

    public class ApprovalService : IApprovalService
    {
        private readonly ApplicationDbContext _context;


        public ApprovalService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<bool>> GetApprovalsAsync(string userId)
        {
            var approvals = await _context.Approvals.Where(a => a.UserId == userId).ToListAsync();
            var columnValue = approvals.Select(a => a.IsApproved);
            return columnValue;
        }

        public async Task AddUserForApprovalAsync(string id, string role, bool isApproved)
        {
            var approvalEntity = new Approval
            {
                UserId = id,
                Role = role,
                ApprovedOn = DateTime.Now,
                IsApproved = isApproved,
                ApprovedBy = isApproved ? "System" : null
            };
            await _context.Approvals.AddAsync(approvalEntity);
            await _context.SaveChangesAsync();
        }

        public async Task<List<object>> GetAllApprovalsAsync()
        {
            var approvals = await _context.Approvals
                .Join(_context.AspNetUsers,
                    approval => approval.UserId,
                    user => user.Id,
                    (approval, user) => new
                    {
                        approval.UserId,
                        approval.Role,
                        approval.ApprovedOn,
                        approval.IsApproved,
                        approval.ApprovedBy,
                        user.profileName
                    })
                .ToListAsync();

            var objectApprovals = approvals.Select(a => (object)a).ToList();
            return objectApprovals;
        }

        public void GrantApproval(string userId, string adminId)
        {
            var approval = _context.Approvals.FirstOrDefault(a => a.UserId == userId);
            approval.IsApproved = true;
            approval.ApprovedOn = DateTime.Now;
            approval.ApprovedBy = adminId;
            _context.SaveChanges();

            var user = _context.AspNetUsers.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                user.isAdmin = true;
                _context.SaveChanges();
            }
        }

        public async Task RevokeApproval(string userId)
        {
            var approval = await _context.Approvals.FirstOrDefaultAsync(a => a.UserId == userId);
            if (approval != null)
            {
                _context.Approvals.Remove(approval);
                await _context.SaveChangesAsync();
            }
        }

    }
}

