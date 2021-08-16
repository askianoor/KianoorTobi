using FluentValidation;
using KianoorTobi.API.Dtos.ProductCategory;

namespace KianoorTobi.API.Validators.ProductCategory
{
    public class ProductCategoryAddValidator : AbstractValidator<ProductCategoryAddDto>
    {
        public ProductCategoryAddValidator()
        {
            RuleFor(x => x.Name).NotEmpty().Length(2, 150);
        }
    }
}
