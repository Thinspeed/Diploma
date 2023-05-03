using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Diploma.API.Models
{
    [Table("users")]
    public class User
    {
        [Column("u_id")]
        [Key]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [Column("u_firstName")]
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; } = string.Empty;

        [Column("u_lastName")]
        [JsonPropertyName("lastName")]
        public string LastName { get; set; } = string.Empty;

        [Column("u_email")]
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [Column("u_passwordHash")]
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;

        [Column("u_role")]
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [JsonIgnore]
        public List<StudentCourse>? Courses { get; set; }
    }
}
