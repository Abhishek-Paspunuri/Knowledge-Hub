using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Model;
using Test.Models;
namespace Test.Services
{

    public interface IQuestionService
    {
        Task<List<object>> GetQuestionsAsync();
        Task<dynamic> GetQuestionByIdAsync(int id);
        Task<List<object>> GetQuestionsByUserIdAsync(string userId);
        Task<List<dynamic>> PostQuestionAsync(QuestionDto question);
        Task UpdateQuestionAsync(UpdatedQuestionDto question);
        Task DeleteQuestionAsync(int id);
        Task ToggleConversationEndedForTheQuestion(int id);
    }

    public class QuestionService : IQuestionService
    {
        private readonly ApplicationDbContext _context;

        public QuestionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetQuestionsAsync()
        {
            var questionsWithProfileNameAndViews = await _context.Questions
                .Where(q => q.IsActive)
                .Join(_context.AspNetUsers,
                    question => question.UserId,
                    user => user.Id,
                    (question, user) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        question.Views,
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        ProfileName = user.profileName
                    })
                .GroupJoin(_context.Views,
                    question => question.QueId,
                    view => view.QueId,
                    (question, views) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        ViewsCount = views.Count(), // Ensure this represents the correct logic for counting views
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        question.ProfileName
                    })
                .ToListAsync();

            return questionsWithProfileNameAndViews.Cast<object>().ToList();
        }

        public async Task<dynamic> GetQuestionByIdAsync(int id)
        {
            var questionByIdWithProfileNameAndViews = await _context.Questions
                .Where(q => q.IsActive && q.QueId == id)
                .Join(_context.AspNetUsers,
                    question => question.UserId,
                    user => user.Id,
                    (question, user) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        question.Views,
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        ProfileName = user.profileName
                    })
                .GroupJoin(_context.Views,
                    question => question.QueId,
                    view => view.QueId,
                    (question, views) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        ViewsCount = views.Count(), // Ensure this represents the correct logic for counting views
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        question.ProfileName
                    })
                .ToListAsync();

            return questionByIdWithProfileNameAndViews.Cast<object>().ToList();
        }

        public async Task<List<object>> GetQuestionsByUserIdAsync(string userId)
        {
            var questionsWithViews = await _context.Questions
                .Where(q => q.UserId == userId && q.IsActive)
                .Join(_context.AspNetUsers,
                    question => question.UserId,
                    user => user.Id,
                    (question, user) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        question.Views,
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        ProfileName = user.profileName
                    })
                .GroupJoin(_context.Views,
                    question => question.QueId,
                    view => view.QueId,
                    (question, views) => new
                    {
                        question.QueId,
                        question.UserId,
                        question.QuestionTitle,
                        question.Question1,
                        ViewsCount = views.Count(), 
                        question.IsActive,
                        question.IsConvoEnded,
                        question.ModifiedOn,
                        question.ModifiedBy,
                        question.ProfileName
                    })
                .ToListAsync();

            return questionsWithViews.Cast<object>().ToList();
        }

        public async Task<List<dynamic>> PostQuestionAsync(QuestionDto question)
        {
            var updatedQuestion = new Question
            {
                UserId = question.UserId,
                QuestionTitle = question.QuestionTitle,
                Question1 = question.Question1,
                Views = 0,
                IsActive = true,
                IsConvoEnded = false,
                ModifiedOn = DateTime.Now,
                ModifiedBy = null
            };
            _context.Questions.Add(updatedQuestion);
            await _context.SaveChangesAsync();
            return await GetQuestionsAsync();
        }

        public async Task UpdateQuestionAsync(UpdatedQuestionDto question)
        {
            Question newQue = new Question
            {
                QueId = question.QueId,
                UserId = question.UserId,
                QuestionTitle = question.QuestionTitle,
                Question1 = question.Question1,
                Views = question.Views,
                IsActive = question.IsActive,
                IsConvoEnded = question.IsConvoEnded,
                ModifiedOn = question.ModifiedOn,
                ModifiedBy = question.ModifiedBy
            };
            _context.Questions.Update(newQue);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestionAsync(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.QueId == id);
            if (question != null)
            {
                question.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task ToggleConversationEndedForTheQuestion(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.QueId == id);
            if (question != null)
            {
                question.IsConvoEnded = !question.IsConvoEnded;
                await _context.SaveChangesAsync();
            }
        }

    }

}

