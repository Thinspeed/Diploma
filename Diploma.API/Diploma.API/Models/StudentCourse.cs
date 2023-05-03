using System.ComponentModel.DataAnnotations.Schema;

namespace Diploma.API.Models
{
    [Table("m2m_users_courses")]
    public class StudentCourse
    {
        [Column("u_id")]
        public int StudentId { get; set; }

        public User Student { get; set; }

        [Column("c_id")]
        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
