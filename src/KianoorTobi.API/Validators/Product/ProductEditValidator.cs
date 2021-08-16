using FluentValidation;
using KianoorTobi.API.Dtos.Product;
using KianoorTobi.Domain.Enums;

namespace KianoorTobi.API.Validators.Product
{
    public class ProductEditValidator : AbstractValidator<ProductEditDto>
    {
        public ProductEditValidator()
        {
            RuleFor(x => x.Id).NotNull();

            RuleFor(x => x.Name).NotEmpty().Length(2, 150);

            RuleFor(x => x.Price).InclusiveBetween(1000, 2600)
                .When(x => x.Type == ProductType.Integrated);

            RuleFor(x => x.Price).GreaterThanOrEqualTo(1)
                .When(x => x.Type == ProductType.Peripheral);
        }
    }
}


