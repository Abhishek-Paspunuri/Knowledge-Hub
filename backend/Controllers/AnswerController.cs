using Microsoft.AspNetCore.Mvc;
using Test.Model;
using Test.Models;
using Test.Services;


[Route("api/[controller]")]
[ApiController]
public class AnswersController : ControllerBase
{
    private readonly IAnswerService _answerService;

    public AnswersController(IAnswerService answerService)
    {
        _answerService = answerService;
    }

    [HttpGet("getanswers/{queId}")]
    public async Task<IActionResult> GetAnswersByQuestionId(int queId)
    {
        var answers = await _answerService.GetAnswerByQuestionIdAsync(queId);
        return Ok(answers);
    }

    [HttpPost("postanswer")]
    public async Task<IActionResult> PostAnswer(AnswerDto answer)
    {
        await _answerService.PostAnswerAsync(answer);
        return CreatedAtAction(nameof(GetAnswersByQuestionId), new { queId = answer.QueId }, answer);
    }

    [HttpPut("updateanswer")]
    public async Task<IActionResult> UpdateAnswer(UpdatedAnswerDto answer)
    {
        await _answerService.UpdateAnswerAsync(answer);
        return NoContent();
    }

    [HttpDelete("deleteanswer/{ansId}")]
    public async Task<IActionResult> DeleteAnswer(int ansId)
    {
        await _answerService.DeleteAnswerAsync(ansId);
        return NoContent();
    }
}