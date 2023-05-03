using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Diploma.API.Models
{
    [Table("courses")]
    public class Course
    {
        [Column("c_id")]
        [Key]
        public int Id { get; set; }

        [Column("c_name")]
        public string Name { get; set; } = string.Empty;

        [Column("c_description")]
        public string Description { get; set; } = string.Empty;

        [Column("c_teacherId")]
        public int TeacherId { get; set; }

        [JsonIgnore]
        public List<StudentCourse>? Users { get; set; }
    }
}
