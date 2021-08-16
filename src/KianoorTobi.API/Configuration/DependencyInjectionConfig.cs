using FluentValidation;
using KianoorTobi.API.Dtos.Product;
using KianoorTobi.API.Dtos.ProductCategory;
using KianoorTobi.API.Validators.Product;
using KianoorTobi.API.Validators.ProductCategory;
using KianoorTobi.Domain.Interfaces;
using KianoorTobi.Domain.Interfaces.Base;
using KianoorTobi.Domain.Services;
using KianoorTobi.Infrastructure.Base;
using KianoorTobi.Infrastructure.Context;
using KianoorTobi.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace KianoorTobi.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            #region Base & Repositories

            services.AddScoped<KianoorTobiDbContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();

            #endregion

            #region Services

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductCategoryService, ProductCategoryService>();

            #endregion

            #region Validators

            services.AddTransient<IValidator<ProductAddDto>, ProductAddValidator>();
            services.AddTransient<IValidator<ProductEditDto>, ProductEditValidator>();

            services.AddTransient<IValidator<ProductCategoryAddDto>, ProductCategoryAddValidator>();
            services.AddTransient<IValidator<ProductCategoryEditDto>, ProductCategoryEditValidator>();

            #endregion

            return services;
        }
    }
}
