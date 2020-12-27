using StartupFrontToBack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupFrontToBack.ViewModels
{
    public class HomeVM
    {
        public List<Middle> Middles { get; set; }
        public List<Product> Products { get; set; }
        public List<Category> Categories { get; set; } 
    }
}
