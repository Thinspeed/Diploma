using Diploma.API.Models;
using Diploma.API.Services.CourseService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Diploma.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<Course>>> GetAll()
        {
            return Ok(await _courseService.GetAllAsync());
        }


        //добавить контроллер для загрузки файлов(либо отдельный метов upload)
        //придумать как генерировать путь
        [HttpPost("add")]
        public async Task<ActionResult<int>> Add(Course course)
        {
            int id = await _courseService.AddAsync(course);
            if (id == -1)
            {
                return BadRequest();
            }

            return Ok(id);
        }

        [HttpGet("getById")]
        public async Task<ActionResult<Course>> GetById(int id)
        {
            return Ok(await _courseService.GetByIdAsync(id));
        }

        [HttpGet("getByTeacherId")]
        public async Task<ActionResult<List<Course>>> GetByTeacherId(int id)
        {
            return Ok(await _courseService.GetByTeacherIdAsync(id));
        }

        [HttpGet("getByStudentId")]
        public async Task<ActionResult<List<Course>>> GetByStudentId(int id)
        {
            return Ok(await _courseService.GetByStudentIdAsync(id));
        }
    }
}
