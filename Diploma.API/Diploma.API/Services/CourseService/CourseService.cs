using Diploma.API.Data;
using Diploma.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Diploma.API.Services.CourseService
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return course.Id;
        }

        public async Task<List<Course>> GetAllAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            return await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Course>> GetByTeacherIdAsync(int id)
        {
            return await _context.Courses.Where(c => c.TeacherId == id).ToListAsync();
        }

        public async Task<List<Course>> GetByStudentIdAsync(int id)
        {
            return await _context.Users.Where(u => u.Id == id).SelectMany(u => u.Courses).Select(sc => sc.Course).ToListAsync();
        }
    }
}
