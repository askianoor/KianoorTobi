using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Models;
using KianoorTobi.Infrastructure.Context;

namespace KianoorTobi.Infrastructure.Repositories
{
    public class ProductCategoryRepository : Repository<ProductCategory>, IProductCategoryRepository
    {
        public ProductCategoryRepository(KianoorTobiDbContext context) : base(context) { }
    }
}

