using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StartupFrontToBack.Models;
using StartupFrontToBack.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupFrontToBack.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        
        public AccountController(UserManager<AppUser> userManager,
                                SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
           
        } 

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginVM login)
        {
            if (!ModelState.IsValid) return View();
            AppUser user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null)
            {
                ModelState.AddModelError("", "Email or password wrong!!!");
                return View();
            }

            if (user.IsDeleted)
            {
                ModelState.AddModelError("", "This account blocked!!!");
                return View();
            }

            Microsoft.AspNetCore.Identity.SignInResult signInResult =
                await _signInManager.PasswordSignInAsync(user, login.Password, true, true);
            if (signInResult.IsLockedOut)
            {
                ModelState.AddModelError("", "Please,try few minutes later");
                return View(login);
            }

            if (!signInResult.Succeeded)
            {
                ModelState.AddModelError("", "Email or password wrong!!!");
                return View();
            }

            return RedirectToAction("Index", "Home");
        }


        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterVM register)
        {
            if (!ModelState.IsValid) return View();
            AppUser newUser = new AppUser
            {
                Fullname = register.Fullname,
                Email = register.Email,
                UserName = register.Username
            };

            IdentityResult identityResult = await _userManager.CreateAsync(newUser, register.Password);
            if (!identityResult.Succeeded)
            {
                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
                return View();
            }
            return RedirectToAction("Index", "Home");

        }

        public async Task<IActionResult> Logout()
        {
            return RedirectToAction("Index", "Home");
        } 
    }
}
