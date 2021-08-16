using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.Domain.Interfaces
{
    public interface IProductCategoryService : IDisposable
    {
        Task<IEnumerable<ProductCategory>> GetAll();
        Task<ProductCategory> GetById(long id);
        Task<ProductCategory> Add(ProductCategory productCategory);
        Task<ProductCategory> Update(ProductCategory productCategory);
        Task<bool> Remove(ProductCategory productCategory);
        Task<IEnumerable<ProductCategory>> Search(string productCategoryName);
    }
}