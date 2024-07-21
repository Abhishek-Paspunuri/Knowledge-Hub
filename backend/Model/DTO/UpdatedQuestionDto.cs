namespace Test.Models
{
    public class UpdatedQuestionDto
    {
        public int QueId { get; set; }

        public string UserId { get; set; } = null!;

        public string QuestionTitle { get; set; } = null!;

        public string Question1 { get; set; } = null!;

        public int? Views { get; set; }

        public bool IsActive { get; set; }

        public bool? IsConvoEnded { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string? ModifiedBy { get; set; }

    }
}
