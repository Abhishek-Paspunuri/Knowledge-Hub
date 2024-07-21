using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test.Model;
using Test.Models;
using Test.Services;


[ApiController]
[Route("api/[controller]")]
public class ApprovalController : ControllerBase
{
    private readonly IApprovalService _approvalService;
    private readonly IUserService _userService;

    public ApprovalController(IApprovalService approvalService, IUserService userService)
    {
        _approvalService = approvalService;
        _userService = userService;
    }

    [HttpPost("addApprovals")]
    public async Task<IActionResult> AddApprovals([FromBody] ApprovalDto approval)
    {
        var userCount = await _userService.GetUsersCountAsync();
        await _approvalService.AddUserForApprovalAsync(approval.UserId, approval.Role, userCount == 1);
        return Ok("Approval Request Sent Successfully");
    }

    [HttpGet("getApprovalStatus/{userId}")]
    public async Task<bool> GetApprovals([FromRoute] string userId)
    {
        var data = _approvalService.GetApprovalsAsync(userId);
        return data.Result.First();
    }

    [HttpGet("getAllApprovals")]
    public async Task<List<object>> GetAllApprovals()
    {
        return await _approvalService.GetAllApprovalsAsync();
    }

    [HttpPost("grantApproval")]
    public async Task<IActionResult> GrantApproval([FromBody] GrantApprovalDto approval)
    {
        try
        {
            _approvalService.GrantApproval(approval.UserId, approval.ApprovedBy);
            return Ok("Approval Granted Successfully");
        }
        catch (Exception)
        {
            return BadRequest("Approval Denied");
        }
    }

    [HttpGet("revokeApproval/{userId}")]
    public async Task<IActionResult> RevokeApproval([FromRoute] string userId)
    {
        try
        {
            await _approvalService.RevokeApproval(userId);
            return Ok("Approval Revoked Successfully");
        }
        catch (Exception)
        {
            return BadRequest("Cannot Revoke Approval");
        }
    }
}
