using System.Collections.Generic;
using System.Threading.Tasks;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.Domain.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        new Task<List<Product>> GetAll();
        new Task<Product> GetById(long id);
        Task<IEnumerable<Product>> GetProductsByProductCategory(long categoryId);
        Task<IEnumerable<Product>> SearchProductsWithType(string searchedValue);
    }
}