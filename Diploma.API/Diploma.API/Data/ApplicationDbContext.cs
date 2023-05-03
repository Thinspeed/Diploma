using Microsoft.EntityFrameworkCore;
using Diploma.API.Models;

namespace Diploma.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<StudentCourse> StudentCourse { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<StudentCourse>()
                .HasKey(sc => new { sc.StudentId, sc.CourseId });
            builder.Entity<StudentCourse>()
                .HasOne(sc => sc.Student)
                .WithMany(sc => sc.Courses)
                .HasForeignKey(sc => sc.StudentId);

            builder.Entity<StudentCourse>()
                .HasOne(sc => sc.Course)
                .WithMany(sc => sc.Users)
                .HasForeignKey(sc => sc.CourseId);
        }
    }
}
