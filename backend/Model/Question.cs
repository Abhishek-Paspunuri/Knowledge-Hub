using System;
using System.Collections.Generic;

namespace Test.Model;

public partial class Question
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

    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

    public virtual AspNetUser User { get; set; } = null!;

    public virtual ICollection<View> ViewsNavigation { get; set; } = new List<View>();
}
