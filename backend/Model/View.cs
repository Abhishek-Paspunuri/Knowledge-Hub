using System;
using System.Collections.Generic;

namespace Test.Model;

public partial class View
{
    public int QueId { get; set; }

    public string UserId { get; set; } = null!;

    public virtual Question Que { get; set; } = null!;
}
