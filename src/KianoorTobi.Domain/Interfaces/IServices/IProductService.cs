using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.Domain.Interfaces
{
    public interface IProductService : IDisposable
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetById(long id);
        Task<Product> Add(Product product);
        Task<Product> Update(Product product);
        Task<bool> Remove(Product product);
        Task<IEnumerable<Product>> Search(string productName);
        Task<IEnumerable<Product>> GetProductsByCategory(long categoryId);
        Task<IEnumerable<Product>> SearchProductsWithType(string searchedValue);
    }
}