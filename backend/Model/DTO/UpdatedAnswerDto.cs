namespace Test.Models
{
    public class UpdatedAnswerDto
    {
        public int AnsId { get; set; }

        public int QueId { get; set; }

        public string Ans { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public bool IsActive { get; set; }
    }
}
