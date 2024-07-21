using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Test.Model;

public partial class InsightHubContext : DbContext
{
    public InsightHubContext()
    {
    }

    public InsightHubContext(DbContextOptions<InsightHubContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Approval> Approvals { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<View> Views { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=PTHU1DELL0066\\SQLEXPRESS;Database=InsightHub;User ID=sa;Password=Dbase@123;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.HasKey(e => e.AnsId);

            entity.Property(e => e.AnsId).HasColumnName("Ans_Id");
            entity.Property(e => e.EditedBy).HasMaxLength(450);
            entity.Property(e => e.EditedOn).HasColumnType("datetime");
            entity.Property(e => e.QueId).HasColumnName("Que_Id");
            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.EditedByNavigation).WithMany(p => p.AnswerEditedByNavigations)
                .HasForeignKey(d => d.EditedBy)
                .HasConstraintName("FK_Edited_Answers_By_Admin");

            entity.HasOne(d => d.Que).WithMany(p => p.Answers)
                .HasForeignKey(d => d.QueId)
                .HasConstraintName("FK_Answers_Questions");

            entity.HasOne(d => d.User).WithMany(p => p.AnswerUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_User_Answers");
        });

        modelBuilder.Entity<Approval>(entity =>
        {
            entity.HasKey(e => e.ApprovalId).HasName("PK__Approval__B0CD4848A344FEF8");

            entity.Property(e => e.ApprovalId).HasColumnName("Approval_Id");
            entity.Property(e => e.ApprovedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.User).WithMany(p => p.Approvals)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Approvals_Question");
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.AppliedFor).HasColumnName("appliedFor");
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.ProfileName).HasColumnName("profileName");
            entity.Property(e => e.UserName).HasMaxLength(256);
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QueId);

            entity.Property(e => e.QueId).HasColumnName("Que_Id");
            entity.Property(e => e.ModifiedBy).HasMaxLength(255);
            entity.Property(e => e.ModifiedOn).HasColumnType("datetime");
            entity.Property(e => e.Question1).HasColumnName("Question");
            entity.Property(e => e.QuestionTitle).HasMaxLength(255);
            entity.Property(e => e.UserId).HasMaxLength(450);
            entity.Property(e => e.Views).HasDefaultValue(0);

            entity.HasOne(d => d.User).WithMany(p => p.Questions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Email_Questions");
        });

        modelBuilder.Entity<View>(entity =>
        {
            entity.HasKey(e => new { e.QueId, e.UserId });

            entity.Property(e => e.QueId).HasColumnName("Que_Id");

            entity.HasOne(d => d.Que).WithMany(p => p.ViewsNavigation)
                .HasForeignKey(d => d.QueId)
                .HasConstraintName("FK_Views_Questions");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
