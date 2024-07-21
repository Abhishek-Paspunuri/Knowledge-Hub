using System;
using System.Collections.Generic;
using Test.Models;

namespace Test.Model;

public partial class Answer
{
    public int AnsId { get; set; }

    public int QueId { get; set; }

    public string Ans { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime EditedOn { get; set; }

    public string? EditedBy { get; set; }

    public virtual AspNetUser? EditedByNavigation { get; set; }

    public virtual Question Que { get; set; } = null!;

    public virtual AspNetUser User { get; set; } = null!;
}
