using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using StartupFrontToBack.DAL;
using StartupFrontToBack.Models;
using StartupFrontToBack.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace StartupFrontToBack.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;
        public HomeController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            HomeVM homeVM = new HomeVM()
            {
                Middles = _context.Middles.ToList(),
                Products = _context.Products.Include(p => p.Category).Where(p => p.IsDeleted == false).ToList(),
                Categories = _context.Categories.Where(p => p.IsDeleted == false).ToList()
            };
            return View(homeVM); 
        }

        public async Task<IActionResult> AddBasket(int id)
        {
            Product product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            List<BasketVM> basket;
            if (Request.Cookies["basket"] != null)
            {
                basket = JsonConvert.DeserializeObject<List<BasketVM>>(Request.Cookies["basket"]);
            }
            else
            {
                basket = new List<BasketVM>();
            }
            BasketVM isExist = basket.FirstOrDefault(p => p.Id == id);

            if (isExist == null)
            {
                basket.Add(new BasketVM
                {
                    Id = id,
                    Count = 1
                });
            }
            else
            {
                isExist.Count += 1;
            }
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(basket));
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Basket()
        {
            List<BasketVM> dbBasket = new List<BasketVM>();
            List<BasketVM> basket = new List<BasketVM>();
            ViewBag.Total = 0;
            if (Request.Cookies["basket"] != null)
            {
                List<BasketVM> secondbasket = JsonConvert.DeserializeObject<List<BasketVM>>(Request.Cookies["basket"]);
                foreach (BasketVM products in secondbasket)
                {
                    Product dbproduct = await _context.Products.FindAsync(products.Id); 
                    products.Title = dbproduct.Title;
                    products.Price = dbproduct.Price * products.Count;
                    products.Image = dbproduct.Image;
                    dbBasket.Add(products);
                    ViewBag.Total += products.Price;
                }
            }

            return View(dbBasket);
        }

        public IActionResult RemoveItem(int id)
        {
            List<BasketVM> basket = new List<BasketVM>();

            basket = JsonConvert.DeserializeObject<List<BasketVM>>(Request.Cookies["basket"]);
            BasketVM remove = basket.FirstOrDefault(p => p.Id == id);
            basket.Remove(remove);
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(basket));

            return RedirectToAction(nameof(Basket));
        }

        //public IActionResult Search(string search)
        //{
        //    IEnumerable<Product> model = _context.Products.Where(p => p.Name.Contains(search)).OrderByDescending(p => p.Id).Take(8);
        //    return PartialView("_SearchPartial", model); 
        //}
    } 
} 

