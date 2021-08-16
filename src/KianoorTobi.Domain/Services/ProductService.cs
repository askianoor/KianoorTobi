using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Interfaces.Base;
using KianoorTobi.Domain.Models;
using Microsoft.Extensions.Logging;

namespace KianoorTobi.Domain.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProductCategoryService> _logger;

        public ProductService(
            IProductRepository productRepository, 
            IUnitOfWork unitOfWork, 
            ILogger<ProductCategoryService> logger)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _productRepository.GetAll();
        }

        public async Task<Product> GetById(long id)
        {
            return await _productRepository.GetById(id);
        }

        public async Task<Product> Add(Product product)
        {
            if (_productRepository.Search(b => b.Name == product.Name).Result.Any())
                return null;

            try
            {
                await _productRepository.Add(product);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Add Product Error: {}", ex.Message);

                return null;
            }

            return product;
        }

        public async Task<Product> Update(Product product)
        {
            if (_productRepository.Search(b => b.Name == product.Name && b.Id != product.Id).Result.Any())
                return null;

            try
            {
                await _productRepository.Update(product);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Update Product Error: {}", ex.Message);

                return null;
            }

            return product;
        }

        public async Task<bool> Remove(Product product)
        {
            try
            {
                await _productRepository.Remove(product);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Remove Product Error: {}", ex.Message);

                return false;
            }

            return true;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategory(long categoryId)
        {
            return await _productRepository.GetProductsByProductCategory(categoryId);
        }

        public async Task<IEnumerable<Product>> Search(string productName)
        {
            return await _productRepository.Search(c => c.Name.Contains(productName));
        }

        public async Task<IEnumerable<Product>> SearchProductsWithType(string searchedValue)
        {
            return await _productRepository.SearchProductsWithType(searchedValue);
        }

        public void Dispose()
        {
            _productRepository?.Dispose();
        }
    }
}