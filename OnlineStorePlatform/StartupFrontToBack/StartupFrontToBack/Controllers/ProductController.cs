using Microsoft.AspNetCore.Mvc;
using StartupFrontToBack.DAL;
using StartupFrontToBack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupFrontToBack.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppDbContext _db;
        public ProductController(AppDbContext db)
        {
            _db = db;
        }
        public IActionResult Index() 
        {
            ViewBag.ProCount = _db.Products.Count();
            //return View(_db.Products.Take(8).ToList()); 
            return View();
        }

        public IActionResult loadMore(int skip)
        {
            List<Product> model = _db.Products.Skip(skip).Take(8).ToList();
            return PartialView("_ProductPartial", model);
            //return Json(_db.Products.ToList());
        } 
    }
}
