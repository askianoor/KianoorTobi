using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using KianoorTobi.API.Dtos.ProductCategory;

namespace KianoorTobi.API.Validators.ProductCategory
{
    public class ProductCategoryEditValidator: AbstractValidator<ProductCategoryEditDto>
    {
        public ProductCategoryEditValidator()
        {
            RuleFor(x => x.Id).NotNull();

            RuleFor(x => x.Name).NotEmpty().Length(2, 150);
        }
    }
}
