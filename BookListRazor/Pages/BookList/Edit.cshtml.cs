using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BookListRazor.Pages.BookList
{
    public class EditModel : PageModel
    {
        private ApplicationDBContext _db;

        public EditModel(ApplicationDBContext db)
        {
            _db = db;
        }

        // it contact with class Book in folder Models
        [BindProperty]
        public Book Book { get; set; }

        // get data from DB show in form Edit
        public async Task OnGet(int id)
        {
            Book = await _db.Book.FindAsync(id);
        }


        // function for update data
        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                var BookFromDB = await _db.Book.FindAsync(Book.Id);
                BookFromDB.Name = Book.Name;
                BookFromDB.Author = Book.Author;
                BookFromDB.ISBN = Book.ISBN;

                await _db.SaveChangesAsync();
                return RedirectToPage("Index"); 
            }
            return RedirectToPage();
        }
    }
}
