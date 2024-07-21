using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test.Model;
using Test.Models;
using Test.Services;


[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionsController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet("getQuestions")]
    // [Authorize(Roles = "False")]
    public async Task<IActionResult> GetQuestions()
    {
        var questions = await _questionService.GetQuestionsAsync();
        return Ok(questions);
    }

    [HttpGet("getQuestion/{id}")]
    public async Task<IActionResult> GetQuestionById(int id)
    {
        var question = await _questionService.GetQuestionByIdAsync(id);
        if (question == null)
        {
            return NotFound();
        }
        return Ok(question);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetQuestionsByUserId(string userId)
    {
        var questions = await _questionService.GetQuestionsByUserIdAsync(userId);
        return Ok(questions);
    }

    [HttpPost("postQuestion")]
    public async Task<IActionResult> PostQuestion([FromBody] QuestionDto question)
    {
        await _questionService.PostQuestionAsync(question);
        
        var questions = await _questionService.GetQuestionsAsync();
        return Ok(questions);
    }

    [HttpPut("updateQuestion")]
    public async Task<IActionResult> UpdateQuestion([FromBody] UpdatedQuestionDto question)
    {
        await _questionService.UpdateQuestionAsync(question);
        return NoContent();
    }

    [HttpDelete("deleteQuestion/{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
        await _questionService.DeleteQuestionAsync(id);
        return NoContent();
    }

    [HttpGet("toggleConvoEnded/{id}")]
    public async Task<IActionResult> EndConversation(int id)
    {
        await _questionService.ToggleConversationEndedForTheQuestion(id);
        return NoContent();
    }
}
