using KianoorTobi.Domain.Enums;

namespace KianoorTobi.API.Dtos.Product
{
    public class ProductAddDto
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public ProductType Type { get; set; }

        public long ProductCategoryId { get; set; }
    }
}
