using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test.Model;
using Test.Models;
using Test.Services;


[ApiController]
[Route("api/[controller]")]
public class ViewController : ControllerBase
{
    private readonly IViewService _viewService;

    public ViewController(IViewService viewService)
    {
        _viewService = viewService;
    }

    [HttpPost("addView")]
    public IActionResult AddView([FromBody] ViewDto view)
    {
        var result = _viewService.AddViewAsync(view);
        return Ok(result);
    }

    [HttpGet("viewCount/{queId}")]
    public async Task<IActionResult> GetViewCount(int queId)
    {
        var viewCount = await _viewService.GetViewCountAsync(queId);
        return Ok(viewCount);
    }
}
