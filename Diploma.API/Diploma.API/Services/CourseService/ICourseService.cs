using Diploma.API.Models;

namespace Diploma.API.Services.CourseService
{
    public interface ICourseService
    {
        Task<List<Course>> GetAllAsync();

        Task<Course?> GetByIdAsync(int id);

        Task<int> AddAsync(Course course);

        Task<List<Course>> GetByTeacherIdAsync(int id);

        Task<List<Course>> GetByStudentIdAsync(int id);
    }
}
