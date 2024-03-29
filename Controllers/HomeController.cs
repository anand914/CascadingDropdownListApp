using CascadingDropdownListApp.DataContext;
using CascadingDropdownListApp.Models;
using CascadingDropdownListApp.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CascadingDropdownListApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly CascadingContext _context;
        public HomeController(CascadingContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetuserList()
        {
            //var data = _context.Users.ToList();
            var result = (from u in _context.Users
                          join c in _context.Countries on u.CountryID equals c.CId
                          join s in _context.State on u.StateId equals s.S_Id
                          join d in _context.City on u.CityId equals d.DId
                          select new UserVM()
                          {
                              UserId = u.UserId,
                              Name = u.Name,
                              Email = u.Email,
                              CountryName = c.CountryName,
                              StateName = s.StateName,
                              CityName = d.CityName
                          }).ToList();
            return Json(result);
        }

        public async Task<IActionResult> Getcountries()
        {
            var data = _context.Countries.ToList();
            return new JsonResult(data);
        }

        public IActionResult Getstates(int CountryId)
        {
            var data = _context.State.Where(x => x.Country.CId == CountryId).ToList();
            return new JsonResult(data);
        }
        public IActionResult GetCity(int stateId)
        {
            var data = _context.City.Where(x => x.State.S_Id == stateId).ToList();
            return new JsonResult(data);
        }
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                ModelState.Remove("userId");
                if (!ModelState.IsValid)
                {
                    return new JsonResult(user);
                }
                else
                {
                    if (user.UserId > 0)
                    {
                        _context.Users.Update(user);
                        model.statusMessage = "update data successfully";
                    }
                    else
                    {
                        _context.Users.Add(user);
                        model.statusMessage = "data saved successfully";
                    }
                }
                _context.SaveChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }
            return Ok(model);
        }

        [HttpGet]
        public IActionResult GetuserByid(int userId)
        {
            try
            {
                var result = (from u in _context.Users
                              join c in _context.Countries on u.CountryID equals c.CId
                              join s in _context.State on u.StateId equals s.S_Id
                              join d in _context.City on u.CityId equals d.DId
                              select new User()
                              {
                                  UserId = u.UserId,
                                  Name = u.Name,
                                  Email = u.Email,
                                  CountryID = c.CId,
                                  StateId = s.S_Id,
                                  CityId = d.DId
                              }).Where(x => x.UserId == userId).FirstOrDefault();
                return new JsonResult(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpDelete]
        public IActionResult Deletedata(int userId)
        {
            ResponseModel model = new ResponseModel();
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    _context.SaveChanges(); // Save changes to commit the deletion
                    model.statusMessage = "data delete successfully!";
                }
                else
                {
                    model.statusMessage = "data not delete successfully!";
                }
            }
            catch (Exception ex)
            {
                model.statusMessage = "An error occurred while deleting data.";
            }
            return Ok(model);
        }
    }
}