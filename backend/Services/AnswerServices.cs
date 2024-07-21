using Microsoft.EntityFrameworkCore;
using Test.Data;
using Test.Model;
using Test.Models;

namespace Test.Services
{
    public interface IAnswerService
    {
        Task<List<object>> GetAnswerByQuestionIdAsync(int queId);
        Task PostAnswerAsync(AnswerDto answer);
        Task UpdateAnswerAsync(UpdatedAnswerDto answer);
        Task DeleteAnswerAsync(int ansId);
    }

    public class AnswerService : IAnswerService
    {
        private readonly ApplicationDbContext _context;

        public AnswerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<object>> GetAnswerByQuestionIdAsync(int queId)
        {
            try
            {
                return await _context.Answers
                    .Where(x => x.QueId == queId && x.IsActive)
                    .Join(_context.AspNetUsers,
                        answer => answer.UserId,
                        user => user.Id,
                        (answer, user) => new 
                        {
                            answer.AnsId,
                            answer.UserId,
                            answer.Ans,
                            answer.QueId,
                            answer.IsActive,
                            answer.EditedOn,
                            answer.EditedBy,
                            AnsweredBy = user.profileName
                        })
                    .ToListAsync<object>();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task PostAnswerAsync(AnswerDto answer)
        {
            var updatedAnswer = new Answer
            {
                UserId = answer.UserId,
                Ans = answer.Ans,
                QueId = answer.QueId,
                IsActive = true,
                EditedOn = DateTime.Now,
                EditedBy = answer.UserId
            };
            _context.Answers.Add(updatedAnswer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAnswerAsync(UpdatedAnswerDto answer)
        {
            var newAns= new Answer(){
                AnsId = answer.AnsId,
                UserId = answer.UserId,
                Ans = answer.Ans,
                QueId = answer.QueId,
                IsActive = answer.IsActive,
                EditedOn = DateTime.Now,
                EditedBy = answer.UserId
            };
            _context.Answers.Update(newAns);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAnswerAsync(int ansId)
        {
            var answer = await _context.Answers.FindAsync(ansId);
            if (answer != null)
            {
                answer.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

    }

}