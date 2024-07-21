using System;
using System.Collections.Generic;

namespace Test.Model;

public partial class Approval
{
    public int ApprovalId { get; set; }

    public string UserId { get; set; } = null!;

    public DateTime ApprovedOn { get; set; }

    public bool IsApproved { get; set; }

    public string? ApprovedBy {get; set;}

    public string? Role {get; set;}

    public virtual AspNetUser User { get; set; } = null!;
}
