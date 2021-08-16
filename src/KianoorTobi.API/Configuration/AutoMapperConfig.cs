using AutoMapper;
using KianoorTobi.API.Dtos.Product;
using KianoorTobi.API.Dtos.ProductCategory;
using KianoorTobi.Domain.Models;

namespace KianoorTobi.API.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            #region Product Category

            CreateMap<ProductCategory, ProductCategoryAddDto>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryEditDto>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryOutputDto>().ReverseMap();

            #endregion

            #region Product

            CreateMap<Product, ProductAddDto>().ReverseMap();
            CreateMap<Product, ProductEditDto>().ReverseMap();
            CreateMap<Product, ProductOutputDto>().ReverseMap();

            #endregion
        }
    }
}
