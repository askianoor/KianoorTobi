
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Models;
using KianoorTobi.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace KianoorTobi.Infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(KianoorTobiDbContext context) : base(context) { }

        public override async Task<List<Product>> GetAll()
        {
            return await Db.Products.AsNoTracking().Include(b => b.ProductCategory)
                .OrderBy(b => b.Name)
                .ToListAsync();
        }

        public override async Task<Product> GetById(long id)
        {
            return await Db.Products.AsNoTracking().Include(b => b.ProductCategory)
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByProductCategory(long categoryId)
        {
            return await Search(b => b.ProductCategoryId == categoryId);
        }

        public async Task<IEnumerable<Product>> SearchProductsWithType(string searchedValue)
        {
            return await Db.Products.AsNoTracking()
                .Include(b => b.ProductCategory)
                .Where(b => b.Name.Contains(searchedValue) || b.ProductCategory.Name.Contains(searchedValue))
                .ToListAsync();
        }
    }
}