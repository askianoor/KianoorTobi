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
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly IProductService _productService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProductCategoryService> _logger;

        public ProductCategoryService(
            IProductCategoryRepository productCategoryRepository, 
            IProductService productService, 
            IUnitOfWork unitOfWork,
            ILogger<ProductCategoryService> logger)
        {
            _productCategoryRepository = productCategoryRepository;
            _productService = productService;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<IEnumerable<ProductCategory>> GetAll()
        {
            return await _productCategoryRepository.GetAll();
        }

        public async Task<ProductCategory> GetById(long id)
        {
            return await _productCategoryRepository.GetById(id);
        }

        public async Task<ProductCategory> Add(ProductCategory productCategory)
        {
            if (_productCategoryRepository.Search(c => c.Name == productCategory.Name).Result.Any())
                return null;

            try
            {
                await _productCategoryRepository.Add(productCategory);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Add Product Category Error: {}", ex.Message);

                return null;
            }

            return productCategory;
        }

        public async Task<ProductCategory> Update(ProductCategory productCategory)
        {
            if (_productCategoryRepository.Search(c => c.Name == productCategory.Name && c.Id != productCategory.Id).Result.Any())
                return null;

            try
            {
                await _productCategoryRepository.Update(productCategory);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Update Product Category Error: {}", ex.Message);

                return null;
            }

            return productCategory;
        }

        public async Task<bool> Remove(ProductCategory productCategory)
        {
            var products = await _productService.GetProductsByCategory(productCategory.Id);
            if (products.Any()) return false;

            try
            {
                await _productCategoryRepository.Remove(productCategory);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _unitOfWork.Dispose();
                _logger.LogError("Remove Product Category Error: {}", ex.Message);

                return false;
            }

            return true;
        }

        public async Task<IEnumerable<ProductCategory>> Search(string productCategoryName)
        {
            return await _productCategoryRepository.Search(c => c.Name.Contains(productCategoryName));
        }

        public void Dispose()
        {
            _productCategoryRepository?.Dispose();
        }
    }
}