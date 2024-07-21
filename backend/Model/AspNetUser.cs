using System;
using System.Collections.Generic;

namespace Test.Model;

public partial class AspNetUser
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public DateTime? Password { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsAdmin { get; set; }

    public string? ProfileName { get; set; }

    public string? AppliedFor { get; set; }

    public string? UserName { get; set; }

    public string? NormalizedUserName { get; set; }

    public string? Email { get; set; }

    public string? NormalizedEmail { get; set; }

    public bool EmailConfirmed { get; set; }

    public string? PasswordHash { get; set; }

    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; }

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public bool LockoutEnabled { get; set; }

    public int AccessFailedCount { get; set; }

    public virtual ICollection<Answer> AnswerEditedByNavigations { get; set; } = new List<Answer>();

    public virtual ICollection<Answer> AnswerUsers { get; set; } = new List<Answer>();

    public virtual ICollection<Approval> Approvals { get; set; } = new List<Approval>();

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
